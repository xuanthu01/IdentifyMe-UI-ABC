import fetch from "cross-fetch";
import { API_ENDPOINT, headers } from "../config";

export const createProofRequest = async body => {
  try {
    const response = await fetch(`${API_ENDPOINT}/present-proof/send-request`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    const json = await response.json();
    if (json.name === "Error") throw json;
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProofRequests = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/present-proof`, {
      method: "GET"
    });
    const json = await response.json();
    if (json.name === "Error") throw json;
    return json.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
