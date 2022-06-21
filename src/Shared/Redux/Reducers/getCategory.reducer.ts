import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { logoutAction } from "../Actions/auth/logout.action";
import getCategoriesAction, { GetCategoriesResponseType } from "../Actions/brand/category/getCategory.action";

export const getCategoryAdapter = createEntityAdapter<GetCategoriesResponseType>();

 const getCategorySlice = createSlice({
  name: "videoFeed",
  initialState: getCategoryAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesAction.fulfilled, (state, { payload }) => {
    });
    // builder.addCase(logoutAction.fulfilled, () => {});
  },
});
export default getCategorySlice 