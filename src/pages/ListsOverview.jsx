import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiClient } from "../api";
import { useSettings } from "../context/SettingsContext";
import { t } from "../i18n";

function countBarWidth(count, max) {
  if (max <= 0) return 0;
  return Math.round((count / max) * 100);
}

export default function ListsOverview() {
  const navigate = useNavigate();
  const { lang, useMock } = useSettings();
  const api = useMemo(() => getApiClient(useMock), [useMock]);

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const res = await api.list();
      setLists(res.itemList || []);
    } catch (e) {
      setErr(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const maxCount = useMemo(() => {
    return Math.max(0, ...lists.map((l) => Number(l.itemCount || 0)));
  }, [lists]);

  function openDetails(id) {
    navigate(`/lists/${id}`);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setNewListName("");
  }

  async function handleCreate() {
    if (!newListName.trim()) return;
    setErr("");
    try {
      await api.create({ name: newListName.trim() });
      closeModal();
      await load();
    } catch (e) {
      setErr(String(e.message || e));
    }
  }

  async function handleDelete(e, list) {
    e.stopPropagation();
    const ok = window.confirm(t(lang, "confirmDelete", { name: list.name }));
    if (!ok) return;

    setErr("");
    try {
      await api.remove(list.id);
      await load();
    } catch (e2) {
      setErr(String(e2.message || e2));
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{t(lang, "overviewTitle")}</h1>
        <button className="btn btn-primary" onClick={openModal}>
          + {t(lang, "addNewList")}
        </button>
      </div>

      {loading && <div className="hint">{t(lang, "loading")}</div>}
      {err && (
        <div className="errorBox">
          <strong>{t(lang, "error")}:</strong>
          <pre className="errorPre">{err}</pre>
        </div>
      )}

      {!loading && lists.length === 0 && <div className="hint">{t(lang, "empty")}</div>}

      <div className="grid">
        {lists.map((list) => {
          const count = Number(list.itemCount || 0);
          const w = countBarWidth(count, maxCount);

          return (
            <div key={list.id} className="card" onClick={() => openDetails(list.id)} role="button" tabIndex={0}>
              <div className="card-head">
                <div className="card-title">{list.name}</div>
                <button className="btn btn-danger" onClick={(e) => handleDelete(e, list)}>
                  {t(lang, "delete")}
                </button>
              </div>

              <div className="card-body">
                <div className="meta">
                  <span className="badge">{count} {t(lang, "items")}</span>
                  <span className="muted">{list.state}</span>
                </div>

                {/* Visualized item counts (mini bar) */}
                <div className="barWrap" aria-label="Item count visualization">
                  <div className="barFill" style={{ width: `${w}%` }} />
                </div>

                <div className="card-actions">
                  <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); openDetails(list.id); }}>
                    {t(lang, "open")} →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="modalBackdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitle">{t(lang, "addNewList")}</h2>
            <label className="label">
              {t(lang, "listName")}
              <input
                className="input"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder={t(lang, "listName")}
              />
            </label>

            <div className="modalActions">
              <button className="btn btn-primary" onClick={handleCreate}>
                {t(lang, "create")}
              </button>
              <button className="btn btn-ghost" onClick={closeModal}>
                {t(lang, "cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
