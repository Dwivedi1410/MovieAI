import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        error: null
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        removeUser: (state) => {
            state.user = null;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { addUser, removeUser, setError } = userSlice.actions;

export default userSlice.reducer;