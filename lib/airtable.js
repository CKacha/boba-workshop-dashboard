const BASE = `https://airbridge.hackclub.com/v0/app05mIKwNPO2l1vT`;

export function airtableUrl(table, select = {}) {
  const params = new URLSearchParams();
  if (select.fields) {
    for (const f of select.fields) params.append("fields[]", f);
  }
  if (select.filterByFormula) params.append("filterByFormula", select.filterByFormula);
  if (select.pageSize) params.append("pageSize", String(select.pageSize));
  if (select.maxRecords) params.append("maxRecords", String(select.maxRecords));
  if (select.offset) params.append("offset", select.offset);
  return `${BASE}/${encodeURIComponent(table)}?${params}`;
}

export function airtableHeaders() {
  return {
    Authorization: `Bearer ${process.env.AIRBRIDGE_API_KEY}`,
    Accept: "application/json",
  };
}
