import { useState, useCallback } from "react";
import logoSrc from "./assets/logo.svg";
import { fontDisplay, fontMono, fontSans, T, CategoryColors } from "./constants/theme";
import { now, seedData, uid } from "./constants/seedData";
import BackgroundCanvas from "./components/canvas/BackgroundCanvas";
import Graph from "./components/canvas/Graph";
import Btn from "./components/ui/Btn";
import Card from "./components/ui/Card";
import Empty from "./components/ui/Empty";
import CaseModal from "./components/modals/CaseModal";
import EntityModal from "./components/modals/EntityModal";
import RelationModal from "./components/modals/RelationModal";
import SourceModal from "./components/modals/SourceModal";
import NoteModal from "./components/modals/NoteModal";
import TimelineModal from "./components/modals/TimelineModal";
import EntityDetailModal from "./components/modals/EntityDetailModal";
import AIChat from "./components/AIChat";
import { buildAIContext } from "./utils/AIContext";

export default function DossierFlow() {
  const [db, setDb] = useState(seedData);
  const [activeTab, setActiveTab] = useState("graph");
  const [modal, setModal] = useState(null);
  const [detailEntity, setDetailEntity] = useState(null);

  const scoped = useCallback((arr) => arr.filter((x) => x.caseId === db.activeCaseId), [db.activeCaseId]);
  const currentCase = db.cases.find((c) => c.id === db.activeCaseId);

  const logHistory = (dbNext, action) => {
    dbNext.history.push({ id: uid(), caseId: dbNext.activeCaseId, action, ts: now() });
  };
  const update = (fn) => {
    setDb((prev) => {
      const next = {
        cases: [...prev.cases],
        entities: [...prev.entities],
        relations: [...prev.relations],
        sources: [...prev.sources],
        notes: [...prev.notes],
        timeline: [...prev.timeline],
        history: [...prev.history],
        activeCaseId: prev.activeCaseId,
      };
      fn(next);
      return next;
    });
  };

  const selectCase = (id) => update((d) => (d.activeCaseId = id));
  const createCase = (name, description) => {
    const id = uid();
    update((d) => {
      d.cases.push({ id, name, description, created: now() });
      d.activeCaseId = id;
      logHistory(d, "Case created");
    });
    setModal(null);
  };
  const addEntity = (name, type, note) => {
    update((d) => {
      d.entities.push({ id: uid(), caseId: d.activeCaseId, name, type, note });
      logHistory(d, `Added entity: ${name}`);
    });
    setModal(null);
  };
  const addRelation = (from, to, label, sourceId) => {
    update((d) => {
      d.relations.push({ id: uid(), caseId: d.activeCaseId, from, to, label, sourceId: sourceId || null });
      logHistory(d, `Added relationship: ${label}`);
    });
    setModal(null);
  };
  const addSource = (title, url, note) => {
    update((d) => {
      d.sources.push({ id: uid(), caseId: d.activeCaseId, title, url, note, added: now() });
      logHistory(d, `Added source: ${title}`);
    });
    setModal(null);
  };
  const addNote = (text) => {
    update((d) => {
      d.notes.push({ id: uid(), caseId: d.activeCaseId, text, added: now() });
      logHistory(d, "Added a note");
    });
    setModal(null);
  };
  const addTimeline = (date, title, detail) => {
    update((d) => {
      d.timeline.push({ id: uid(), caseId: d.activeCaseId, date, title, detail });
      logHistory(d, `Added timeline event: ${title}`);
    });
    setModal(null);
  };

  const ents = scoped(db.entities),
    srcs = scoped(db.sources),
    rels = scoped(db.relations),
    notesL = scoped(db.notes);
  const tlL = [...scoped(db.timeline)].sort((a, b) => a.date.localeCompare(b.date));
  const histL = [...scoped(db.history)].sort((a, b) => b.ts - a.ts);
  const aiContext = buildAIContext(db);

  const tabs = [
    { key: "graph", label: "Graph" },
    { key: "sources", label: "Sources" },
    { key: "notes", label: "Notes" },
    { key: "timeline", label: "Timeline" },
    { key: "history", label: "Version History" },
  ];

  return (
    <div
      className="dossierflow-shell"
      style={{ fontFamily: fontSans, color: T.ink, height: "100vh", overflow: "hidden", position: "relative", background: T.bg }}
    >
      <BackgroundCanvas />
      <div
        className="dossierflow-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "210px 1fr 360px",
          gridTemplateRows: "46px 1fr",
          height: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Topbar */}
        <div
          className="dossierflow-topbar"
          style={{
            gridColumn: "1 / 4",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: `1px solid ${T.line}`,
            background: T.panel,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                border: `1.5px solid ${T.ink}`,
                borderRadius: "50%",
                flexShrink: 0,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: T.panel,
              }}
            >
              <img src={logoSrc} alt="DossierFlow logo" style={{ width: "72%", height: "72%", objectFit: "contain" }} />
            </div>
            <h1 style={{ fontFamily: fontSans, fontSize: 16, fontWeight: 700, letterSpacing: "0.04em", color: T.ink, margin: 0 }}>DOSSIERFLOW</h1>
            <span style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 600, color: T.inkDim, letterSpacing: "0.08em", textTransform: "uppercase", marginLeft: 6 }}>
              OSINT WORKSPACE
            </span>
          </div>
          <div style={{ flex: 1, maxWidth: 420, margin: "0 24px" }}>
            <input
              placeholder="Search entities, sources, notes…"
              style={{
                width: "100%",
                background: T.panel,
                border: `1px solid ${T.line}`,
                color: T.ink,
                padding: "8px 12px",
                borderRadius: 4,
                fontFamily: fontSans,
                fontSize: 12.5,
                outline: "none",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontFamily: fontMono,
              fontSize: 11,
              fontWeight: 500,
              fontFeatureSettings: '"tnum" 1',
              color: T.inkDim,
            }}
          >
            <span>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: CategoryColors.organization.main,
                  display: "inline-block",
                  marginRight: 6,
                }}
              />
              Local session
            </span>
            <span>v{histL.length || 1}</span>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className="dossierflow-sidebar"
          style={{
            background: T.panel,
            borderRight: `1px solid ${T.line}`,
            padding: "16px 12px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: T.inkDim,
              padding: "0 6px 10px",
            }}
          >
            Cases
          </div>
          {db.cases.map((c) => {
            const entCount = db.entities.filter((e) => e.caseId === c.id).length;
            const active = c.id === db.activeCaseId;
            return (
              <div
                key={c.id}
                onClick={() => selectCase(c.id)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                  marginBottom: 6,
                  border: `1px solid ${active ? T.ink : "transparent"}`,
                  background: active ? T.panel2 : "transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ fontFamily: fontSans, fontSize: 13, fontWeight: active ? 600 : 500, color: T.ink }}>{c.name}</div>
                <div style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 500, fontFeatureSettings: '"tnum" 1', color: T.inkDim, marginTop: 4 }}>
                  {entCount} entities · {new Date(c.created).toLocaleDateString()}
                </div>
              </div>
            );
          })}
          <SidebarNewCaseBtn onClick={() => setModal({ type: "case" })} />
        </div>

        {/* Main Content */}
        <div className="dossierflow-main" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {!currentCase ? (
            <Empty text="No case selected — create a case to start collecting evidence." />
          ) : (
            <>
              {/* Header section */}
              <div style={{ padding: "12px 18px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h2 style={{ fontFamily: fontSans, fontSize: 17, fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em" }}>
                      {currentCase.name}
                    </h2>
                    <p style={{ fontFamily: fontSans, color: T.inkDim, fontSize: 12.5, lineHeight: 1.4, marginTop: 2, maxWidth: 680, fontWeight: 400 }}>
                      {currentCase.description}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[`${ents.length} entities`, `${srcs.length} sources`, `${rels.length} links`].map((b) => (
                      <span
                        key={b}
                        style={{
                          fontFamily: fontMono,
                          fontSize: 10,
                          fontWeight: 500,
                          fontFeatureSettings: '"tnum" 1',
                          padding: "2px 8px",
                          borderRadius: 3,
                          background: T.panel2,
                          color: T.ink,
                          border: `1px solid ${T.line}`,
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div
                className="dossierflow-tabs"
                style={{ display: "flex", gap: 4, padding: "8px 18px 0", borderBottom: "1px solid #E4DDD3" }}
              >
                {tabs.map((t) => (
                  <TabItem
                    key={t.key}
                    active={activeTab === t.key}
                    label={t.label}
                    onClick={() => setActiveTab(t.key)}
                  />
                ))}
              </div>



              {/* View Viewport */}
              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                {activeTab === "graph" && (
                  <div style={{ height: "100%", position: "relative" }}>
                    <div style={{ position: "absolute", top: 16, left: 20, zIndex: 5, display: "flex", gap: 8 }}>
                      <Btn onClick={() => setModal({ type: "entity" })}>+ Entity</Btn>
                      <Btn variant="secondary" onClick={() => setModal({ type: "relation" })}>
                        + Relationship
                      </Btn>
                    </div>
                    <Graph entities={ents} relations={rels} sources={srcs} onSelectEntity={setDetailEntity} />
                  </div>
                )}
                {activeTab === "sources" && (
                  <ListView
                    items={srcs}
                    empty="No sources logged yet."
                    button="+ Add source"
                    onAdd={() => setModal({ type: "source" })}
                    render={(s) => (
                      <>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: T.ink, margin: 0 }}>{s.title}</h3>
                        <div style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 500, color: T.inkDim, marginTop: 4 }}>
                          Added {new Date(s.added).toLocaleDateString()}
                        </div>
                        <p style={{ fontSize: 13, marginTop: 8 }}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: CategoryColors.organization.main, fontWeight: 600, wordBreak: "break-all" }}
                          >
                            {s.url}
                          </a>
                        </p>
                        {s.note && <p style={{ fontSize: 13, color: T.inkDim, marginTop: 6, lineHeight: 1.4 }}>{s.note}</p>}
                      </>
                    )}
                  />
                )}
                {activeTab === "notes" && (
                  <ListView
                    items={notesL}
                    empty="No notes yet."
                    button="+ Add note"
                    onAdd={() => setModal({ type: "note" })}
                    render={(n) => (
                      <>
                        <div style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 600, color: T.inkDim }}>
                          {new Date(n.added).toLocaleString()}
                        </div>
                        <p style={{ fontSize: 13, color: T.ink, marginTop: 6, lineHeight: 1.5 }}>{n.text}</p>
                      </>
                    )}
                  />
                )}
                {activeTab === "timeline" && <TimelineView items={tlL} onAdd={() => setModal({ type: "timeline" })} />}
                {activeTab === "history" && (
                  <ListView
                    items={histL}
                    empty="No history yet."
                    render={(h) => (
                      <>
                        <div style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 600, color: T.inkDim }}>
                          {new Date(h.ts).toLocaleString()}
                        </div>
                        <p style={{ fontSize: 13, color: T.ink, marginTop: 4, fontWeight: 500 }}>{h.action}</p>
                      </>
                    )}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* AI Assistant */}
        
        <div
          style={{
            gridColumn: "3 / 4",
            height: "100%",
            borderLeft: `1px solid ${T.line}`,
            padding: 24,
          }}
