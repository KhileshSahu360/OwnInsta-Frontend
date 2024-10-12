import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name : "tokenSlice",
    initialState : { accessToken : null, auth : null, pageId : null, pageAccessToken : null},
    reducers: {
        setAccessToken : (state, action) => {
            state.accessToken = action.payload
        },
        setAuth : (state, action) => {
            console.log('auth',action.payload)
            state.setAuth = action.payload;
        },
        setPageId : (state, action) => {
            state.pageId = action.payload;
        },
        setPageAccessToken : (state, action) => {
            state.pageAccessToken = action.payload;
        }
    }
})

const store = configureStore({
    reducer : {
        tokenSlice : tokenSlice.reducer
    }
})

export const tokenSliceAction = tokenSlice.actions;
export default store;