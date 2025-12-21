import { realClient } from "./realClient";
import { mockClient } from "./mockClient";

export const isMockEnabledByEnv = String(process.env.REACT_APP_USE_MOCK) === "true";

export function getApiClient(useMock) {
  return useMock ? mockClient : realClient;
}
