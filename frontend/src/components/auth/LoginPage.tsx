// src/pages/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/LoginPage.css";
import { LoginAPI } from "../../services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/slices/AuthSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading,setIsLoading]=useState(false)
  const [success, setSuccess]=useState("")
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const mutation=useMutation({
    mutationFn:(body:any)=>LoginAPI(body),
    mutationKey:["login"],
    onMutate:()=>{
        setSuccess("")
        setError("")
        setIsLoading(true)
    },
    onError:(error)=>{
        setIsLoading(false)
        setError(error.message)
        setSuccess("")
    },
    onSuccess:(data)=>{
        dispatch(loginAction(data))
        setSuccess("login Success")
        navigate("/")
    }
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
   const body={email,password}
   mutation.mutate(body)
  };

  return (
    <div className="login-container">
        <h2 className="login-title">Welcome Back</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="error">{success}</div>}
        {isLoading && <div className="error">Loading</div>}

        <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
                <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    required
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div className="input-group">
                <input
                    type="password"
                    className="form-input"
                    placeholder="Enter your password"
                    required
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="login-button">Sign In</button>
        </form>

        <div id="message-container"></div>

        <div className="signup-section">
            <div className="signup-text">Don't have an account?</div>
            <Link to="/register" className="signup-link">Create Account</Link>
        </div>
    </div>
  );
};

export default LoginPage;
