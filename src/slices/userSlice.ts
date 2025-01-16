import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    FirstName: "firstName",
    LastName: "lastName",
    Gender: "male./female",
    Height: "5.6",
    BirthDate: "2021-10-10",
    Picture: "",
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
        FirstName: "firstName",
        LastName: "lastName",
        Gender: "male./female",
        Height: "5.6",
        BirthDate: "2021-10-10",
      };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
