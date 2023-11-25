import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import API from "../api/apiClient"

export const getTransactionsCategories = createAsyncThunk("getTransactionsCategories/get", async (params) => {
    const res = await API.getTransactionsCategories(params)
    return res.data
})

const getTransactionsCategoriesSlice = createSlice({
    name: "getTransactionsCategories",
    initialState: {
        data: [],
        error: null,
        success: false,
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getTransactionsCategories.pending]: (state) => {
            state.error = null
            state.success = false
            state.loading = true
        },
        [getTransactionsCategories.fulfilled]: (state, {payload}) => {
            state.success = true
            state.error = null
            state.loading = false
            state.data = payload
        },
        [getTransactionsCategories.rejected]: (state, {error}) => {
            state.error = error.message
            state.success = false
            state.loading = false
        },
    }
})

export const getTransactionsCategoriesActions = getTransactionsCategoriesSlice.actions
export default getTransactionsCategoriesSlice