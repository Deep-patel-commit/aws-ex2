import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    FirstName: "",
    LastName: "",
    Gender: "",
    Height: "",
    BirthDate: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userData = {
        FirstName: action.payload.FirstName,
        LastName: action.payload.LastName,
        Gender: action.payload.Gender,
        Height: action.payload.Height,
        BirthDate: action.payload.BirthDate,
      };
      state.user = userData;
    },
    removeUser: (state, action) => {
      state.users = {
        FirstName: "",
        LastName: "",
        Gender: "",
        Height: "",
        BirthDate: "",
      };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
