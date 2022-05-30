import { createSlice } from "@reduxjs/toolkit";
import loginAction from "../Actions/auth/login.action";

type initialStateType = { loading: boolean; userData: any | null };
const initialState: initialStateType = { loading: false, userData: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(loginAction.fulfilled, (state, { payload }) => {
                return {
                    loading: false,
                    userData: payload,
                };
            })
            .addCase(loginAction.rejected, () => {
                return {
                    loading: false,
                    userData: null,
                };
            });
    },
});

export default authSlice.reducer;
