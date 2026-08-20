import React, { useState } from "react";
import type { Screen } from "../../App";
import { useAuth } from "../../context/AuthContext";
import "./login.css";
import "../register/register.css"; 

export default function LoginScreen(props: { navigate: React.Dispatch<React.SetStateAction<Screen>> }) {
    const { setIsAuthenticated } = useAuth();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError(null);
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                props.navigate("home");
            } else {
                setError(data.message || "Invalid credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Failed to connect to the server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-screen">
            <h1 className="login-title">Welcome Back</h1>
            
            {error && <div className="error-text">{error}</div>}
            
            <div className="login-form">
                <label>Email Address</label>
                <input 
                    type="email" 
                    placeholder="user@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            
            <div className="form-actions">
                <button 
                    className="btn-primary" 
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                
                <div 
                    className="switch-link"
                    onClick={() => props.navigate("register")}
                >
                    Don't have an account? Register
                </div>
            </div>
        </div>
    );
}
