import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { Link } from "react-router-dom";
import { ApiURL } from "../../services/AuthService";
import axios from "axios";

interface Task {
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

interface Props {
  task: Task;
}

export const TaskCard: React.FC<Props> = ({ task }) => {
  // Get priority color and icon
  const {user}=useSelector((state:RootState)=>state.auth.user)
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High':
        return { 
          background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
          icon: '🔴'
        };
      case 'Medium':
        return { 
          background: 'linear-gradient(45deg, #feca57, #ff9f43)',
          icon: '🟡'
        };
      case 'Low':
        return { 
          background: 'linear-gradient(45deg, #48cae4, #61dafb)',
          icon: '🟢'
        };
      default:
        return { 
          background: 'linear-gradient(45deg, #a8a8a8, #c0c0c0)',
          icon: '⚪'
        };
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Todo':
        return '#e74c3c';
      case 'In Progress':
        return '#f39c12';
      case 'Done':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  // Highlight task metadata in specific columns
  const renderTaskMeta = () => {
    if (task.status === "Todo") {
      return (
        <div style={styles.taskMeta}>
          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>👤</span>
            <div style={styles.metaContent}>
              <span style={styles.metaLabel}>Created By</span>
              <span style={styles.metaValue}>{task.createdBy.username}</span>
            </div>
          </div>
          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>📅</span>
            <div style={styles.metaContent}>
              <span style={styles.metaLabel}>Created At</span>
              <span style={styles.metaValue}>
                {new Date(task.createdAt!).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div style={styles.metaItem}>
            <button
          onClick={async () => {
            try {
              const res = await axios.post(`${ApiURL}/api/tasks/${task._id}/smart-assign`);
              // You don't need to manually update UI because `taskUpdated` socket will do it
              console.log(res)
            } catch (err) {
              console.error("Smart assign failed", err);
            }
          }}
          className="smartAssignBtn"
        >
          🎯 Smart Assign
        </button>
          </div>
        </div>
      );
    }
    if (task.status === "In Progress") {
      return (
        <div style={styles.taskMeta}>
          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>👨‍💻</span>
            <div style={styles.metaContent}>
              <span style={styles.metaLabel}>Assigned To</span>
              <span style={styles.metaValue}>
                {task.assignedUser?.username || 'Unassigned'}
              </span>
            </div>
          </div>
        </div>
      );
    }
    if (task.status === "Done") {
      return (
        <div style={styles.taskMeta}>
          <div style={styles.metaItem}>
            <span style={styles.metaIcon}>✅</span>
            <div style={styles.metaContent}>
              <span style={styles.metaLabel}>Completed</span>
              <span style={styles.metaValue}>
                {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : 'Recently'}
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  const priorityStyle = getPriorityStyle(task.priority);
  const statusColor = getStatusColor(task.status);

  return (
    <div style={styles.taskCard}>
      {/* Status indicator */}
      <div style={{
        ...styles.statusIndicator,
        background: statusColor
      }}></div>
      
      {/* Card header */}
      <div style={styles.cardHeader}>
        <h4 style={styles.taskTitle}>{task.title}</h4>
        <div style={{
          ...styles.priorityBadge,
          background: priorityStyle.background
        }}>
          <span style={styles.priorityIcon}>{priorityStyle.icon}</span>
          <span style={styles.priorityText}>{task.priority}</span>
        </div>
      </div>

      {/* Task description */}
      <p style={styles.taskDescription}>{task.description}</p>

      {/* Task metadata */}
      {renderTaskMeta()}

      {/* Card footer */}
      <div style={styles.cardFooter}>
        <div style={styles.taskId}>
          <span style={styles.idLabel}>ID:</span>
          <span style={styles.idValue}>{task._id.slice(-6)}</span>
        </div>
        {(task.createdBy._id===user._id)?<><Link to={"/delete"} style={{textDecoration:"none", color:"red", border:"1px",padding:"5px 10px",cursor:"revert-layer",borderRadius:"5px",background:`${statusColor}15`}}>Delete</Link></>:<></>}
        {(task.assignedUser?._id===user._id)?<><Link to={`/${task._id}/edit-task`} style={{textDecoration:"none", color:"blue", border:"1px",padding:"5px 10px",cursor:"revert-layer",borderRadius:"5px",background:`${statusColor}15`}}>Edit</Link></>:<></>}
        <div style={{
          ...styles.statusBadge,
          background: `${statusColor}15`,
          color: statusColor,
          border: `1px solid ${statusColor}30`
        }}>
          {task.status}
        </div>
      </div>

    </div>
  );
};

const styles = {
  taskCard: {
    position: 'relative',
    background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  } as React.CSSProperties,

  statusIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    borderRadius: '0 2px 2px 0'
  } as React.CSSProperties,

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '12px'
  },

  taskTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    flex: 1,
    lineHeight: '1.4',
    wordBreak: 'break-word'
  } as React.CSSProperties,

  priorityBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    minWidth: 'fit-content'
  },

  priorityIcon: {
    fontSize: '10px'
  },

  priorityText: {
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  } as React.CSSProperties,

  taskDescription: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.6',
    margin: '0 0 16px 0',
    wordBreak: 'break-word'
  } as React.CSSProperties,

  taskMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
    padding: '12px',
    background: 'rgba(248, 250, 252, 0.8)',
    borderRadius: '12px',
    border: '1px solid rgba(226, 232, 240, 0.5)'
  } as React.CSSProperties,

  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },

  metaIcon: {
    fontSize: '16px',
    minWidth: '20px',
    textAlign: 'center'
  } as React.CSSProperties,

  metaContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  } as React.CSSProperties,

  metaLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  } as React.CSSProperties,

  metaValue: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#475569'
  },

  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid rgba(226, 232, 240, 0.5)'
  },

  taskId: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },

  idLabel: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  } as React.CSSProperties,

  idValue: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#64748b',
    fontFamily: 'monospace',
    background: 'rgba(226, 232, 240, 0.3)',
    padding: '2px 6px',
    borderRadius: '4px'
  },

  statusBadge: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  } as React.CSSProperties
};

// Add hover effects using CSS-in-JS
const hoverStyles = `
  .task-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  
  .task-card:active {
    transform: translateY(0);
  }
`;

// Mock data for demonstration
const mockTask: Task = {
  _id: "507f1f77bcf86cd799439011",
  createdBy: {
    _id: "user123",
    username: "john_doe"
  },
  title: "Implement User Authentication",
  description: "Create a secure login system with JWT tokens and password hashing. Include password reset functionality and email verification.",
  priority: "High",
  status: "In Progress",
  assignedUser: {
    _id: "user456",
    username: "jane_smith"
  },
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-16T14:45:00Z"
};

// Demo component to showcase the TaskCard
const Demo: React.FC = () => {
  const [currentStatus, setCurrentStatus] = React.useState<"Todo" | "In Progress" | "Done">("Todo");
  
  const demoTask = {
    ...mockTask,
    status: currentStatus
  };

  return (
    <div style={{
      padding: '40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h1 style={{
        color: '#ffffff',
        fontSize: '32px',
        fontWeight: '700',
        marginBottom: '20px',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}>
        TaskCard Design
      </h1>
      
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px'
      }}>
        {(['Todo', 'In Progress', 'Done'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setCurrentStatus(status)}
            style={{
              background: currentStatus === status ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
              color: currentStatus === status ? '#667eea' : '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {status}
          </button>
        ))}
      </div>
      
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <TaskCard task={demoTask} />
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: hoverStyles }} />
    </div>
  );
};

export default Demo;