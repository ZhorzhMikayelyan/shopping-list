const delay = (ms) => new Promise((r) => setTimeout(r, ms));

let db = [
  {
    id: "m1",
    name: "Mock list",
    state: "active",
    ownerUuIdentity: "uu5:1234-5678",
    members: [{ uuIdentity: "uu5:1234-5678", role: "owner" }],
    items: [
      { id: "i1", name: "Milk", isSolved: false },
      { id: "i2", name: "Bread", isSolved: true },
      { id: "i3", name: "Apples", isSolved: false },
    ],
  },
  {
    id: "m2",
    name: "Mock household",
    state: "active",
    ownerUuIdentity: "uu5:9999-8888",
    members: [
      { uuIdentity: "uu5:9999-8888", role: "owner" },
      { uuIdentity: "uu5:1234-5678", role: "member" },
    ],
    items: [{ id: "i1", name: "Dish soap", isSolved: true }],
  },
];

export const mockClient = {
  async list() {
    await delay(150);
    return {
      itemList: db.map((l) => ({
        id: l.id,
        name: l.name,
        state: l.state,
        ownerUuIdentity: l.ownerUuIdentity,
        itemCount: l.items.length,
      })),
      uuAppErrorMap: {},
    };
  },

  async get(id) {
    await delay(150);
    const found = db.find((x) => x.id === id);
    if (!found) throw new Error("not found");
    return { ...found, uuAppErrorMap: {} };
  },

  async create({ name }) {
    await delay(150);
    if (!name || !String(name).trim()) throw new Error("invalid name");

    const newList = {
      id: `m${Date.now()}`,
      name: String(name).trim(),
      state: "active",
      ownerUuIdentity: "uu5:1234-5678",
      members: [{ uuIdentity: "uu5:1234-5678", role: "owner" }],
      items: [],
    };
    db = [...db, newList];
    return { ...newList, uuAppErrorMap: {} };
  },

  async update(id, dtoIn) {
    await delay(150);
    db = db.map((l) => (l.id === id ? { ...l, ...dtoIn } : l));
    const updated = db.find((l) => l.id === id);
    if (!updated) throw new Error("not found");
    return { ...updated, uuAppErrorMap: {} };
  },

  async remove(id) {
    await delay(150);
    const exists = db.some((l) => l.id === id);
    db = db.filter((l) => l.id !== id);
    if (!exists) throw new Error("not found");
    return { id, deleted: true, uuAppErrorMap: {} };
  },
};
