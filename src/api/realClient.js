const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      data?.uuAppErrorMap
        ? JSON.stringify(data.uuAppErrorMap, null, 2)
        : `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
}

export const realClient = {
  list: () => http("GET", "/shoppingList/list"),
  get: (id) => http("GET", `/shoppingList/get/${id}`),
  create: (dtoIn) => http("POST", "/shoppingList/create", dtoIn),
  update: (id, dtoIn) => http("PUT", `/shoppingList/update/${id}`, dtoIn),
  remove: (id) => http("DELETE", `/shoppingList/delete/${id}`),
};
