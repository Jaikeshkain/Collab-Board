import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

import { getAllTasks } from "../../services/TaskService";
import { useQuery } from "@tanstack/react-query";
import { TaskCard } from "../tasks/TaskCard";
import { Link} from "react-router-dom";
import socket from "../../lib/socket";
import axios from "axios";
import { ApiURL } from "../../services/AuthService";
import '../../styles/BoardPage.css'
import { logAction } from "../../utils/logAction";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";

export interface Task {
  _id: string;
  createdBy: {
    _id: string;
    username: string;
  };
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Done";
  assignedUser?: {
    _id: string;
    username: string;
  };
  createdAt?: string;
  updatedAt?: string;
}


export interface Log {
  _id: string;
  actionType: "create" | "update" | "delete" | "move" | "reassign";
  taskId: string;
  userId: {
    _id: string;
    username: string;
  };
  details: string;
  createdAt?: string;
}


const BoardPage: React.FC = () => {
  const userData=useSelector((state:RootState)=>state.auth.user)
  const token=userData?.token
  const user=userData?.user
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs,setLogs]=useState<Log[]>([])
  const {data,error,isLoading}=useQuery({
    queryKey:["get tasks"],
    queryFn:()=>getAllTasks()
  })

  

  useEffect(() => {
    if(data?.tasks){
        setTasks(data?.tasks) 
    }
  }, [data]);

  const filteredTasks = {
    Todo: tasks.filter((task) => task.status === "Todo"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Done: tasks.filter((task) => task.status === "Done"),
  };

  useEffect(() => {
  socket.on("taskCreated", (newTask: Task) => {
    setTasks((prev) => {
      const exists = prev.find(t => t._id === newTask._id);
      return exists ? prev : [...prev, newTask];
    });
  });

  socket.on("taskUpdated", (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  });

  socket.on("taskDeleted", (deletedTaskId: string) => {
    setTasks((prev) =>
      prev.filter((task) => task._id !== deletedTaskId)
    );
  });

  return () => {
    socket.off("taskCreated");
    socket.off("taskUpdated");
    socket.off("taskDeleted");
  };
  }, []);


  //new log
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${ApiURL}/api/logs`);
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    socket.on("newLog", (log: Log) => {
      setLogs((prev) => [log, ...prev.slice(0, 19)]);
    });

    // ✅ Return cleanup function
    return () => {
      socket.off("newLog");
    };
  }, []);



  if(error){
    return (
      <div className="errorContainer">
        <div className="errorMessage">{error.message}</div>
      </div>
    );
  }

  if(tasks.length<1){
    return (
      <div className="emptyContainer">
        <div className="emptyContent">
          <div className={"emptyIcon"}>📋</div>
          <h3 className={"emptyTitle"}>No tasks found</h3>
          <p className={"emptyDescription"}>Create your first task to get started</p>
          <Link to={"/create-task"} className={"createButton"}>
            + Create Task
          </Link>
        </div>
      </div>
    );
  }

  if(!token){
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          padding: '60px 40px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          {/* Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '32px'
          }}>
            🔐
          </div>
  
          {/* Title */}
          <h1 style={{
            color: '#2d3748',
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            lineHeight: '1.2'
          }}>
            Access Required
          </h1>
  
          {/* Subtitle */}
          <p style={{
            color: '#718096',
            fontSize: '18px',
            margin: '0 0 32px 0',
            lineHeight: '1.5'
          }}>
            You need to be logged in to access this page. Please sign in to continue.
          </p>
  
          {/* Login Link/Button */}
          <a 
            href="/login"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Go to Login
          </a>
  
          {/* Additional Info */}
          <div style={{
            marginTop: '32px',
            padding: '20px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{
              color: '#4a5568',
              fontSize: '14px',
              margin: '0 0 8px 0'
            }}>
              Don't have an account?
            </p>
            <a 
              href="/register"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Create one here
            </a>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="container">
      <header className={"header"}>
        <h1 className={"title"}>My Board</h1>
        
        {!token? <><Link to={"/login"} className={"addButton"}>
          Login
        </Link></>:<>
          <div>
            <Link to={"/create-task"} className={"addButton"}>
              + Add Task
            </Link>
          </div>
        </>
      }
      </header>

      <p>Drag & Drop tasks between columns to perform actions</p>

      {isLoading ? (
        <div className={"loadingContainer"}>
          <div className={"spinner"}></div>
          <p className={"loadingText"}>Loading tasks...</p>
        </div>
      ) : (
        <div className={"boardContainer"}>
          <DragDropContext
            onDragEnd={async (result: DropResult) => {
              const { destination, source, draggableId } = result;

              if (!destination) return;
              if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
              )
                return;

              // Get the dragged task
              const draggedTask = tasks.find((t) => t._id === draggableId);
              if (!draggedTask) return;

              const newStatus = destination.droppableId as Task["status"];
              if (draggedTask.status === newStatus) return;

              try {
                // Update task status in backend
                const res = await axios.put(`${ApiURL}/api/tasks/${draggedTask._id}/drag-task`, {
                  status: newStatus,
                  assignedUser:user?._id
                });

                socket.emit("taskUpdated", res.data);

                // Optional: emit a new log
                await logAction({
                  actionType: "move",
                  taskId: draggedTask._id,
                  userId: user?._id, // replace with actual user if needed
                  details: `${user?.username}: Task "${draggedTask.title}" moved to ${newStatus}`,
                })
              } catch (err) {
                console.error("Failed to update task status", err);
              }
            }}
          >
            <div className={"columnsContainer"}>
              {Object.entries(filteredTasks).map(([status, taskList]) => (
                <Droppable droppableId={status} key={status}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"column"}
                    >
                      <div className={"columnHeader"}>
                        <h3 className={"columnTitle"}>{status}</h3>
                        <span className={"taskCount"}>{taskList.length}</span>
                      </div>
                      <div className={"taskList"}>
                        {taskList.map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="taskCardWrapper"
                              >
                                <TaskCard task={task} />
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                        {taskList.length === 0 && (
                          <div className={"emptyColumn"}>
                            <p className={"emptyColumnText"}>No tasks here</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>


          <div className={"activitySection"}>
            <div className={"activityHeader"}>
              <h3 className={"activityTitle"}>Activity Log</h3>
              <span className={"activityBadge"}>Recent</span>
            </div>
            <div className={"logContainer"}>
              {logs.length === 0 ? (
                <div className={"noActivity"}>
                  <p className={"noActivityText"}>No activity yet</p>
                </div>
              ) : (
                <ul className={"logList"}>
                  {logs.map((log, index) => (
                    <li key={index} className={"logItem"}>
                      <span className={"logIcon"}>🕒</span>
                      <span className={"logDetails"}>{log.details}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardPage;
