import { Link, useNavigate } from 'react-router-dom';
import '../../styles/LoginPage.css'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RegisterAPI } from '../../services/AuthService';
const RegisterPage=()=>{
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const [isLoading,setIsLoading]=useState(false)

    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()

    const mutation=useMutation({
        mutationFn:(body:any)=>RegisterAPI(body),
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
        onSuccess:()=>{
            setSuccess("login Success")
            setError("")
            setIsLoading(false)
            navigate("/login")
        }
    })

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        const body={username:userName,email,password}
        mutation.mutate(body)
    };


    return(
        <div className="login-container">
        <h2 className="login-title">Welcome Back</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="error">{success}</div>}
        {isLoading && <div className="error">Loading</div>}

        <form className="login-form" onSubmit={handleRegister}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your name"
                    required
                    id="username"
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                />
            </div>

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

            <button type="submit" className="login-button">Register</button>
        </form>

        <div id="message-container"></div>

        <div className="signup-section">
            <div className="signup-text">Already have an account?</div>
            <Link to="/login" className="signup-link">Sign In</Link>
        </div>
    </div>
    )
}

export default RegisterPage;