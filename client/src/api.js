const craBase = process.env?.REACT_APP_API_BASE;            // dev
const viteBase = typeof import.meta !== "undefined" && import.meta?.env?.VITE_API_BASE;

const DEV_BASE = viteBase || craBase || "http://127.0.0.1:5000";
const PROD_BASE = "https://hw5-ceciliacastillo-981e30bd2ed8.herokuapp.com";

const RAW_BASE = process.env.NODE_ENV === "production" ? PROD_BASE : DEV_BASE;
const BASE = RAW_BASE.replace(/\/$/, "");

console.log("[api.js] BASE =", BASE); // leave this in for verification

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
