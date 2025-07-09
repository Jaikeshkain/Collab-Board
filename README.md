# 🧠 Collaborative Task Board (MERN + TypeScript)

A full-stack real-time Kanban-style task board built using the **MERN stack** with **TypeScript** on both the frontend and backend. This project allows multiple users to manage tasks collaboratively with:

- 🔁 Real-time updates via **Socket.IO**
- 🧱 Drag and drop between columns
- 🎯 Smart assignment of tasks
- ⚔️ Conflict handling for simultaneous edits
- 📜 Live activity log panel

---

## 🚀 Features

### ✅ Core Task Management
- Create, update, delete tasks
- Each task includes:
  - `title`, `description`, `priority`, `status`, `assignedUser`
  - Status values: `Todo`, `In Progress`, `Done`

### 🔄 Real-Time Collaboration
- Uses **Socket.IO** to sync task updates and logs live across all users

### 🧱 Drag and Drop Tasks
- Move tasks between columns (`In Progress` ↔ `Done`)
- Backend automatically updates status

### 🎯 Smart Assign
- Assign task to user with the **fewest active (non-Done) tasks**
- Automatically updates assignment and logs the action

### ⚔️ Conflict Handling
- Detect if another user has updated a task before you
- Show both versions (yours and server's)
- Let user choose to:
  - ✅ Overwrite with their version
  - 🔄 Merge manually
  - ❌ Cancel

### 📜 Activity Log
- Tracks every task action (`create`, `update`, `delete`, `move`, `assign`)
- Displays last 20 logs in a live-updating panel

---

## 🧰 Tech Stack

### 🧩 Frontend
- React + Vite + TypeScript
- React Router DOM
- React Query
- Axios
- React Beautiful DnD
- Socket.IO Client

### 🔧 Backend
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Socket.IO Server
- JWT Authentication
- RESTful APIs

---

## 📁 Project Structure

Collab-Board/
  backend/
    app.ts
    configs/
      db.ts
    controllers/
      AuthController.ts
      LogController.ts
      TaskController.ts
    middleware/
      auth.ts
    models/
      LogModel.ts
      TaskModel.ts
      UserModel.ts
    package-lock.json
    package.json
    routes/
      AuthRoute.ts
      LogRoute.ts
      TaskRoute.ts
    tsconfig.json
    types/
      express/
        index.d.ts
  frontend/
    eslint.config.js
    index.html
    package-lock.json
    package.json
    public/
      vite.svg
    README.md
    src/
      App.css
      App.tsx
      assets/
        react.svg
      components/
        auth/
          LoginPage.tsx
          RegisterPage.tsx
        Pages/
          BoardPage.tsx
          CreateTask.tsx
          EditTask.tsx
        tasks/
          TaskCard.tsx
      index.css
      lib/
        socket.ts
      main.tsx
      redux/
        slices/
          AuthSlice.ts
        store/
          store.ts
      services/
        AuthService.ts
        TaskService.ts
      styles/
        BoardPage.css
        CreateTask.css
        LoginPage.css
      utils/
        logAction.ts
      vite-env.d.ts
    tsconfig.app.json
    tsconfig.json
    tsconfig.node.json
    vite.config.ts
  LICENSE
  README.md

  
---

## 📦 Installation & Setup

### 🧪 Backend (Express + TS)

```bash
cd backend
npm install
npm run dev


Create .env in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## 📦 Installation & Setup

### 🧪 Frontend (React + Vite + TS)

cd frontend
npm install
npm run dev

## Socket.IO Events

Event	Direction	Description
taskCreated	Server → Client	Broadcasts new task to all users
taskUpdated	Server → Client	Broadcasts task updates
taskDeleted	Server → Client	Notifies all clients to remove task
newLog	Server → Client	Updates activity log in real-time

