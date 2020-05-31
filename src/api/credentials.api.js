import fetch from "cross-fetch";
import { API_ENDPOINT, headers } from "../config";

export const fetchAllCredDef = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/credential-definitions`, {
      method: "GET",
      headers: headers
    });
    const json = await response.json();
    if (json.credential_definition_ids) return json.credential_definition_ids;
    else throw json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getCredentialById = async credentialId => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/credential-definition/${credentialId}`,
      {
        method: "GET",
        headers: headers
      }
    );
    const json = await response.json();
    if (json) return json;
    else throw json;
  } catch (error) {
    console.error(error);
  }
};
export const sendCredentialOffer = async body => {
  try {
    const payload = {
      connection_id: body.connectionId,
      auto_issue: body.autoIssue,
      cred_def_id: body.credentialDefinitionId,
      comment: body.comment,
      auto_remove: body.autoRemove,
      attributes: body.attributes
    };
    const response = await fetch(
      `${API_ENDPOINT}/issue-credential/send-offer`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          ...headers,
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
    const json = await response.json();
    console.log("sendCredentialOffer -> json", json);
    if (json) return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
