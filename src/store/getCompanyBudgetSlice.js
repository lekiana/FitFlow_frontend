import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import API from "../api/apiClient"

export const getCompanyBudget = createAsyncThunk("getCompanyBudget/get", async (params) => {
    const res = await API.getCompanyBudget(params)
    return res.data
})

const getCompanyBudgetSlice = createSlice({
    name: "getCompanyBudget",
    initialState: {
        data: [],
        error: null,
        success: false,
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getCompanyBudget.pending]: (state) => {
            state.error = null
            state.success = false
            state.loading = true
        },
        [getCompanyBudget.fulfilled]: (state, {payload}) => {
            state.success = true
            state.error = null
            state.loading = false
            state.data = payload
        },
        [getCompanyBudget.rejected]: (state, {error}) => {
            state.error = error.message
            state.success = false
            state.loading = false
        },
    }
})

export const getCompanyBudgetActions = getCompanyBudgetSlice.actions
export default getCompanyBudgetSlice