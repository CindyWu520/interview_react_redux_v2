# Items Explorer

A React + Redux application that displays a list of items and their details, built as part of a technical assignment.

## Tech Stack

- **ReactJS** with TypeScript
- **Redux Toolkit** for state management
- **Material UI** for components and styling
- **Axios** for HTTP requests

## Project Structure
```
interview_react_redux_v2/
├── items-app/          # React frontend
│   ├── src/
│   │   ├── api/        # API layer
│   │   ├── components/ # React components
│   │   ├── store/      # Redux slices and store
│   │   └── types/      # TypeScript interfaces
└── test-0.0.1-SNAPSHOT.jar  # Backend server
```

## Prerequisites

- Node.js (v16 or higher)
- Java 17

## Getting Started

### 1. Start the Backend
```bash
java -jar test-0.0.1-SNAPSHOT.jar
```

Backend runs on `http://localhost:8080`

Available endpoints:
- `GET /items` — returns list of items
- `GET /image/{guid}` — returns image for item

### 2. Start the Frontend
```bash
cd items-app
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## Features

- View list of items in a table
- Click a row to view item details
- Properties tab shows item properties with numbers and dates right-aligned
- Image tab shows the item image
- Active tab is preserved when switching between items