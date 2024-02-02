import React, { createContext, useContext, useState } from 'react'
import API from '../api/apiClient'


const initialState = {
  token: null,
  authenticated: null,
  user: null,
  getToken: async () => {},
  login: async () => {},
  logout: () => {},
}

const AuthContext = createContext(initialState)

export const AuthProvider = ({ value, children }) => {

  const tokenData = localStorage.getItem('user-token')
  
  let initialToken = null
  if (tokenData) {
    initialToken = tokenData
  }

  const userData = localStorage.getItem('user-data')
  let initialUser = null
  if (userData) {
    initialUser = userData
  }

  const [user, setUser] = useState(initialUser)
  const [token, setToken] = useState(initialToken)
  const authenticated = Boolean(token)

  const getToken = async (username, password) => {
    return API.authenticateUser({username: username , password: password})
  }

  const getCurrency = (id) => {
    if (id == 1) {
      return 'PLN'
    }
    else if (id == 2) {
      return 'EUR'
    }
  }

  const login = (getTokenResults) => {
    const { token: newToken, user: newUser} = getTokenResults
    if (newToken) {
      try {
        localStorage.setItem("user-token", newToken)
        localStorage.setItem("company-id", newUser.company_data.id)
        localStorage.setItem("group-id", newUser.company_data.group)
        localStorage.setItem("company-name", newUser.company_data.name)

        localStorage.setItem("currency", getCurrency(newUser.company_data.currency))
        localStorage.setItem("user-id", newUser.id)
        setToken(newToken)
        setUser(newUser)
      } catch (decodeError) {
      }
  }}

  const logout = () => {
    localStorage.clear()
    setToken(initialToken)
    setUser(initialUser)
  }

  const contextValue = {
    token,
    authenticated,
    user,
    getToken,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value ? { ...contextValue, value } : contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const { token, authenticated, user, logout } = useContext(AuthContext)
  return { token, authenticated, user, logout }
}

export default AuthContext