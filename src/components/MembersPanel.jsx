import { useState } from "react";

export default function MembersPanel({
  list,
  users,
  currentUserId,
  isOwner,
  onAddMember,
  onRemoveMember,
  onLeave,
}) {
  const [selectedUser, setSelectedUser] = useState("");

  const allUsers = Object.values(users);

  return (
    <div className="members-panel">
      <h3>Members</h3>
      <ul className="members-list">
        <li>
          <strong>{users[list.ownerId]?.name || list.ownerId}</strong>{" "}
          <span className="badge">owner</span>
        </li>

        {list.members.map((uId) => (
          <li key={uId}>
            {users[uId]?.name || uId}
            {isOwner && (
              <button
                className="small-btn"
                onClick={() => onRemoveMember(uId)}
              >
                remove
              </button>
            )}
            {!isOwner && uId === currentUserId && (
              <button className="small-btn" onClick={onLeave}>
                leave
              </button>
            )}
          </li>
        ))}
      </ul>

      {isOwner && (
        <>
          <h4>Add member</h4>
          <div className="add-member-row">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">-- select user --</option>
              {allUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                if (selectedUser) onAddMember(selectedUser);
                setSelectedUser("");
              }}
            >
              Add
            </button>
          </div>
        </>
      )}
    </div>
  );
}
