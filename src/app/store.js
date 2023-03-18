import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../features/players/PlayerSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
