# FusionBoard Frontend

**Modern command center UI built with Next.js 16, React 19, and Material UI 7 — featuring real-time updates, glass morphism design, and a modular microfrontend architecture.**

---

## Table of Contents

- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Pages](#pages)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Real-time Features](#real-time-features)
- [Theming & Design System](#theming--design-system)
- [Internationalization](#internationalization)
- [Authentication Flow](#authentication-flow)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)

---

## Architecture

The frontend follows a **microfrontend-style modular architecture** where each feature domain is self-contained with its own components, types, and API layer.

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth route group
│   │   └── login/              # Login page
│   ├── (dashboard)/            # Protected routes (middleware-guarded)
│   │   ├── overview/           # Command center
│   │   ├── football/           # Football analytics
│   │   ├── jobs/               # Job tracker (Kanban)
│   │   ├── tasks/              # Task management
│   │   ├── platforms/          # Service health dashboard
│   │   ├── settings/           # User preferences
│   │   └── layout.tsx          # Dashboard shell layout
│   ├── providers.tsx           # Redux + MUI providers
│   └── layout.tsx              # Root layout (Manrope font, global providers)
│
├── microfrontends/             # Feature modules
│   ├── shell/                  # App shell (sidebar, topbar, layout)
│   ├── football/               # Football tracking components
│   ├── jobs/                   # Kanban board + job dialogs
│   ├── tasks/                  # Task list + creation dialog
│   └── platforms/              # Service registry grid
│
├── components/
│   ├── common/                 # Reusable UI (ModalShell, etc.)
│   └── dashboard/              # Dashboard-specific components
│       ├── WebSocketProvider   # Real-time connection provider
│       ├── CommandPalette      # Cmd+K quick navigation
│       ├── GlassCard           # Reusable glass morphism card
│       ├── SystemPulse         # Service health orbit visualization
│       ├── DailyBrief          # Aggregated daily summary
│       ├── NotificationToast   # Toast notification queue
│       ├── LiveEventFeed       # Real-time event stream
│       ├── PresenceIndicator   # Online users display
│       └── QuickActions        # Quick action buttons
│
├── store/                      # Redux Toolkit
│   └── slices/                 # uiSlice, languageSlice, notificationsSlice, presenceSlice
│
├── lib/                        # API clients & utilities
│   ├── auth.ts                 # Server actions (login/logout)
│   ├── apiServer.ts            # Authenticated server-side fetch
│   ├── api.ts                  # Public API fetch
│   ├── websocket.ts            # WebSocket client (singleton)
│   ├── jobs.ts                 # Job API functions
│   └── tasks.ts                # Task API functions
│
├── hooks/                      # Custom React hooks
│   └── useWebSocket.ts         # WebSocket + Redux integration
│
├── types/                      # TypeScript interfaces
│   ├── football.ts
│   ├── jobs.ts
│   ├── tasks.ts
│   └── brief.ts
│
├── theme/                      # MUI theming
│   ├── theme.ts                # Dark mode theme configuration
│   └── cssVariables.ts         # Design tokens (colors, spacing, radii)
│
├── i18n/                       # Internationalization
│   ├── translations.json       # EN/RO translation strings
│   └── useTranslation.ts       # Custom i18n hook (Redux-backed)
│
└── middleware.ts                # Route protection (JWT cookie check)
```

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Glass morphism login form with email/password |
| `/overview` | Command Center | Daily brief, quick actions, system pulse, live event feed |
| `/football` | Football Tracking | Match results, player stats, team rankings, tournament data |
| `/jobs` | Job Tracker | 6-column Kanban board with drag-and-drop status updates |
| `/tasks` | Smart Tasks | Priority-based task list with category filtering and recurring support |
| `/platforms` | Platform Services | Service registry with live health status and latency monitoring |
| `/settings` | Settings | Language switching (English / Romanian) |

All dashboard routes are protected by Next.js middleware — unauthenticated users are redirected to `/login`.

---

## Component Architecture

### Microfrontend Modules

Each module is self-contained and can be developed independently:

**Shell** — Application layout
- `DashboardLayout` — Main wrapper with sidebar + topbar + content area
- `Sidebar` — Navigation, user profile, logout, external links
- `TopBar` — Breadcrumbs, notification badge, search, presence indicator

**Football** — Match tracking & analytics
- `StatsOverview` — Aggregated entity counts (players, teams, matches, goals)
- `RecentMatches` — Latest match results with scores
- `AllMatches` / `BaseCampMatches` — Full match listings with state indicators
- `TopPlayers` — Player leaderboard

**Jobs** — Kanban-style job tracking
- `KanbanBoard` — 6-column board with drag-and-drop
- `KanbanColumn` — Individual status column with job count
- `JobCard` — Job card with company, role, salary, status
- `JobDetailDialog` — Full job detail view/edit modal
- `AddJobDialog` — Job creation form

**Tasks** — Task management
- `TaskList` — Filterable task list with priority indicators
- `AddTaskDialog` — Task creation with priority, category, due date, recurring options

**Platforms** — Service health monitoring
- `PlatformGrid` — Grid of registered services with health indicators and latency

### Dashboard Components

| Component | Description |
|-----------|-------------|
| `CommandPalette` | Cmd+K / Ctrl+K keyboard-driven navigation with grouped results and arrow key support |
| `GlassCard` | Reusable card with configurable glow color, backdrop blur, and hover effects |
| `SystemPulse` | Orbital visualization of service health — animated rings with color-coded status |
| `DailyBrief` | Three-column grid: today's tasks, upcoming follow-ups, streaks and statistics |
| `NotificationToast` | Queue-based toast system for real-time WebSocket notifications |
| `LiveEventFeed` | Scrolling feed of recent platform events |
| `PresenceIndicator` | Shows currently online users and their active pages |
| `QuickActions` | Shortcut buttons for common actions |
| `PageTracker` | Broadcasts current page to WebSocket for presence tracking |

---

## State Management

Four Redux Toolkit slices manage global state:

```
┌─────────────────────────────────────────────────┐
│                   Redux Store                    │
├──────────────┬──────────────┬───────────────────┤
│   uiSlice    │ languageSlice│ notificationsSlice│
│              │              │                   │
│ sidebar      │ language     │ notifications[]   │
│ Collapsed    │ "en" | "ro"  │ activities[]      │
│              │              │ unreadCount       │
│              │              │ toastQueue[]      │
├──────────────┴──────────────┴───────────────────┤
│               presenceSlice                      │
│                                                  │
│ onlineUsers[]  count                             │
└──────────────────────────────────────────────────┘
```

| Slice | State | Purpose |
|-------|-------|---------|
| `uiSlice` | `sidebarCollapsed` | Sidebar toggle state |
| `languageSlice` | `language` | Active language (EN/RO) |
| `notificationsSlice` | `notifications`, `activities`, `unreadCount`, `toastQueue` | Real-time notification management (max 50 notifications, 30 activities) |
| `presenceSlice` | `onlineUsers`, `count` | Currently connected users |

---

## Real-time Features

### WebSocket Integration

```
┌──────────┐     WebSocket      ┌──────────┐
│ Frontend │◄──────────────────▶│ Backend  │
│          │  ?token=<jwt>      │          │
└────┬─────┘                    └──────────┘
     │
     │  useWebSocket() hook
     │
     ├── notification → dispatch(addNotification)
     │                → dispatch(shiftToast) → NotificationToast
     │
     ├── presence    → dispatch(setPresence)
     │                → PresenceIndicator
     │
     ├── activity    → dispatch(addActivity)
     │                → LiveEventFeed
     │
     └── page_change → PageTracker broadcasts current route
```

**WebSocket Client Features:**
- Singleton instance with auto-reconnect
- Exponential backoff (up to 10 attempts)
- Automatic `http(s)` → `ws(s)` URL conversion
- Graceful cleanup on unmount

### Notification System
- Real-time push via WebSocket
- Toast queue with auto-dismiss
- Badge counter on TopBar
- Full notification history in panel
- Category-based icons and colors

---

## Theming & Design System

### Dark Mode Glass Morphism

The entire UI is built on a dark theme with glass morphism effects:

```
Design Tokens (cssVariables.ts)
├── Colors
│   ├── Primary:  #6366F1 (Indigo)
│   ├── Success:  #10B981 (Green)
│   ├── Warning:  #F59E0B (Amber)
│   ├── Danger:   #EF4444 (Red)
│   └── Info:     #3B82F6 (Blue)
│
├── Surfaces
│   ├── bgBase:    #0F1117
│   ├── bgCard:    rgba(255, 255, 255, 0.03)
│   ├── bgSidebar: #12141C
│   └── bgInput:   rgba(255, 255, 255, 0.05)
│
├── Glass Effects
│   ├── glassBg:          rgba(255, 255, 255, 0.04)
│   ├── glassBorder:      rgba(255, 255, 255, 0.08)
│   └── glassHoverBorder: rgba(255, 255, 255, 0.15)
│
├── Text
│   ├── Primary:   #F9FAFB
│   ├── Secondary: #9CA3AF
│   └── Muted:     #6B7280
│
└── Radii
    ├── xl: 20px
    ├── lg: 16px
    ├── md: 12px
    └── sm: 8px
```

### Custom Animations

| Animation | Effect |
|-----------|--------|
| `pulse-glow` | Pulsing opacity for status indicators |
| `orbit-spin` | Rotating rings for SystemPulse visualization |
| `float` | Subtle vertical movement for cards |
| `fade-in-up` | Entry animation for page transitions |
| `shimmer` | Loading shimmer effect |

### GlassCard Component

Reusable throughout the app — accepts a `glowColor` prop for contextual highlighting:

```tsx
<GlassCard glowColor="#10B981">
  <Typography>Service Status: Online</Typography>
</GlassCard>
```

Features: backdrop blur, semi-transparent borders, hover elevation + glow animation.

---

## Internationalization

Two-language support via a custom Redux-backed i18n system:

```
i18n/
├── translations.json    # { "en": { ... }, "ro": { ... } }
└── useTranslation.ts    # Hook: returns languageData, language, setLanguage
```

**Supported Languages:**
- English (en)
- Romanian (ro)

**Usage:**
```tsx
const { languageData, setLanguage } = useTranslation();
<Typography>{languageData.Overview}</Typography>
```

Language preference is stored in Redux and persists through the session. Switching is instant with no page reload.

---

## Authentication Flow

```
┌─────────────┐    POST /auth/login     ┌─────────┐
│  Login Page  │───────────────────────▶│ Backend │
│  (Server     │                        │         │
│   Action)    │◀───────────────────────│         │
└──────┬───────┘   Set-Cookie:          └─────────┘
       │           access_token (httpOnly, 8h)
       │           refresh_token (httpOnly, 8h)
       │           user (readable, for UI)
       │
       │  redirect → /overview
       │
┌──────▼───────┐
│  Middleware   │──── No cookie? ──→ redirect /login
│  (every req) │
└──────┬───────┘
       │
┌──────▼───────┐
│  Dashboard   │  Server-side: Authorization: Bearer <token>
│  Pages       │  WebSocket:   /ws?token=<token>
└──────────────┘
```

**Key implementation details:**
- Server Actions (`lib/auth.ts`) handle login/logout — credentials never touch the client
- Next.js middleware guards all `(dashboard)` routes
- `apiServer.ts` reads the cookie and injects the `Authorization` header for server-side fetches
- WebSocket passes token as query parameter (cookies not supported in WS handshake)

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm / yarn / pnpm

### Installation

```bash
git clone <repository-url>
cd fusionboard-fe
npm install
```

### Configuration

Create a `.env` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/overview` (or `/login` if unauthenticated).

### Build

```bash
npm run build
npm start
```

---

## Deployment

### Docker

```bash
docker-compose up --build
```

**Services:**
1. **frontend** — Next.js production server (port 3000)
2. **nginx** — Reverse proxy (port 80) routing to frontend

### Dockerfile Strategy

Multi-stage build for minimal image size:

```
Stage 1 (builder): node:20-alpine
  → npm install + npm run build

Stage 2 (runner): node:20-alpine
  → Copy build artifacts only
  → npm start (port 3000)
```

### Nginx Configuration

```
nginx:1.27-alpine
├── Proxies /_next/* → frontend:3000
├── Proxies /*       → frontend:3000
└── Listens on :80
```

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 16.0 |
| UI Library | React | 19.2 |
| Language | TypeScript | 5 |
| Components | Material UI (MUI) | 7.3 |
| Styling | Emotion | 11.14 |
| State | Redux Toolkit | 2.11 |
| Date/Time | Day.js | 1.11 |
| Date Picker | MUI X Date Pickers | 8.27 |
| Build | React Compiler | Enabled |
| Linting | ESLint | 9 |
| Server | Node.js | 20 (Alpine) |
| Proxy | Nginx | 1.27 |
| Container | Docker | Multi-stage |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint checks |
