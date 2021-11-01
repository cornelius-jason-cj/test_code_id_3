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
      console.log(response);
    }
    catch(ex: any) {
      return rejectWithValue(ex.message);
    }
  }
);

const addUser = createAsyncThunk(
  "users/loadUsers",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3010/users", user);
      console.log(response);
    }
    catch(ex: any) {
      return rejectWithValue(ex.message);
    }
  }
);

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { },
  extraReducers
});

export const actions = { loadUsers, addUser, ...userSlice.actions };

export default userSlice.reducer;