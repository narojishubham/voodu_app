import { createSlice } from "@reduxjs/toolkit";
import loginAction, { LoginResTypes } from "./login.action";

type initialStateType = { loading: boolean; user: LoginResTypes | null };
const initialState: initialStateType = { loading: false, user: null };

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
                    user: payload,
                };
            })
            .addCase(loginAction.rejected, () => {
                return {
                    loading: false,
                    user: null,
                };
            });
    },
});

export default authSlice.reducer;
