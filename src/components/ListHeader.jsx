import { useState } from "react";

export default function ListHeader({ list, isOwner, currentUser, onRename }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(list.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRename(value);
    setEditing(false);
  };

  return (
    <div className="list-header">
      {editing ? (
        <form onSubmit={handleSubmit} className="name-form">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="title-row">
          <h2>{list.name}</h2>
          {isOwner && (
            <button onClick={() => setEditing(true)}>Edit name</button>
          )}
        </div>
      )}

      <p className="muted">
        Owner: <strong>{list.ownerId}</strong> · Members: {list.members.length}
      </p>
    </div>
  );
}
