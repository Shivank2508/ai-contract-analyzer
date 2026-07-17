import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../context/AuthContext'

const SignupPage = () => {
    const navigate = useNavigate()
    const { signup } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (formData) => {
        setLoading(true)
        setError('')

        try {
            await signup(formData)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Signup failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">Start here</p>
                <h1>Create your account</h1>
                <AuthForm mode="signup" onSubmit={handleSubmit} loading={loading} error={error} />
                <p className="auth-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default SignupPage
