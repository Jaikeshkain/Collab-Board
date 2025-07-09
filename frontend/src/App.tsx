import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import LoginPage from "./components/auth/LoginPage"
import RegisterPage from "./components/auth/RegisterPage"
import BoardPage from "./components/Pages/BoardPage"
import CreateTask from "./components/Pages/CreateTask"
import EditTask from "./components/Pages/EditTask"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/" element={<BoardPage/>} />
        <Route path="/create-task" element={<CreateTask/>} />
        <Route path="/:id/edit-task" element={<EditTask/>} />

      </Routes>
    </Router>
  )
}

export default App;
