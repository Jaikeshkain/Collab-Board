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

