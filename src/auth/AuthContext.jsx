import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import API
 from '../api/apiClient';


const initialState = {
  token: null,
  authenticated: null,
  getToken: async () => {},
  login: async () => {},
  logout: () => {},
}

const AuthContext = createContext(initialState);


export const AuthProvider = ({ value, children }) => {
  const tokenData = localStorage.getItem('user-token')
  let initialToken = null
  if (tokenData) {
    initialToken = tokenData
  }

  const [token, setToken] = useState(initialToken);
  const authenticated = Boolean(token)

  const getToken = async (username, password) => {
    return API.authenticateUser({username: username , password: password})
  }


  // const [authenticated, setAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);

  const login = (getTokenResults) => { //LOGOWANIE Z NOKII
    // Perform login logic (e.g., store token in local storage)
    //sessionStorage.setItem('user-token', token);
    //setAuthenticated(true);
    const { token: newToken } = getTokenResults
    if (newToken) {
      try {
        localStorage.setItem("user-token", newToken)
        setToken(newToken)
      } catch (decodeError) {
      }
  }}

  const logout = () => {
    sessionStorage.removeItem('user-token')
    setToken(false) //??
  }

  // useEffect(() => {
  //   // Check if the user is authenticated (e.g., by checking the presence of a token)
  //   const token = sessionStorage.getItem('user-token');
  //   if (token) {
  //     setAuthenticated(true);
  //     sessionStorage.setItem('user-token', token);
  //   }
  // }, [authenticated]);


  const contextValue = {
    token,
    authenticated,
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
  const { token, authenticated, logout } = useContext(AuthContext)
  return { token, authenticated, logout }
}

export default AuthContext