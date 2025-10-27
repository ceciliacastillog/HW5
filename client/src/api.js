const viteBase =
  typeof import.meta !== "undefined" &&
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE;

const craBase = typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE;

const BASE = viteBase || craBase || "http://127.0.0.1:5000";

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const api = {
  checkIn:  (id, qty) => getJson(`/api/projects/${id}/checkin?qty=${qty}`),
  checkOut: (id, qty) => getJson(`/api/projects/${id}/checkout?qty=${qty}`),
  join:     (id)      => getJson(`/api/projects/${id}/join`),
  leave:    (id)      => getJson(`/api/projects/${id}/leave`),
};
