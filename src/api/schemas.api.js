import fetch from "cross-fetch";
import { API_ENDPOINT, headers } from "../config";
export const createSchema = async schemaBody => {
  try {
    const body = {
      schema_name: schemaBody.schema_name,
      schema_version: schemaBody.schema_version,
      attributes: [...schemaBody.attributes]
    };
    const response = await fetch(`${API_ENDPOINT}/schemas`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    /**
         * @example Example
         *  {"schema_id": "SB9DTBAGP9RW66k7njnBpZ:2:UIT_Diploma_CQUI:1.0.0",
            "credential_definition_id": "SB9DTBAGP9RW66k7njnBpZ:3:CL:8969:default"}
         */
    const json = await response.json();
    if (!json.name) return json;
    else throw json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * @example return object {"schema_ids": ["SB9DTBAGP9RW66k7njnBpZ:2:UIT_Diploma_CQUI:1.0.0"]}
 */
export const fetchAllSchemaIds = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/schemas`, {
      method: "GET",
      headers: headers
    });
    /**
     * @example Response example
     * {"schema_ids": ["SB9DTBAGP9RW66k7njnBpZ:2:UIT_Diploma_CQUI:1.0.0"]}
     */
    const json = await response.json();
    if (json) return json.schema_ids;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
/**
 * 
 * @param {string} schemaId 
 * @example {
        "name": "schema_name",
        "version": "1.0",
        "attrNames": ["score"],
    "id": "WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0",
    "ver": "1.0",
    "seqNo": 999
    }
 */
export const getSchemaById = async schemaId => {
  try {
    const response = await fetch(`${API_ENDPOINT}/schema/${schemaId}`, {
      method: "GET",
      headers: headers
    });
    const json = await response.json();
    if (json) return json.schema_json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
