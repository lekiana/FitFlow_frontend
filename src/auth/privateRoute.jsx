import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Box, CircularProgress } from '@mui/material';


const CircularProgressCentered = () => (
  <Box
   // bgcolor="background.default"
   display="flex"
   justifyContext="center"
   padding="40px"
   height="100hv"
   >
    <CircularProgress/>
   </Box>
)

const PrivateRoute = ({ children }) => {
const { authenticated } = useAuth()
const location = useLocation()

return authenticated ? (
  <React.Suspense fallback={<CircularProgressCentered />}>{children}</React.Suspense>
) : (
  <Navigate to="/" replace state={{ from: location }} />
)

  // if (!authenticated) {
  //   return <Navigate to="/" replace />;
  // }

  // return children;
}

export default PrivateRoute;
