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
  userId: string;

  likes: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};

export type TPostPrep = {
  cover: string;
  category: string;
  title: string;
  desc: string;
  userId: string;
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
    myBlogs: <Array<TPost>>[],
  }),
  reducers: {
    clearPosts: (state) => {
      postAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPosts.fulfilled,
        (state, action: { type: any; payload: TPost[] }) => {
          postAdapter.setAll(state, action.payload);
          state.loading = false;
        }
      )
      .addCase(likePost.fulfilled, (state, action) => {
        postAdapter.upsertOne(state, action.payload);
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        postAdapter.upsertOne(state, action.payload);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        postAdapter.addOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        postAdapter.removeOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        postAdapter.upsertOne(state, action.payload);
      })
      .addCase(getMyBlogs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyBlogs.fulfilled, (state, action) => {
        postAdapter.setAll(state, action.payload);
        state.loading = false;
      });
  },
});

// exporting reducers
export default postSlice.reducer;

// actions
export const { clearPosts } = postSlice.actions;

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

// create post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data: TPostPrep, thunkApi) => {
    const res = await api.post<TResponse<TPost>>("/posts/create", data);
    if (res.data.statusCode !== 201) {
      return thunkApi.rejectWithValue("");
    } else {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
  }
);

// delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string, thunkApi) => {
    const res = await api.delete<TResponse<TPost>>(`/posts/delete/${id}`);
    if (res.data.statusCode === 200) {
      return thunkApi.fulfillWithValue(id);
    } else {
      return thunkApi.rejectWithValue(id);
    }
  }
);

// update post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (data: Partial<TPost>, thunkApi) => {
    const res = await api.patch<TResponse<TPost>>(
      `/posts/update/${data._id}`,
      data
    );

    if (res.data.statusCode === 200) {
      return thunkApi.fulfillWithValue(res.data.payload);
    } else {
      return thunkApi.rejectWithValue(res.data.payload);
    }
  }
);

// get my blogs
export const getMyBlogs = createAsyncThunk(
  "posts/getMyBlogs",
  async (id: string, thunkApi) => {
    const res = await api.get<TResponse<TPost[]>>(`/posts/myblogs/${id}`);
    if (res.data.statusCode === 200) {
      return thunkApi.fulfillWithValue(res.data.payload);
    } else {
      return thunkApi.rejectWithValue(res.data.payload);
    }
  }
);

// #endregion
