import { createSlice } from "@reduxjs/toolkit";
import { LoginResTypes } from "../../Models/Auth/login.types";
import loginAction from "../Actions/auth/login.action";
import loginWithTokenAction from "../Actions/auth/loginWithToken.action";
import { logoutAction } from "../Actions/auth/logout.action";

type initialStateType = { loading: boolean; userData: LoginResTypes | null };
const initialState: initialStateType = { loading: false, userData: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutAction: (state) => {
            localStorage.removeItem("theboom_token");
            state.userData = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(loginAction.fulfilled, (state, { payload }) => {
                if (payload && payload.token && payload.data && payload.data.accountId) {
                    // const uniqueKey = `token_${payload?.data.accountId}`
                    const uniqueKey = `theboom_token`
                    localStorage.setItem(uniqueKey, payload?.token)
                }
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
            })
            .addCase(loginWithTokenAction.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(loginWithTokenAction.fulfilled, (state, { payload }) => {
                if (payload && payload.token && payload.data && payload.data.accountId) {
                    // const uniqueKey = `token_${payload?.data.accountId}`
                    const uniqueKey = `theboom_token`
                    localStorage.setItem(uniqueKey, payload?.token)
                }
                return {
                    loading: false,
                    userData: payload,
                };
            })
            .addCase(loginWithTokenAction.rejected, () => {
                return {
                    loading: false,
                    userData: null,
                };
            });

    },
});

export default authSlice;
