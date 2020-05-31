export const API_ENDPOINT =
  process.env.VUE_APP_API_ENDPOINT ||
  "http://ip172-18-0-37-bqrlchiosm4g00abr3ug-8023.direct.labs.play-with-docker.com";
export const SOCKET_ENDPOINT =
  process.env.VUE_APP_SOCKET_ENDPOINT ||
  "http://ip172-18-0-37-bqrlchiosm4g00abr3ug-8022.direct.labs.play-with-docker.com/";
export const headers = {
  "Access-Control-Allow-Origin": "*",
  referrerPolicy: "no-referrer",
  "Cache-Control": "no-cache"
};
export const LEDGER_URL = "http://test.bcovrin.vonx.io";