>
          <AIChat context={aiContext} />
       </div>
      </div>

      {/* Modals */}
      {modal?.type === "case" && <CaseModal onClose={() => setModal(null)} onSubmit={createCase} />}
      {modal?.type === "entity" && <EntityModal onClose={() => setModal(null)} onSubmit={addEntity} />}
      {modal?.type === "relation" && (
        <RelationModal onClose={() => setModal(null)} onSubmit={addRelation} entities={ents} sources={srcs} />
      )}
      {modal?.type === "source" && <SourceModal onClose={() => setModal(null)} onSubmit={addSource} />}
      {modal?.type === "note" && <NoteModal onClose={() => setModal(null)} onSubmit={addNote} />}
      {modal?.type === "timeline" && <TimelineModal onClose={() => setModal(null)} onSubmit={addTimeline} />}
      {detailEntity && (
        <EntityDetailModal
          entity={detailEntity}
          relations={rels}
          entities={ents}
          sources={srcs}
          onClose={() => setDetailEntity(null)}
        />
      )}
    </div>
  );
}

function ListView({ items, empty, button, onAdd, render }) {
  return (
    <div style={{ height: "100%", overflowY: "auto", padding: 24 }}>
      {button && (
        <div style={{ marginBottom: 18 }}>
          <Btn onClick={onAdd}>{button}</Btn>
        </div>
      )}
      {items.length === 0 ? <Empty text={empty} /> : items.map((item) => <Card key={item.id}>{render(item)}</Card>)}
    </div>
  );
}

