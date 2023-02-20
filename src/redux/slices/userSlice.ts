import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { rootState } from "../store";

export type TResponse<T> = {
  statusText: string;
  statusCode: number;
  message: string;
  payload: T;
};

export type TRegisterData = {
  username: string;
  email: string;
  password: string;
};

// #region : async thunk ops
// register user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: TRegisterData, thunkApi) => {
    // register user
    const res = await api.post<
      TResponse<{ username: string; email: string; _id: string; token: string }>
    >("/auth/register", data);

    // if failed reject
    if (res.data.statusText !== "success") {
      return thunkApi.rejectWithValue({});
    }

    console.log("registered user is: ", res.data.payload);

    return thunkApi.fulfillWithValue(res.data.payload);
  }
);

// login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: { email: string; password: string }, thunkApi) => {
    // register user
    const res = await api.post<
      TResponse<{ username: string; email: string; _id: string; token: string }>
    >("/auth/login", data);

    // if failed reject
    if (res.data.statusText !== "success") {
      return thunkApi.rejectWithValue({});
    }

    return thunkApi.fulfillWithValue(res.data.payload);
  }
);

// #endregion

const initialState: {
  status: boolean;
  details: {
    username: string;
    email: string;
    token: string;
    _id: string;
  };
} = {
  status: false,
  details: {
    username: "",
    email: "",
    token: "",
    _id: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = true;
        state.details = { ...action.payload };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = true;
        state.details = { ...action.payload };
      });
  },
});

// reducer
export default userSlice.reducer;

// selectors
export const getUser = (state: rootState) => state.user;

// actions
export const { logout } = userSlice.actions;
