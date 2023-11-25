import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import getCompanyTransactionsSlice from './store/getCompanyTransactionsSlice';
import getCompanyUsersSlice from './store/getCompanyUsersSlice';
import getCompanyBudgetSlice from './store/getCompanyBudgetSlice';
import getTransactionsCategoriesSlice from './store/getTransactionsCategoriesSlice';
import getCategoriesTransactionsSlice from './store/getCategoriesTransactionsSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { AuthProvider } from './auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const FitFlowReducer = combineReducers({
  getCompanyTransactions: getCompanyTransactionsSlice.reducer,
  getCompanyUsers: getCompanyUsersSlice.reducer,
  getCompanyBudget: getCompanyBudgetSlice.reducer,
  getTransactionsCategories: getTransactionsCategoriesSlice.reducer,
  getCategoriesTransactions: getCategoriesTransactionsSlice.reducer,
})

const store = configureStore({
  reducer: {FitFlowReducer},
  middleware: [thunk],
})

root.render(
  <Provider store={store}>
     <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <AuthProvider>
            <App />
          </AuthProvider>
        </StyledEngineProvider>
      </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default store
