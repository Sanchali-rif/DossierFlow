export function buildAIContext(db) {
  const caseId = db.activeCaseId;

  const currentCase = db.cases.find((c) => c.id === caseId);

  const entities = db.entities.filter((x) => x.caseId === caseId);
  const relations = db.relations.filter((x) => x.caseId === caseId);
  const sources = db.sources.filter((x) => x.caseId === caseId);
  const notes = db.notes.filter((x) => x.caseId === caseId);
  const timeline = db.timeline
    .filter((x) => x.caseId === caseId)
    .sort((a, b) => a.date.localeCompare(b.date));
  const history = db.history
    .filter((x) => x.caseId === caseId)
    .sort((a, b) => b.ts - a.ts);

  const entityName = (id) =>
    entities.find((e) => e.id === id)?.name || id;

  return {
    case: currentCase || null,

    entities: entities.map((e) => ({
      id: e.id,
      name: e.name,
      type: e.type,
      note: e.note,
    })),

    relationships: relations.map((r) => ({
      from: entityName(r.from),
      to: entityName(r.to),
      label: r.label,
      sourceId: r.sourceId || null,
    })),

    sources: sources.map((s) => ({
      id: s.id,
      title: s.title,
      url: s.url,
      note: s.note,
    })),

    notes: notes.map((n) => ({
      text: n.text,
      added: new Date(n.added).toISOString(),
    })),

    timeline,

    history: history.map((h) => ({
      action: h.action,
      timestamp: new Date(h.ts).toISOString(),
    })),
  };
}