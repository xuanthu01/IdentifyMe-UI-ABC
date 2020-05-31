import fetch from "cross-fetch";
import { API_ENDPOINT, headers } from "../config";

export const fetchConnections = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/connections`, {
      method: "GET",
      headers: headers
    });
    const json = await response.json();
    if (json) return json.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const createInvitation = async () => {
  try {
    const payload = {
      alias: "University of Information Technology - VNUHCM",
      accept: "",
      multi_use: true,
      public: ""
    };
    const response = await fetch(`${API_ENDPOINT}/connections`, {
      method: "POST",
      body: payload,
      headers: headers
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const acceptInvitation = async invitation_payload => {
  try {
    const { alias, accept, invitation } = invitation_payload;
    const response = await fetch(
      `${API_ENDPOINT}/invitation/accept?alias=${alias}&accept=${accept}`,
      {
        method: "POST",
        body: JSON.stringify({ invitation }),
        headers: { ...headers, "Content-Type": "application/json" }
      }
    );
    const json = await response.json();
    if (json.error) throw json;
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const connections = {
  results: [
    {
      request_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      invitation_mode: "once",
      connection_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      updated_at: "2020-04-11 04:06:54Z",
      my_did: "WgWxqztrNooG92RXvxSTWv",
      inbound_connection_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      accept: "auto",
      error_msg: "No DIDDoc provided; cannot connect to public DID",
      alias: "Bob, providing quotes",
      state: "active",
      their_label: "Bob",
      routing_state: "active",
      created_at: "2020-04-11 04:06:54Z",
      their_role: "Point of contact",
      invitation_key: "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV",
      their_did: "WgWxqztrNooG92RXvxSTWv",
      initiator: "self"
    },
    {
      invitation_mode: "once",
      connection_id: "623db614-fac9-4e01-9fb0-7c8338b523ac",
      updated_at: "2020-04-11 04:07:16.232292Z",
      accept: "auto",
      state: "invitation",
      routing_state: "none",
      created_at: "2020-04-11 04:07:16.232292Z",
      invitation_key: "BFsGMyMhpMK359UWGgp7A9SqQ5MvnFNX8BgNtPmgSuAs",
      initiator: "self"
    }
  ]
};
const invitation = {
  connection_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  invitation_url: "http://192.168.56.101:8020/invite?c_i=eyJAdHlwZSI6Li4ufQ==",
  invitation: {
    imageUrl: "http://192.168.56.101/img/logo.jpg",
    label: "Bob",
    "@type":
      "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/my-family/1.0/my-message-type",
    serviceEndpoint: "http://192.168.56.101:8020",
    did: "WgWxqztrNooG92RXvxSTWv",
    "@id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    recipientKeys: ["H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"],
    routingKeys: ["H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"]
  }
};
