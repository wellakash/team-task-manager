import { useEffect, useState } from 'react'
import axios from 'axios'
import { PlusCircle, Trash2, CheckCircle, ListTodo, LogOut, Lock, User, LayoutDashboard, Key, Calendar } from 'lucide-react'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [projectName, setProjectName] = useState('')
  const [userRole, setUserRole] = useState(null) 
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const API_URL = 'http://localhost:8080/api/tasks'
  const AUTH_URL = 'http://localhost:8080/api/auth/login'

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL)
      const sortedTasks = response.data.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTasks(sortedTasks)
    } catch (err) {
      console.error("Backend unreachable!", err)
    }
  }

  useEffect(() => { 
    if (userRole) { fetchTasks() }
  }, [userRole])

  const addTask = async (e) => {
    e.preventDefault()
    if (!title || !projectName) {
      alert("Both fields are required!")
      return
    }

    try {
      const response = await axios.post(API_URL, { 
        title: title, 
        projectName: projectName, 
        status: 'TODO' 
      })
      setTitle('')
      setProjectName('')
      fetchTasks()
    } catch (err) {
      console.error("Failed to create task:", err.response ? err.response.data : err.message)
      alert("Error: Could not save task.")
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchTasks()
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  const completeTask = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/complete`)
      fetchTasks()
    } catch (err) {
      console.error("Error completing task", err)
    }
  }

  // --- UPDATED: DATABASE AUTHENTICATION ---
  const handleLogin = async (role) => {
    setError('')
    if (role === 'admin') {
      try {
        const response = await axios.post(AUTH_URL, { 
          username: username, 
          password: password 
        })
        
        // Backend returns the User object; we use the role from the database
        const dbRole = response.data.role.toLowerCase();
        setUserRole(dbRole)
        console.log("Logged in as:", dbRole)
      } catch (err) {
        console.error("Login failed:", err)
        setError('Invalid Admin Username or Password!')
      }
    } else {
      // Guest/Member access remains a simple toggle for this demo
      setUserRole('member') 
    }
  }

  const handleLogout = () => {
    setUserRole(null)
    setUsername('')
    setPassword('')
  }

  if (!userRole) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '48px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', width: '400px', border: '1px solid #334155' }}>
          <div style={{ backgroundColor: '#3b82f615', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 24px auto' }}>
            <Lock size={40} color="#3b82f6" />
          </div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Secure Login</h1>
          <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Enter credentials for Admin access</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
               <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} />
               <input 
                style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', boxSizing: 'border-box' }}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div style={{ position: 'relative' }}>
               <Key size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} />
               <input 
                type="password"
                style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', boxSizing: 'border-box' }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               />
            </div>
          </div>

          {error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold' }}>{error}</p>}
          
          <button 
            onClick={() => handleLogin('admin')} 
            style={{ width: '100%', padding: '16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '16px' }}
          >
            <LayoutDashboard size={20} /> Login as Admin
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#475569' }}>
            <hr style={{ flex: 1, border: '0.5px solid #334155' }} /> <span style={{ padding: '0 10px', fontSize: '12px' }}>OR</span> <hr style={{ flex: 1, border: '0.5px solid #334155' }} />
          </div>

          <button 
            onClick={() => handleLogin('member')} 
            style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #334155', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Guest Member Access
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ListTodo size={36} color="#3b82f6" /> 
                {userRole === 'admin' ? 'Admin Panel' : 'Member Portal'}
            </h1>
            <p style={{ color: '#94a3b8', margin: '5px 0 0 0' }}>Welcome, {userRole === 'admin' ? 'Administrator' : 'Team Member'}</p>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#ef444415', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        {userRole === 'admin' && (
          <form onSubmit={addTask} style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', marginBottom: '40px', border: '1px solid #334155' }}>
             <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input style={{ flex: 2, padding: '14px', borderRadius: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }} placeholder="Task description..." value={title} onChange={(e) => setTitle(e.target.value)} />
                <input style={{ flex: 1, padding: '14px', borderRadius: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }} placeholder="Project Tag" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
             </div>
             <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
               Create New Task
             </button>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tasks.map(task => (
            <div key={task.id} style={{ 
              backgroundColor: '#1e293b', 
              padding: '24px', 
              borderRadius: '16px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              border: '1px solid #334155', 
              borderLeft: `6px solid ${task.status === 'DONE' ? '#22c55e' : '#3b82f6'}`,
              opacity: task.status === 'DONE' ? 0.7 : 1
            }}>
              <div>
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  textDecoration: task.status === 'DONE' ? 'line-through' : 'none',
                  color: task.status === 'DONE' ? '#94a3b8' : 'white'
                }}>
                  {task.title}
                </h3>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <span style={{ backgroundColor: '#3b82f620', color: '#3b82f6', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {task.projectName}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={14} /> {formatDate(task.createdAt)}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <CheckCircle 
                  size={22} 
                  color={task.status === 'DONE' ? "#22c55e" : "#475569"} 
                  style={{ cursor: 'pointer' }}
                  onClick={() => completeTask(task.id)}
                />
                {userRole === 'admin' && (
                  <Trash2 size={22} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => deleteTask(task.id)} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App