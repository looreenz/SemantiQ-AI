import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  user: null,         // Authenticated user data
  chatMode: "gpt",    // Default AI model (can be "gpt", "claude", "gemini", etc.)
};

// Slice definition
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data after login or registration
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // Clear user data and reset chat mode on logout
    logoutUser: (state) => {
      state.user = null;
      state.chatMode = "gpt"; // Reset to default model
    },

    // Change selected chat model
    setChatMode: (state, action) => {
      state.chatMode = action.payload;
    },
  },
});

// Export actions to use in components
export const { setUser, logoutUser, setChatMode } = userSlice.actions;

// Export reducer to include in the store
export default userSlice.reducer;
