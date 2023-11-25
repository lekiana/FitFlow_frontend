import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import API from "../api/apiClient"

export const getCategoriesTransactions = createAsyncThunk("getCategoriesTransactions/get", async (params) => {
    const res = await API.getCategoryTransactions(params)
    return res.data
})

const getCategoriesTransactionsSlice = createSlice({
    name: "getTransactionsCategories",
    initialState: {
        data: [],
        error: null,
        success: false,
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getCategoriesTransactions.pending]: (state) => {
            state.error = null
            state.success = false
            state.loading = true
        },
        [getCategoriesTransactions.fulfilled]: (state, {payload}) => {
            state.success = true
            state.error = null
            state.loading = false
            state.data = payload
        },
        [getCategoriesTransactions.rejected]: (state, {error}) => {
            state.error = error.message
            state.success = false
            state.loading = false
        },
    }
})

export const getCategoriesTransactionssActions = getCategoriesTransactionsSlice.actions
export default getCategoriesTransactionsSlice