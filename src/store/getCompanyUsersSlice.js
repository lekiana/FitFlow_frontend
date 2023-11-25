import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import API from "../api/apiClient"

export const getCompanyUsers = createAsyncThunk("getCompanyUsers/get", async (params) => {
    const res = await API.getCompanyUsers(params)
    return res.data
})

const getCompanyUsersSlice = createSlice({
    name: "getCompanyUsers",
    initialState: {
        data: [],
        error: null,
        success: false,
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getCompanyUsers.pending]: (state) => {
            state.error = null
            state.success = false
            state.loading = true
        },
        [getCompanyUsers.fulfilled]: (state, {payload}) => {
            state.success = true
            state.error = null
            state.loading = false
            state.data = payload
        },
        [getCompanyUsers.rejected]: (state, {error}) => {
            state.error = error.message
            state.success = false
            state.loading = false
        },
    }
})

export const getCompanyUsersActions = getCompanyUsersSlice.actions
export default getCompanyUsersSlice