import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  FirstName: "",
  LastName: "",
  Gender: "",
  Height: "",
  BirthDate: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("----- inside setUser", action.payload);
      state.FirstName = action.payload.FirstName;
      state.LastName = action.payload.LastName;
      state.Gender = action.payload.Gender;
      state.Height = action.payload.Height;
      state.BirthDate = action.payload.BirthDate;
    },
    removeUser: (state) => {
      state.FirstName = "";
      state.LastName = "";
      state.Gender = "";
      state.Height = "";
      state.BirthDate = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
