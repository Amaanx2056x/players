import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const playerSlice = createSlice({
  name: "player",
  initialState: {
    value: [],
  },
  reducers: {
    getAll: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getAll } = playerSlice.actions;

export const getAllPlayers = (setLoad, setFiltered) => async (dispatch) => {
  try {
    let res = await axios.get(`https://api.npoint.io/20c1afef1661881ddc9c`);
    if (res.status === 200) {
      dispatch(getAll(res.data));
      setFiltered({
        data: res.data.playerList,
        filtered_data: res.data.playerList,
        searchQuery: "",
      });
      setLoad(false);
    }
  } catch (error) {
    window.alert("Something went wrong while fetching data");
    setLoad(false);
  }
};

export const selectPlayers = (state) => state.player.value;

export default playerSlice.reducer;
