import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import { useAuth } from './context/AuthContext'
import { UploadPage } from './pages/UploadPage'
import ContractsPage from './pages/ContractsPage'
import AnalyzeContractPage from './pages/analyzeContractPage'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <p className="loading-state">Loading...</p>
    }

    return user ? children : <Navigate to="/login" replace />
}

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/upload"
            element={
                <ProtectedRoute>
                    <UploadPage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/contracts"
            element={
                <ProtectedRoute>
                    <ContractsPage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/contracts/:contract_id"
            element={
                <ProtectedRoute>
                    <AnalyzeContractPage />
                </ProtectedRoute>
            }
        />
    </Routes>
)

export default AppRoutes
