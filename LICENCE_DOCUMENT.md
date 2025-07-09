# 🧠 LOGIC_DOCUMENT.md

This document outlines the **internal logic** and **feature behavior** of the Collaborative Task Board built with **MERN + TypeScript** and **Socket.IO**.

---

## 📌 Core Modules Overview

### 🔹 Users
- Authenticated via JWT
- Stored in MongoDB
- Used in task assignment and logs

### 🔹 Tasks
Each task includes:
- `_id`, `title`, `description`, `priority`, `status`
- `assignedUser` (linked to a User)
- `createdBy` (creator of the task)
- `updatedAt` used for **conflict handling**

### 🔹 Logs
Each action performed on a task is recorded as a log:
- `actionType` ("create", "update", "delete", "move", "reassign")
- `taskId`, `userId`, `details`
- Displayed live in activity panel via Socket.IO

---

## 🔁 Real-Time Task Updates (Socket.IO)

### Socket Events

| Event         | Emitted From | Description                                               |
|---------------|--------------|-----------------------------------------------------------|
| `taskCreated` | Backend      | Broadcast when a new task is created                     |
| `taskUpdated` | Backend      | Broadcast when a task is edited, moved, or reassigned    |
| `taskDeleted` | Backend      | Broadcast when a task is deleted                         |
| `newLog`      | Backend      | Broadcast when a new log entry is saved                  |

### Example Workflow
1. User A edits a task
2. Backend updates DB and emits `taskUpdated`
3. All connected users' UIs update in real-time

---

## 🧱 Drag & Drop Logic

### Allowed Movement
- Tasks can be dragged between **"In Progress"** and **"Done"**
- Backend updates the `status` of the task
- A `"move"` log is created and broadcast

### Drag Event Flow
1. `onDragEnd` in frontend detects movement
2. Task status is updated via `PUT /api/tasks/:id`
3. Backend emits `taskUpdated` + `newLog`

---

## 🎯 Smart Assign Logic

> Assign a task to the user with the **fewest active (non-Done) tasks**

### Backend Steps
1. Fetch all users
2. Count active tasks (`status ≠ Done`) per user
3. Select user with **least task count**
4. Update task’s `assignedUser`
5. Emit `taskUpdated` + log assignment via `newLog`

### Trigger
- Button in each `TaskCard` calls:  
  `POST /api/tasks/:id/smart-assign`

---

## ⚔️ Conflict Handling Logic

> Prevent users from overwriting each other’s updates

### How It Works
- Each task has an `updatedAt` timestamp
- Frontend sends this with every update

### Backend Logic
1. On `PUT /api/tasks/:id`
2. Compare `updatedAt` from request with DB
3. If mismatch and `force !== true`:
   - Respond with `409 Conflict`
   - Return the current DB version as `serverTask`
4. If `force: true`, allow overwrite

### Frontend Resolution
- Modal shown with:
  - Your version (client)
  - Latest version (server)
  - ✅ Overwrite
  - 🔄 Merge manually
  - ❌ Cancel

---

## 📜 Activity Logging System

### What Triggers a Log
- Task created, updated, deleted
- Drag-drop changes status
- Smart Assign
- Manual assignment
- Conflict resolution (if performed)

### Log Entry Example
```json
{
  "actionType": "move",
  "taskId": "64892e...",
  "userId": "6477af...",
  "details": "Moved 'Fix Bug' to Done"
}
```

### Display
- Frontend fetches last 20 logs via `GET /api/logs`
- Also listens to `newLog` via Socket.IO

---

## 🔄 Data Flow Summary

```
User Action →
Frontend API Call →
Backend Controller →
Database Update →
Socket.IO Broadcast →
Frontend UI + Log Update
```

---

## 🧪 Testing Strategy

| Action           | Expected Behavior                    |
|------------------|--------------------------------------|
| Create task      | UI updates in all tabs               |
| Drag task to Done| Status changes, task updates live    |
| Smart assign     | Task gets assigned, log appears      |
| Conflict edit    | Conflict modal shown                 |
| Overwrite task   | Server accepts update                |
| View activity panel | Shows latest 20 logs live        |

---

## 🔐 Security & Validation

- All routes are JWT-protected
- Task title validations:
  - Must be unique
  - Cannot be "Todo", "In Progress", or "Done"
- Drag is only allowed between "In Progress" and "Done"
- Logs are only created server-side after real actions

---

## ✅ Conclusion

This logic document covers how real-time collaboration, conflict safety, smart assignment, and activity logging work together in a robust and scalable TypeScript-powered Kanban system.

