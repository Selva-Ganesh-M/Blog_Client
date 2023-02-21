import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { rootState } from "../store";
import { TResponse } from "./userSlice";

export type TPost = {
  _id: string;
  cover: string;
  category: string;
  title: string;
  desc: string;
  likes: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};

const postAdapter = createEntityAdapter<TPost>({
  selectId: (post) => post._id,
  // sortComparer: (a, b) =>
  //   b.createdAt.toISOString().localeCompare(a.createdAt.toISOString()),
});

const postSlice = createSlice({
  name: "posts",
  initialState: postAdapter.getInitialState({
    loading: false,
    error: "",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPosts.fulfilled,
        (state, action: { type: any; payload: TPost[] }) => {
          postAdapter.setAll(state, action.payload);
        }
      )
      .addCase(likePost.fulfilled, (state, action) => {
        postAdapter.upsertOne(state, action.payload);
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        postAdapter.upsertOne(state, action.payload);
      });
  },
});

// exporting reducers
export default postSlice.reducer;

// selectors
export const { selectAll: getAllPosts, selectById: selectPostById } =
  postAdapter.getSelectors((state: rootState) => state.posts);

// #region : async thunk ops

export const getPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkApi) => {
    const res = await api.get<TResponse<TPost[]>>("/posts");
    return thunkApi.fulfillWithValue(res.data.payload);
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (data: { postId: string; userId: string }, thunkApi) => {
    const { userId, postId } = data;
    const res = await api.post<TResponse<TPost>>(`/posts/like/${postId}`, {
      userId: userId,
    });
    if (res.data.statusCode !== 200) {
      return thunkApi.rejectWithValue("");
    } else {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (data: { postId: string; userId: string }, thunkApi) => {
    const { userId, postId } = data;
    const res = await api.post<TResponse<TPost>>(`/posts/dislike/${postId}`, {
      userId: userId,
    });
    if (res.data.statusCode !== 200) {
      return thunkApi.rejectWithValue("");
    } else {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
  }
);

// #endregion
