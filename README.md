<div align="center">

# 🕵️ DOSSIERFLOW

### *Investigate. Connect. Understand.*

<a href="https://github.com/Sanchali-rif/DossierFlow">
  <img src="https://img.shields.io/badge/DossierFlow-OSINT%20Workspace-6C4AB6?style=for-the-badge&logo=github&logoColor=white" />
</a>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Space+Mono&size=20&duration=2800&pause=900&color=8B5CF6&center=true&vCenter=true&width=700&lines=An+OSINT+Investigation+Workspace;Map+Entities+%E2%80%A2+Connect+Relationships+%E2%80%A2+Track+Evidence;Now+with+an+AI-Powered+Investigation+Assistant+%F0%9F%A4%96" />

<br/>

<p>
  <b>Organise intelligence.</b>
  <b>Visualise connections.</b>
  <b>Find the story.</b>
</p>

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![D3](https://img.shields.io/badge/D3.js-7-F9A03C?style=flat-square&logo=d3dotjs&logoColor=white)](https://d3js.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)](LICENSE)

<br/>

**🌐 Local-first • 🔍 OSINT-focused • 🧠 AI-assisted • 📊 Graph-powered**

</div>

---

## ✨ What is DossierFlow?

**DossierFlow** is a local-first, browser-based **OSINT investigation workspace** designed for investigators who think in graphs.

Instead of scattering information across documents, tabs and spreadsheets, DossierFlow brings the investigation into one structured environment.

You can:

- 👤 Track people and organisations
- 🔗 Connect entities through relationships
- 🌐 Record and organise sources
- 📝 Write investigation notes
- 🕐 Build chronological timelines
- 🧬 Explore entity connections through an interactive graph
- 🧾 Review investigation history
- 🤖 Ask an AI assistant about the current investigation

> **Your investigation is no longer a pile of information.  
> It becomes a connected story.**

---

# 🌟 Why DossierFlow?

Traditional investigation workflows often look like:

```text
Browser Tabs
     ↓
Spreadsheets
     ↓
Notes
     ↓
Screenshots
     ↓
More Tabs
     ↓
Confusion 💀
```

DossierFlow turns that into:

```text
                  ┌───────────────┐
                  │    CASE       │
                  └───────┬───────┘
                          │
          ┌───────────────┼───────────────┐
          ↓               ↓               ↓
      👤 Entities     🔗 Relations     🌐 Sources
          │               │               │
          └───────────────┼───────────────┘
                          ↓
                     📝 Notes
                          ↓
                    🕐 Timeline
                          ↓
                    🤖 AI Assistant
                          ↓
                   🔎 Investigation
```

---

# 🚀 Features

<table>
<tr>
<td width="50%">

### 🧩 Multi-Case Management

Create and switch between independent investigation cases.

Each case maintains its own:

- Entities
- Relationships
- Sources
- Notes
- Timeline
- History

</td>

<td width="50%">

### 🕸️ Interactive Entity Graph

A D3-powered force-directed graph visualises connections between entities.

Features include:

- Drag nodes
- Zoom
- Pan
- Relationship edges
- Entity inspection
- Visual connection mapping

</td>
</tr>

<tr>
<td>

### 🔗 Relationship Linking

Connect entities using meaningful, labelled relationships.

Examples:

```text
Director of
Owns
Works for
Connected to
Shares agent with
```

</td>

<td>

### 🌐 Source Logging

Every piece of evidence can be connected to a source.

Store:

- Source title
- URL
- Notes
- Evidence context
- Added timestamp

</td>
</tr>

<tr>
<td>

### 📝 Investigation Notes

Keep free-form notes attached to the active case.

Capture:

- Leads
- Observations
- Hypotheses
- Follow-up ideas
- Important findings

</td>

<td>

### 🕐 Investigation Timeline

Build a chronological record of important events.

Each event can contain:

- Date
- Title
- Detailed description

</td>
</tr>

<tr>
<td>

### 🧾 Version History

Track important actions performed during an investigation.

Examples:

```text
Case created
Entity added
Relationship added
Source added
Note added
Timeline event added
```

</td>

<td>

### 🧠 Entity Detail Panel

Select an entity to inspect:

- Connected entities
- Relationships
- Sources
- Notes
- Investigation context

</td>
</tr>
</table>

---

# 🤖 DossierFlow AI

## Meet your Investigation Assistant

DossierFlow now includes an **AI-powered investigation assistant** designed specifically around the current case.

This isn't meant to be a generic chatbot sitting beside the application.

The goal is:

```text
                 CURRENT CASE
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
     Entities     Relations      Sources
        │             │             │
        ├─────────────┼─────────────┤
        ↓             ↓             ↓
      Notes        Timeline       History
        │             │             │
        └─────────────┼─────────────┘
                      ↓
                🧠 AI CONTEXT
                      ↓
                🤖 AI ASSISTANT
                      ↓
             INVESTIGATION INSIGHT
```

The assistant is designed to understand the information belonging to the **active investigation case**.

---

## 💬 What can you ask?

For example:

> **"Summarise this investigation."**

> **"What are the strongest connections?"**

> **"Which entities are most important?"**

> **"Are there gaps in the evidence?"**

> **"What should I investigate next?"**

> **"Explain the connection between these two entities."**

> **"Build a timeline from the available evidence."**

> **"What sources support this relationship?"**

---

## 🧠 Case-Aware AI

The important part is the **context layer**.

Instead of sending a generic question to an AI model, DossierFlow prepares structured information from the active case:

```text
CASE
│
├── Entities
│   ├── People
│   ├── Organisations
│   └── Other entities
│
├── Relationships
│
├── Sources
│
├── Notes
│
├── Timeline
│
└── Investigation History
```

This context is then provided to the AI assistant.

### The result:

```text
User Question
      ↓
Current Case Context
      ↓
AI Reasoning
      ↓
Structured Investigation Response
```

---

# 🕵️ Example Investigation

A seeded example case contains:

### 👤 Entities

```text
Marta Voss
        │
        │ Director of
        ↓
Riverbend Holdings Ltd
        │
        │ Shares agent with
        ↓
Aurel Partners
```

### 🌐 Sources

```text
OpenCorporates filing
        +
Cyprus Registrar extract
```

### 📝 Investigation Note

```text
Registered agent address matches
other companies flagged in
ICIJ Offshore Leaks.
```

### 🕐 Timeline

```text
2019-03-14
Riverbend Holdings incorporated

        ↓

2021-07-02
Aurel Partners registered
```

Now the investigator can ask:

> **"What is the strongest lead in this case?"**

Instead of manually checking every panel, the AI can analyse the structured case context and help surface the important connection.

---

# 🧬 Investigation Workflow

```text
┌──────────────────────────────┐
│        CREATE CASE           │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       ADD ENTITIES           │
│   People • Organisations     │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│     LINK RELATIONSHIPS       │
│      Entity → Entity         │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       ADD SOURCES            │
│     URLs • Evidence          │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│      WRITE NOTES             │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│      BUILD TIMELINE          │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│       ASK THE AI 🤖          │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│     INVESTIGATION INSIGHT    │
└──────────────────────────────┘
```

---

# 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │    DossierFlow       │
                    └──────────┬───────────┘
                               │
                               ↓
                    ┌──────────────────────┐
                    │    Application State │
                    │                      │
                    │ Cases                │
                    │ Entities             │
                    │ Relations            │
                    │ Sources              │
                    │ Notes                │
                    │ Timeline             │
                    │ History              │
                    └──────────┬───────────┘
                               │
                               ↓
                    ┌──────────────────────┐
                    │   AI Context Layer   │
                    │    AIContext.js      │
                    └──────────┬───────────┘
                               │
                               ↓
                    ┌──────────────────────┐
                    │   AI Chat Interface  │
                    │      AIChat.jsx      │
                    └──────────┬───────────┘
                               │
                               ↓
                    ┌──────────────────────┐
                    │      AI Service      │
                    └──────────────────────┘
```

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ React | User interface |
| ⚡ Vite | Development & build tooling |
| 🕸️ D3.js | Interactive entity graph |
| 🟨 JavaScript | Application logic |
| 🎨 CSS | Interface styling |
| 🤖 AI Integration | Investigation assistance |
| 💾 Local State | Case management |

---

# 📁 Project Structure

```text
DossierFlow/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── logo.svg
│   │   └── ...
│   │
│   ├── components/
│   │   │
│   │   ├── canvas/
│   │   │   ├── BackgroundCanvas.jsx
│   │   │   └── Graph.jsx
│   │   │
│   │   ├── modals/
│   │   │   ├── CaseModal.jsx
│   │   │   ├── EntityModal.jsx
│   │   │   ├── RelationModal.jsx
│   │   │   ├── SourceModal.jsx
│   │   │   ├── NoteModal.jsx
│   │   │   ├── TimelineModal.jsx
│   │   │   └── EntityDetailModal.jsx
│   │   │
│   │   └── ui/
│   │       ├── Btn.jsx
│   │       ├── Card.jsx
│   │       ├── Empty.jsx
│   │       ├── Field.jsx
│   │       └── Legend.jsx
│   │
│   ├── constants/
│   │   ├── seedData.js
│   │   └── theme.js
│   │
│   ├── utils/
│   │   └── AIContext.js
│   │
│   ├── AIChat.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── DossierFlow.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone the repository

```bash
git clone https://github.com/Sanchali-rif/DossierFlow.git
```

## 2️⃣ Enter the project

```bash
cd DossierFlow
```

## 3️⃣ Install dependencies

```bash
npm install
```

## 4️⃣ Start the development server

```bash
npm run dev
```

Vite will provide a local URL such as:

```text
http://localhost:5173/
```

If that port is already in use, Vite may automatically select another port.

---

# 🧪 Available Commands

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

# 🔐 AI Configuration

If AI API functionality is enabled, keep your API credentials **server-side**.

Create a local environment file:

```text
.env.local
```

Example:

```env
OPENAI_API_KEY=your_api_key_here
```

### ⚠️ Never commit your API key.

Do not share it publicly or place it directly inside frontend React components.

---

# 🎨 Design Philosophy

DossierFlow follows a visual language inspired by:

```text
🗂️ Investigation Files
      +
🕵️ Intelligence Workspaces
      +
🧬 Network Graphs
      +
🤖 Modern AI Interfaces
```

The interface focuses on:

- Clear information hierarchy
- Minimal visual noise
- Graph-first investigation
- Fast case navigation
- Evidence traceability
- Context-aware AI assistance

---

# 🧠 AI Design Principles

The DossierFlow AI assistant follows several important principles:

### 1. Case awareness

The AI should focus on the active investigation.

### 2. Evidence grounding

Answers should be based on the information available in the case.

### 3. No invented evidence

The assistant should not fabricate sources, entities or relationships.

### 4. Fact vs inference

The assistant should distinguish:

```text
FACT
↓
Information directly present in the case

INFERENCE
↓
Reasonable conclusion derived from available information

UNKNOWN
↓
Information that is not currently available
```

### 5. Investigation assistance

The AI should help investigators think about:

- Evidence gaps
- Relationships
- Contradictions
- Timeline patterns
- Potential leads
- Next investigative steps

---

# 🗺️ Roadmap

### ✅ Completed

- [x] Multi-case management
- [x] Entity management
- [x] Relationship mapping
- [x] D3 interactive graph
- [x] Source logging
- [x] Investigation notes
- [x] Timeline
- [x] Entity detail panel
- [x] Version history
- [x] AI chat interface
- [x] Case context builder
- [x] AI assistant integration architecture

### 🚧 In Progress

- [ ] Production AI backend
- [ ] Advanced evidence reasoning
- [ ] AI-generated investigation summaries
- [ ] Contradiction detection
- [ ] Automated lead suggestions

### 🔮 Future Ideas

- [ ] Import investigation datasets
- [ ] Export complete dossiers
- [ ] Advanced graph filtering
- [ ] Source credibility indicators
- [ ] AI-assisted relationship discovery
- [ ] Search across multiple cases
- [ ] Collaborative investigations
- [ ] Investigation report generation
- [ ] Evidence confidence scoring

---

# ⚡ The Vision

DossierFlow isn't just another graph visualiser.

The bigger idea is to create a workspace where:

```text
Information
     ↓
Structure
     ↓
Connections
     ↓
Context
     ↓
AI Assistance
     ↓
Better Investigation
```

The investigator remains in control.

The AI helps organise, analyse and question the available information — while the investigator makes the final judgement.

---

# 🤝 Contributing

Contributions, ideas and experiments are welcome.

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
git add .

# Commit
git commit -m "Add amazing feature"

# Push
git push origin feature/amazing-feature
```

Then open a Pull Request.

---

# 📜 License

This project is licensed under the MIT License.

---

<div align="center">

## 🕵️ Investigate smarter.

### 🔗 Connect the dots.  
### 🧠 Understand the context.  
### 🤖 Let AI help with the next question.

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Space+Mono&size=16&duration=2600&pause=800&color=6C4AB6&center=true&vCenter=true&width=600&lines=Every+entity+has+a+story.;Every+relationship+has+a+context.;Every+source+can+change+the+picture.;Follow+the+evidence." />

<br/>

**Built with curiosity, graphs & a little AI magic. ✨**

</div>