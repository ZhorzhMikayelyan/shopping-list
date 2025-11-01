import { useState } from "react";

export default function NewItemForm({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add new item..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
