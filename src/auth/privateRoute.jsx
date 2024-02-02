import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth()
  const location = useLocation()

  return authenticated ? (
    <React.Suspense>{children}</React.Suspense>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  )
}

export default PrivateRoute