function TimelineView({ items, onAdd }) {
  return (
    <div style={{ height: "100%", overflowY: "auto", padding: 24 }}>
      <div style={{ marginBottom: 18 }}>
        <Btn onClick={onAdd}>+ Add event</Btn>
      </div>
      {items.length === 0 ? (
        <Empty text="No events yet." />
      ) : (
        <div style={{ position: "relative", paddingLeft: 20 }}>
          <div style={{ position: "absolute", left: 5, top: 4, bottom: 4, width: 2, background: T.line }} />
          {items.map((t) => (
            <div key={t.id} style={{ position: "relative", paddingBottom: 22, paddingLeft: 18 }}>
              <div
                style={{
                  position: "absolute",
                  left: -17,
                  top: 4,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: CategoryColors.person.main,
                  border: `2px solid ${T.bg}`,
                }}
              />
              <div style={{ fontFamily: fontMono, fontSize: 11, fontWeight: 700, color: CategoryColors.person.main }}>{t.date}</div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: T.ink, margin: "4px 0 2px" }}>{t.title}</h4>
              <p style={{ fontSize: 13, color: T.inkDim, lineHeight: 1.4 }}>{t.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TabItem({ active, label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: fontMono,
        fontSize: 12,
        fontWeight: active ? 600 : 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: active ? "#1E1E1E" : hovered ? "#1E1E1E" : "#7A746E",
        padding: "10px 16px",
        cursor: "pointer",
        borderBottom: `2px solid ${active ? "#1E1E1E" : "transparent"}`,
        transition: "all 0.15s ease",
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
}

function SidebarNewCaseBtn({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginTop: 10,
        padding: "9px 12px",
        border: "1px solid #D5CCC0",
        borderRadius: 6,
        color: "#1E1E1E",
        fontFamily: fontSans,
        fontWeight: 600,
        fontSize: 12,
        textAlign: "center",
        cursor: "pointer",
        background: hovered ? "#EFE9DF" : "#FAF7F2",
        transition: "all 0.15s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        userSelect: "none",
      }}
    >
      + New case
    </button>
  );
}


