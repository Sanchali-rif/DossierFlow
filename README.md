# DossierFlow

> **An OSINT workspace for mapping entities, relationships, and evidence — built for investigators who think in graphs.**

DossierFlow is a local-first, browser-based investigation tool that lets you organise open-source intelligence into structured cases. Track people and organisations, visualise connections as an interactive force-directed graph, log sources, write notes, build timelines, and review a full version history — all without a backend.

---

## Features

| Feature | Description |
|---|---|
| **Multi-case management** | Create and switch between independent investigation cases |
| **Entity graph** | D3-powered force-directed graph with draggable nodes and zoom/pan |
| **Relationship linking** | Connect entities with typed, labelled edges — optionally cite a source |
| **Source log** | Record URLs, titles, and notes for every piece of evidence |
| **Notes** | Free-form timestamped notes per case |
| **Timeline** | Chronological event log with date, title, and detail |
| **Version history** | Every action is appended to an immutable audit log |
| **Entity detail panel** | Click any graph node to inspect all connected relations and source citations |

## Tech Stack

- **React 19** — UI and state management
- **Vite** — dev server and bundler  
- **D3 v7** — force-simulation graph rendering
- **IBM Plex Sans / Mono / Archivo Black** — typography
- **Vanilla CSS** — styling (no UI framework)

## Getting Started

### Prerequisites

- Node.js ≥ 18

### Install & run

```bash
# Clone the repo
git clone https://github.com/your-username/DossierFlow.git
cd DossierFlow

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
# Preview the production build locally
npm run preview
```

## Project Structure

```
src/
├── DossierFlow.jsx          # Root application component — state, layout, CRUD actions
├── App.jsx                  # App entry wrapper
├── index.css                # Global styles and CSS resets
├── constants/
│   ├── theme.js             # Design tokens (colours, fonts)
│   └── seedData.js          # Demo case data loaded on first run
└── components/
    ├── canvas/
    │   ├── BackgroundCanvas.jsx  # Ambient animated background
    │   └── Graph.jsx             # D3 force-directed entity graph
    ├── modals/
    │   ├── Modal.jsx             # Base modal shell
    │   ├── CaseModal.jsx         # Create a new case
    │   ├── EntityModal.jsx       # Add an entity (person / org / other)
    │   ├── RelationModal.jsx     # Link two entities with a label and optional source
    │   ├── SourceModal.jsx       # Log a source URL
    │   ├── NoteModal.jsx         # Add a free-text note
    │   ├── TimelineModal.jsx     # Add a dated event
    │   └── EntityDetailModal.jsx # Inspect entity connections on click
    └── ui/
        ├── Btn.jsx               # Primary / secondary button
        ├── Card.jsx              # List item card
        ├── Empty.jsx             # Empty state placeholder
        └── Legend.jsx            # Graph legend item
```

## How It Works

### Data model

All data lives in React state — nothing is persisted to a server or `localStorage`. Each session loads the built-in seed case (a fictional shell-company investigation) so the graph is populated immediately.

| Entity | Fields |
|---|---|
| `Case` | `id`, `name`, `description`, `created` |
| `Entity` | `id`, `caseId`, `name`, `type` (`person` \| `organization` \| `other`), `note` |
| `Relation` | `id`, `caseId`, `from`, `to`, `label`, `sourceId?` |
| `Source` | `id`, `caseId`, `title`, `url`, `note`, `added` |
| `Note` | `id`, `caseId`, `text`, `added` |
| `Timeline` | `id`, `caseId`, `date`, `title`, `detail` |
| `History` | `id`, `caseId`, `action`, `ts` |

### Graph interaction

- **Drag** nodes to rearrange the layout
- **Click** a node to open the Entity Detail panel (shows all relationships and linked sources)
- **Scroll / pinch** to zoom
- **Pan** by dragging the canvas background

### Workflow

1. **Create a case** — give it a name and investigation summary
2. **Add entities** — people, organisations, or other subjects  
3. **Link entities** — describe the relationship and optionally cite a source  
4. **Log sources** — URL, title, and notes for every reference  
5. **Write notes** — free-form observations per case  
6. **Build the timeline** — dated events in chronological order  
7. **Review history** — every action is logged automatically

## Design

DossierFlow uses a warm parchment/terracotta palette that evokes physical investigation boards without the noir clichés. Typography is set entirely in the IBM Plex family for legibility at small sizes.

| Token | Value | Usage |
|---|---|---|
| `bg` | `#f7eee7` | App background |
| `panel` | `#fffbf7` | Sidebar / modal surfaces |
| `amber` | `#c9707e` | Person nodes, active accents |
| `teal` | `#8a5a44` | Organisation nodes |
| `thread` | `#a8624a` | Graph edge lines |
| `ink` | `#4a332a` | Primary text |

## Linting

```bash
npm run lint
```

ESLint is configured with the React Hooks and React Refresh plugins.

## Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss what you'd like to change.

## License

MIT
