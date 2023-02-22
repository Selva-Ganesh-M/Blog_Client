import { createSlice } from "@reduxjs/toolkit";

export enum ENav {
  home = "home",
  create = "create",
  myBlogs = "myBlogs",
}

const navSlice = createSlice({
  name: "nav",
  initialState: {
    pos: ENav.home,
  },
  reducers: {
    changePos: (state, action) => {
      state.pos = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

// pull selectors

// export actions
export const { changePos } = navSlice.actions;

// exporting reducer
export default navSlice.reducer;
