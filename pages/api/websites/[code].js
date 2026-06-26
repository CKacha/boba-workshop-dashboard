import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { airtableUrl, airtableHeaders } from "../../../lib/airtable";
const REQUEST_TIMEOUT_MS = 40000; // 40s timeout for slow upstreams

export default async function handler(req, res) {
  if (!req._startTime) req._startTime = Date.now();
  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: "Missing event code" });
  }
  try {
    const sanitizedCode = String(code).replace(/'/g, "\\'");

    const eventUrl = airtableUrl("Club Workshops", {
      filterByFormula: `AND({Club Names} = '${sanitizedCode}', NOT({Status} = 'Rejected'))`,
      fields: ["Club Names", "Status", "Slack ID", "Email"],
    });

    let eventResp;
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        eventResp = await fetch(eventUrl, { signal: controller.signal, headers: airtableHeaders() });
      } finally {
        clearTimeout(timer);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        return res.status(504).json({
          error: `Event lookup timed out after ${REQUEST_TIMEOUT_MS / 1000}s`,
        });
      }
      console.error("Event fetch failed", err);
      throw err;
    }
    const eventText = await eventResp.text();
    let eventJson;
    try {
      eventJson = JSON.parse(eventText);
    } catch (e) {
      return res.status(502).json({ error: "Bad JSON from event lookup" });
    }
    const eventRecords = Array.isArray(eventJson)
      ? eventJson
      : eventJson?.records || eventJson?.data || [];
    if (!eventRecords.length) {
      return res.status(404).json({ error: "Event code not found" });
    }

    const adminSlackIds =
      process.env.NEXT_PUBLIC_ADMIN_SLACK_IDS?.split(",") || [];
    const isAdmin = adminSlackIds.includes(session.user.SlackID);
    const eventSlackId = eventRecords[0]?.fields?.["Slack ID"];
    const eventEmail = (eventRecords[0]?.fields?.["Email"] || "").trim().toLowerCase();
    const sessionEmail = (session.user.email || "").trim().toLowerCase();
    const slackMatches = session.user.SlackID && session.user.SlackID === eventSlackId;
    const emailMatches = sessionEmail && sessionEmail === eventEmail;
    if (!isAdmin && !slackMatches && !emailMatches) {
      return res
        .status(403)
        .json({ error: "Forbidden: Not the organizer for this club" });
    }

    const url = airtableUrl("Websites", {
      filterByFormula: `{club_name (from Active Clubs) (from Club)} = '${sanitizedCode}'`,
      fields: [
        "Email",
        "First Name",
        "Last Name",
        "Project Status",
        "club_name (from Active Clubs) (from Club)",
        "Playable URL",
        "Rejection Reason",
      ],
    });

    let resp;
    try {
      console.log(
        `Sending Airbridge request (request active: ${Date.now() - req._startTime}ms)`,
        url,
      );
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        resp = await fetch(url, {
          signal: controller.signal,
          headers: airtableHeaders(),
        });
      } finally {
        clearTimeout(timer);
      }
    } catch (err) {
      console.error("Fetch error", err);
      if (err.name === "AbortError") {
        return res.status(504).json({
          error: `Upstream request timed out after ${REQUEST_TIMEOUT_MS / 1000}s`,
        });
      }
      throw err;
    }
    console.log(
      `Fectch complete (request active: ${Date.now() - req._startTime}ms)`,
    );
    const text = await resp.text();

    let json;

    try {
      json = JSON.parse(text);
    } catch (e) {
      return res.status(502).json({ error: "Bad JSON from upstream" });
    }

    if (!resp.ok) {
      return res.status(resp.status).json({ error: "Upstream error" });
    }

    const records = Array.isArray(json)
      ? json
      : json?.records || json?.data || [];
    const normalized = records.map((r) => {
      const fields = r.fields || r;
      return {
        id: r.id || fields.id || null,
        name:
          [fields["First Name"], fields["Last Name"]]
            .filter(Boolean)
            .join(" ") ||
          fields.Name ||
          "",
        email: fields.Email || fields.email || "",
        status: fields["Project Status"] || "Pending",
        website: fields["Playable URL"] || fields.website || "",
        decisionReason: fields["Rejection Reason"] || "",
      };
    });
    console.log(
      `Filtering complete (request active: ${Date.now() - req._startTime}ms)`,
    );
    const eventStatus =
      eventRecords[0]?.fields?.Status || eventRecords[0]?.Status || "Active";

    return res.status(200).json({ records: normalized, eventStatus });
  } catch (err) {
    console.error("API fetch error", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
