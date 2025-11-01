export default function ItemsFilter({ value, onChange }) {
  return (
    <div className="items-filter">
      <span>Show:</span>
      <button
        className={value === "all" ? "active" : ""}
        onClick={() => onChange("all")}
      >
        All
      </button>
      <button
        className={value === "unresolved" ? "active" : ""}
        onClick={() => onChange("unresolved")}
      >
        Unresolved
      </button>
      <button
        className={value === "resolved" ? "active" : ""}
        onClick={() => onChange("resolved")}
      >
        Resolved
      </button>
    </div>
  );
}
