# Scrap Inventory Frontend

A materials inventory management system built with Angular for tracking steel plate and structural steel inventory. Designed for shop floor use with plasma table and saw operations.

## Features

### Plasma Table / Plate Materials
- Add scrap pieces with dimensions (length, width, thickness)
- Supported grades: A36, A572-50, 304SS, 316SS, 5052-H32, 6061-T6
- Hierarchical location tracking (Area > Section > Bin)
- Reserve pieces for job numbers, unreserve, or mark as used
- Catalog-based material selection

### Saw Materials
- 9 material types: angle, tube, square-stock, round-stock, DOM, pipe, i-beam, channel, flat-bar
- Dynamic dimension display based on material type
- Same location and reservation workflow as plate materials

### Dashboards & Search
- Statistics by grade, thickness, and material type
- Recent activity tracking (last 7 days)
- Advanced search with filters for dimensions, grade, location, and reservation ID

### Authentication
- JWT-based authentication with role support (operator, engineer, manager)
- Protected routes with auth guard
- Auto server wake-up for Render free tier backend

## Tech Stack

- **Framework:** Angular 19
- **Language:** TypeScript 5.7
- **Styling:** Custom CSS
- **Backend:** REST API hosted on Render

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs on `http://localhost:4200`. The app connects to the backend API at `http://localhost:3000/api` in development.

### Production Build

```bash
npm run build
```

Output goes to `dist/scrap-inventory-frontend/`. The production build points to the Render-hosted backend.

### Tests

```bash
npm test
```

## Project Structure

```
src/app/
├── components/
│   ├── add-saw-material/      # Add new saw materials
│   ├── add-scrap/             # Add new plate materials
│   ├── dashboard/             # Plasma table stats
│   ├── home/                  # Landing page
│   ├── login/                 # Authentication
│   ├── saw-dashboard/         # Saw materials stats
│   ├── saw-material-list/     # View saw materials
│   ├── scrap-list/            # View plate materials
│   ├── search-saw-material/   # Search saw materials
│   └── search-scrap/          # Search plate materials
├── services/                  # API integration
├── models/                    # TypeScript interfaces
├── guards/                    # Route protection
└── interceptors/              # JWT token injection
```
