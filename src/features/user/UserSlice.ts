import { ActionReducerMapBuilder, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./UserModel";

const initialState: UserState = {
  users: [
    { id: 1, name: "Fake" },
    { id: 2, name: "Data" }
  ]
}

const loadUsers = createAsyncThunk(
  "users/loadUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3010/users");
      return response.data
    }
    catch(ex: any) {
      return rejectWithValue(ex.message);
    }
  }
);

const addUser = createAsyncThunk(
  "users/addUser",
  async (user: any, { rejectWithValue }) => {
    try {
      await axios.post("http://localhost:3010/users", user);
    }
    catch(ex: any) {
      return rejectWithValue(ex.message);
    }
  }
);

const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3010/users/${id}`);
    }
    catch(ex: any) {
      return rejectWithValue(ex.message);
    }
  }
);

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {

  builder.addCase(loadUsers.fulfilled, (state, action) => {
    state.users = action.payload
  })
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { },
  extraReducers
});

export const actions = { loadUsers, addUser, deleteUser, ...userSlice.actions };

export default userSlice.reducer;