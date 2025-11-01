// Mock data for the task
export const CURRENT_USER_ID = "u2";

export const USERS = {
  u1: { id: "u1", name: "Alice" },
  u2: { id: "u2", name: "Bob" },
  u3: { id: "u3", name: "Carol" },
};

export const SHOPPING_LISTS = [
  {
    id: "1",
    name: "Saturday Groceries",
    ownerId: "u1",
    members: ["u2", "u3"],
    items: [
      { id: "i1", name: "Milk", resolved: false },
      { id: "i2", name: "Bread", resolved: true },
      { id: "i3", name: "Cheese", resolved: false },
    ],
  },
  {
    id: "2",
    name: "Hiking Trip",
    ownerId: "u2",
    members: ["u1"],
    items: [{ id: "i4", name: "Tent", resolved: true }],
  },
];
