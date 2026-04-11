import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const TIMEOUT_MS = 20000;

async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    return resp;
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const adminSlackIds = process.env.NEXT_PUBLIC_ADMIN_SLACK_IDS?.split(",") || [];
  if (!adminSlackIds.includes(session.user.SlackID)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const key = process.env.AIRBRIDGE_API_KEY;
  const base = process.env.DEV === "true" ? "http://localhost:5000" : "https://airbridge.hackclub.com";
  if (!key) return res.status(500).json({ error: "Missing AIRBRIDGE_API_KEY" });

  try {
    // Fetch all website submissions across all clubs
    const websiteSelect = encodeURIComponent(
      JSON.stringify({
        fields: [
          "Project Status",
          "club_name (from Active Clubs) (from Club)",
        ],
      })
    );
    const websiteUrl = `${base}/v0.2/Boba%20Club%20Dashboard/Websites?select=${websiteSelect}&authKey=${key}`;

    let resp;
    try {
      resp = await fetchWithTimeout(websiteUrl, TIMEOUT_MS);
    } catch (err) {
      if (err.name === "AbortError") {
        return res.status(504).json({ error: "Request timed out" });
      }
      throw err;
    }

    const text = await resp.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: "Bad JSON from upstream" });
    }

    if (!resp.ok) return res.status(resp.status).json({ error: "Upstream error" });

    const records = Array.isArray(json) ? json : json?.records || json?.data || [];

    let totalSubmissions = 0;
    let approvedSubmissions = 0;
    const clubsWithSubmissions = new Set();

    for (const r of records) {
      const fields = r.fields || r;
      const status = fields["Project Status"] || "";
      const clubArr = fields["club_name (from Active Clubs) (from Club)"];
      const clubName = Array.isArray(clubArr) ? clubArr[0] : clubArr || "";

      totalSubmissions++;
      if (status === "Approve") approvedSubmissions++;
      if (clubName) clubsWithSubmissions.add(clubName);
    }

    const moneyGivenOut = approvedSubmissions * 5;

    return res.status(200).json({
      totalSubmissions,
      approvedSubmissions,
      moneyGivenOut,
      schoolsReached: clubsWithSubmissions.size,
    });
  } catch (err) {
    console.error("Admin stats error", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
