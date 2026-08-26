export const uid = () => Math.random().toString(36).slice(2, 9);
export const now = () => Date.now();

export function seedData() {
  const caseId = uid();
  const e1 = uid(), e2 = uid(), e3 = uid();
  const s1 = uid(), s2 = uid();
  return {
    cases: [{ id: caseId, name: "Shell Company Network — Riverbend Holdings", description: "Tracing ownership structure of Riverbend Holdings and linked entities across three jurisdictions.", created: now() - 86400000 * 4 }],
    entities: [
      { id: e1, caseId, name: "Marta Voss", type: "person", note: "Listed director, 3 shell companies" },
      { id: e2, caseId, name: "Riverbend Holdings Ltd", type: "organization", note: "Registered in Cyprus, 2019" },
      { id: e3, caseId, name: "Aurel Partners", type: "organization", note: "Shared registered agent with Riverbend" },
    ],
    relations: [{ id: uid(), caseId, from: e1, to: e2, label: "Director of", sourceId: s1 }, { id: uid(), caseId, from: e2, to: e3, label: "Shares agent with", sourceId: s2 }],
    sources: [
      { id: s1, caseId, title: "OpenCorporates filing — Riverbend Holdings", url: "https://opencorporates.com/companies/example", note: "Director listing, filed 2019-03-14", added: now() - 86400000 * 3 },
      { id: s2, caseId, title: "Cyprus Registrar of Companies extract", url: "https://example-registry.gov.cy/record", note: "Registered agent match across two filings", added: now() - 86400000 * 2 },
    ],
    notes: [{ id: uid(), caseId, text: "Registered agent address matches 2 other companies flagged in ICIJ Offshore Leaks — worth cross-checking.", added: now() - 86400000 }],
    timeline: [{ id: uid(), caseId, date: "2019-03-14", title: "Riverbend Holdings incorporated", detail: "Filed in Cyprus registry with Marta Voss as director." }, { id: uid(), caseId, date: "2021-07-02", title: "Aurel Partners registered", detail: "Same registered agent as Riverbend." }],
    history: [{ id: uid(), caseId, action: "Case created", ts: now() - 86400000 * 4 }, { id: uid(), caseId, action: "Added 3 entities, 2 relationships, 2 sources", ts: now() - 86400000 * 3 }],
    activeCaseId: caseId,
  };
}

export const esc = (s) => s || "";
