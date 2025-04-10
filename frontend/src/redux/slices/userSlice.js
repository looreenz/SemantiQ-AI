import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
  chatMode: "gpt",
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
      state.chatMode = "gpt";
    },
    setChatMode: (state, action) => {
      state.chatMode = action.payload;
    },
  },
});

// Exportamos las acciones
export const { setUser, logoutUser, setChatMode } = userSlice.actions;

// Exportamos el reducer para usarlo en el store
export default userSlice.reducer;
