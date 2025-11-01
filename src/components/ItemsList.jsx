export default function ItemsList({ items, onToggle, onRemove }) {
  if (items.length === 0) {
    return <p className="muted">No items</p>;
  }

  return (
    <ul className="items-list">
      {items.map((item) => (
        <li key={item.id} className="item-row">
          <label>
            <input
              type="checkbox"
              checked={item.resolved}
              onChange={() => onToggle(item.id)}
            />
            <span className={item.resolved ? "done" : ""}>{item.name}</span>
          </label>
          <button onClick={() => onRemove(item.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}
