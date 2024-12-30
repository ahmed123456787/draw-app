import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draws: [],
};

const drawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    setDraws: (state, action) => {
      state.draws = action.payload;
    },
  },
});

export const { setDraws } = drawSlice.actions;
export default drawSlice.reducer;
