# 🧠 Collaborative Task Board (MERN + TypeScript)

A full-stack, real-time Kanban-style task management app built using the **MERN stack** with **TypeScript** on both the frontend and backend. This project enables multiple users to collaborate on tasks seamlessly, featuring:

- 🔁 Real-time updates via **Socket.IO**
- 🧱 Drag-and-drop task movement between columns
- 🎯 Smart assignment to the least-busy user
- ⚔️ Conflict detection and resolution during concurrent edits
- 📜 Live activity logging panel

---

## 🚀 Features

### ✅ Task Management
- Create, update, delete tasks
- Task properties: `title`, `description`, `priority`, `status`, `assignedUser`
- Status options: `Todo`, `In Progress`, `Done`

### 🔄 Real-Time Collaboration
- **Socket.IO** ensures instant sync of task updates and activity logs across all users

### 🧱 Drag & Drop Tasks
- Move tasks between `In Progress` and `Done` columns
- Status updates saved in backend and reflected in real time

### 🎯 Smart Assign
- Assign a task to the user with the **fewest active tasks** (excluding `Done`)
- Automatically logs the action and updates all clients

### ⚔️ Conflict Handling
- Detects if another user has edited a task before your update
- Returns both versions (client + server)
- Options provided:
  - ✅ Overwrite with your version
  - 🔄 Merge manually
  - ❌ Cancel update

### 📜 Activity Log Panel
- Shows the latest 20 task actions (create, update, move, assign, delete)
- Live updates via `newLog` socket event

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
- MongoDB with Mongoose
- Socket.IO Server
- JWT Authentication
- RESTful APIs

---

## 📁 Project Structure

\`\`\`
Collab-Board/
│
├── backend/
│   ├── app.ts
│   ├── configs/
│   │   └── db.ts
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   ├── LogController.ts
│   │   └── TaskController.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── models/
│   │   ├── LogModel.ts
│   │   ├── TaskModel.ts
│   │   └── UserModel.ts
│   ├── routes/
│   │   ├── AuthRoute.ts
│   │   ├── LogRoute.ts
│   │   └── TaskRoute.ts
│   ├── types/
│   │   └── express/index.d.ts
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── lib/socket.ts
│   │   ├── redux/
│   │   │   └── store/store.ts
│   │   ├── components/
│   │   │   ├── auth/LoginPage.tsx
│   │   │   ├── auth/RegisterPage.tsx
│   │   │   └── tasks/TaskCard.tsx
│   │   ├── pages/
│   │   │   ├── BoardPage.tsx
│   │   │   ├── CreateTask.tsx
│   │   │   └── EditTask.tsx
│   │   ├── services/
│   │   │   ├── AuthService.ts
│   │   │   └── TaskService.ts
│   │   ├── styles/
│   │   │   ├── BoardPage.css
│   │   │   ├── CreateTask.css
│   │   │   └── LoginPage.css
│   │   └── utils/logAction.ts
│   └── vite.config.ts
│
├── README.md
└── LICENSE
\`\`\`

---

## 📦 Installation & Setup

### 🔧 Backend Setup

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

Create a \`.env\` file inside \`backend/\`:

\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
\`\`\`

---

### 💻 Frontend Setup

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Make sure your \`ApiURL\` is configured in \`AuthService.ts\` / \`TaskService.ts\` to point to the backend:

\`\`\`ts
export const ApiURL = "http://localhost:5000";
\`\`\`

---

## 📡 Socket.IO Events

| Event         | Direction        | Description                               |
|---------------|------------------|-------------------------------------------|
| \`taskCreated\` | Server → Client  | New task broadcast                        |
| \`taskUpdated\` | Server → Client  | Task edit, drag, assign update            |
| \`taskDeleted\` | Server → Client  | Remove task from all boards               |
| \`newLog\`      | Server → Client  | Broadcasts a new log to activity panel    |

---

## 🧠 Key Logic Highlights

- **Smart Assign:** Backend checks each user’s active tasks, assigns to the least busy.
- **Conflict Handling:** Compares \`updatedAt\` timestamps; if different, sends back server version for client to resolve.
- **Drag-and-Drop:** Updates task status in backend and logs move.
- **Activity Logging:** All major actions are saved and shown in the log panel in real-time.

---

## 👨‍💻 Author

Built as part of an internship assignment using full-stack TypeScript with real-time collaboration architecture.

---

## 📄 License

This project is open for learning and demonstration purposes. Feel free to use and customize.
