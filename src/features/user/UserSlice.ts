import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { UserDetailsState } from "./UserModel";

const initialState: UserDetailsState = {
}

const extraReducers = (builder: ActionReducerMapBuilder<UserDetailsState>) => {
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { },
  extraReducers
});

export const {} = userSlice.actions;

export default userSlice.reducer;