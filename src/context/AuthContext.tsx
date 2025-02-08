"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface User {
  id: string
  name: string
  role: "patient" | "doctor"
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (username: string, password: string) => {
    // Mock authentication
    if (username === "patient" && password === "password") {
      setUser({ id: "1", name: "John Doe", role: "patient" })
      return true
    } else if (username === "doctor" && password === "password") {
      setUser({ id: "2", name: "Dr. Smith", role: "doctor" })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

