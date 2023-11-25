import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import API from "../api/apiClient"

export const getCompanyTransactions = createAsyncThunk("getCompanyTransactions/get", async (params) => {
    const res = API.getCompanyTransactions(params)
    return res.data
})

const getCompanyTransactionsSlice = createSlice({
    name: "getCompanyTransactions",
    initialState: {
        data: [],
        error: null,
        success: false,
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getCompanyTransactions.pending]: (state) => {
            state.error = null
            state.success = false
            state.loading = true
        },
        [getCompanyTransactions.fulfilled]: (state, {payload}) => {
            state.success = true
            state.error = null
            state.loading = false
            state.data = payload
        },
        [getCompanyTransactions.rejected]: (state, {error}) => {
            state.error = error.message
            state.success = false
            state.loading = false
        },
    }
})

export const getCompanyTransactionsActions = getCompanyTransactionsSlice.actions
export default getCompanyTransactionsSlice