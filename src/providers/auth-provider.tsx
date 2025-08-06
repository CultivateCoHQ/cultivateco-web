'use client'

import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  user: any
  login: (credentials: any) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function CannabisAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)

  const login = async (credentials: any) => {
    // Mock login
    setUser({ id: '1', name: 'Demo User', role: 'admin' })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
