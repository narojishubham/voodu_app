import { createSlice } from "@reduxjs/toolkit";
import loginAction from "../Actions/auth/Login.action";
import { LoginServiceResType } from "../../shared/models/Auth";

type initialStateType = { loading: boolean; userData: LoginServiceResType | null };
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
