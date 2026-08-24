import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    setIsAuthenticated: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        console.log("Checking Auth Status...");
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/auth-status`, {
                method: "GET",
                credentials: "include"
            });
            
            console.log("Auth Status Result:", response.status);
            
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, checkAuth, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
