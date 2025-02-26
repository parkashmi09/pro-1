"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"


interface AuthContextType {
  user: any | null
  login: (userData: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const navigate = useNavigate()

  const login = (userData: any) => {
    setUser(userData)
    navigate('/profile')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

