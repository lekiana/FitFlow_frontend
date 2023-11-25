import React from "react";
import "./App.css";
import DashboardContainer from "./containers/DashboardContainer";
import MeansContainer from "./containers/MeansContainer";
import UsersContainer from "./containers/UsersContainer";
import BudgetContainer from "./containers/BudgetContainer";
import SignIn from "./containers/SignIn";
import Login from "./containers/Login";
import NewCompany from "./containers/NewCompany";
import Home from "./containers/Home";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from "./auth/privateRoute";

const App = () => (
    <BrowserRouter>
      <Routes>
        {/* <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/" component={authenticated ? Home : Login} /> */}

        <Route
          path="/"
          element={
            <Home/>
          }
        />

        <Route
          path="/signin"
          element={
            <SignIn/>
          }
        />

        <Route
          path="/signup"
          element={
            <Login/>
          }
        />

        <Route
          path="/newaccount"
          element={
            <NewCompany/>
          }
        />

        <Route
          path="/dashboard"
          element={
            
            <div className="main">
            <PrivateRoute>
            <DashboardContainer/>
            </PrivateRoute>
            </div>
            
          }
        />

        <Route
          path="/means"
          element={
            <div className="main">
            <PrivateRoute>
            <MeansContainer/>
            </PrivateRoute>
            </div>
          }
        />

        <Route
          path="/users"
          element={
            
            <div className="main">
              <PrivateRoute>
            <UsersContainer/>
            
            </PrivateRoute>
            </div>
          }
        />

        <Route
          path="/budget"
          element={
            
            <div className="main">
              <PrivateRoute>
            <BudgetContainer/>
            </PrivateRoute>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
)

export default App