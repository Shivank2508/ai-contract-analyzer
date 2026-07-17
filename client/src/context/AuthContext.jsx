import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginUser, signupUser } from '../api/authApi'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        const savedToken = localStorage.getItem('token')

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser))
        }

        setLoading(false)
    }, [])

    const login = async (payload) => {
        const response = await loginUser(payload)
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
        setUser(response.user)
        return response
    }

    const signup = async (payload) => {
        const response = await signupUser(payload)
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
        setUser(response.user)
        return response
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    const value = useMemo(
        () => ({ user, loading, login, signup, logout }),
        [user, loading],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider')
    }

    return context
}
