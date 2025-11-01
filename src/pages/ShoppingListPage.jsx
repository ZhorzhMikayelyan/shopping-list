import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SHOPPING_LISTS, USERS, CURRENT_USER_ID } from "../data";
import ListHeader from "../components/ListHeader";
import ItemsFilter from "../components/ItemsFilter";
import ItemsList from "../components/ItemsList";
import NewItemForm from "../components/NewItemForm";
import MembersPanel from "../components/MembersPanel";

export default function ShoppingListPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialList = SHOPPING_LISTS.find((l) => l.id === id);
  const [list, setList] = useState(initialList);
  const [filter, setFilter] = useState("all");

  if (!list) {
    return (
      <div>
        <h2>List not found</h2>
        <button onClick={() => navigate("/")}>← Back</button>
      </div>
    );
  }

  const isOwner = list.ownerId === CURRENT_USER_ID;
  const isMember = isOwner || list.members.includes(CURRENT_USER_ID);

  // ---------------- Actions ----------------
  const handleRename = (newName) => {
    if (!isOwner) return;
    setList((prev) => ({ ...prev, name: newName }));
  };

  const handleAddItem = (itemName) => {
    if (!itemName.trim()) return;
    const newItem = {
      id: "i" + Math.random().toString(16).slice(2),
      name: itemName.trim(),
      resolved: false,
    };
    setList((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleToggleItem = (itemId) => {
    setList((prev) => ({
      ...prev,
      items: prev.items.map((it) =>
        it.id === itemId ? { ...it, resolved: !it.resolved } : it
      ),
    }));
  };

  const handleRemoveItem = (itemId) => {
    setList((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== itemId),
    }));
  };

  const handleAddMember = (userId) => {
    if (!isOwner) return;
    if (list.members.includes(userId) || list.ownerId === userId) return;
    setList((prev) => ({ ...prev, members: [...prev.members, userId] }));
  };

  const handleRemoveMember = (userId) => {
    if (!isOwner) return;
    setList((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m !== userId),
    }));
  };

  const handleLeave = () => {
    if (isOwner) return;
    setList((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m !== CURRENT_USER_ID),
    }));
    navigate("/");
  };

  const filteredItems = list.items.filter((it) => {
    if (filter === "resolved") return it.resolved;
    if (filter === "unresolved") return !it.resolved;
    return true;
  });

  return (
    <div className="shopping-page">
      <ListHeader
        list={list}
        isOwner={isOwner}
        currentUser={USERS[CURRENT_USER_ID]}
        onRename={handleRename}
      />

      <div className="layout">
        <div className="left">
          <ItemsFilter value={filter} onChange={setFilter} />

          <ItemsList
            items={filteredItems}
            onToggle={handleToggleItem}
            onRemove={handleRemoveItem}
          />

          <NewItemForm onAdd={handleAddItem} />
        </div>

        <div className="right">
          <MembersPanel
            list={list}
            users={USERS}
            currentUserId={CURRENT_USER_ID}
            isOwner={isOwner}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
            onLeave={handleLeave}
          />
        </div>
      </div>
    </div>
  );
}
