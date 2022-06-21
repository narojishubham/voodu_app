import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./Reducers/auth.reducer";
import getCategorySlice from "./Reducers/getCategory.reducer";
import profileSlice from "./Reducers/profile.reducer";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        profile:profileSlice.reducer,
        getCategory:getCategorySlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
