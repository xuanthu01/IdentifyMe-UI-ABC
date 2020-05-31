import fetch from "cross-fetch";
import { LEDGER_URL, headers } from "../config";

export const findCredentialsByQueryString = async queryObject => {
  try {
    const { pageSize, filter, page } = queryObject;
    const response = await fetch(
      `${LEDGER_URL}/ledger/domain?page=${page}&page_size=${pageSize}&query=${filter}&type=102`
    );
    const json = await response.json();
    if (json) {
      const newResults = json.results.map((result, index) => {
        const attributes = Object.keys(result.txn.data.data.primary.r).filter(
          k => k !== "master_secret"
        );
        return {
          noNumber: index + 1,
          credential_definition_id: result.txnMetadata.txnId,
          attributes,
          tag: result.txn.data.tag,
          fromDID: result.txn.metadata.from
        };
      });
      return newResults;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
