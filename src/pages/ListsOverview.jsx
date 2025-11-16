// src/pages/ListsOverview.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CURRENT_USER_ID } from "../data";

export default function ListsOverview({ lists, setLists }) {
  const navigate = useNavigate();

  // state for modal window and new list name
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  // go to detail route
  const openDetails = (id) => {
    navigate(`/lists/${id}`);
  };

  // open / close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewListName("");
  };

  // create new list
  const handleCreateList = () => {
    if (!newListName.trim()) return;

    const newList = {
      id: String(Date.now()), // simple id
      name: newListName.trim(),
      ownerId: CURRENT_USER_ID, // creator = owner
      members: [],
      items: [],
    };

    setLists((prev) => [...prev, newList]);
    closeModal();
  };

  // delete list with confirmation
  const handleDeleteList = (event, id) => {
    event.stopPropagation(); // prevent opening details on delete click

    const target = lists.find((l) => l.id === id);
    if (!target) return;

    const ok = window.confirm(
      `Do you really want to delete the list "${target.name}"?`
    );
    if (!ok) return;

    setLists((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div>
      <div className="overview-header">
        <h1>Shopping lists</h1>
        <button onClick={openModal}>Add new list</button>
      </div>

      <div className="tiles-grid">
        {lists.map((list) => (
          <div
            key={list.id}
            className="tile"
            onClick={() => openDetails(list.id)}
          >
            <h3>{list.name}</h3>
            <p>{list.items.length} items</p>
            <button
              className="delete-btn"
              onClick={(e) => handleDeleteList(e, list.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>New shopping list</h2>
            <input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="List name"
            />
            <div className="modal-actions">
              <button onClick={handleCreateList}>Create</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
