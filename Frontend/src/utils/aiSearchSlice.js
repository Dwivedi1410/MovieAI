import { createSlice } from "@reduxjs/toolkit";

const aiSearchSlice = createSlice({
    name: "aiSearch", 
    initialState: {
        aiButtonClick: false,
    },
    reducers: {
        setAiButtonClick: (state) => { 
            state.aiButtonClick = !state.aiButtonClick;
        }
    }
});

export const { setAiButtonClick } = aiSearchSlice.actions;
export default aiSearchSlice.reducer;