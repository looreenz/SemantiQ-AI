import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

// Exportamos las acciones
export const { setUser, logoutUser } = userSlice.actions;

// Exportamos el reducer para usarlo en el store
export default userSlice.reducer;
