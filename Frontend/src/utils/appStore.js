import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import aiReducer from "./aiSearchSlice"; 

const appStore = configureStore({
    reducer : {
        user: userReducer,
        movie: movieReducer,
        ai: aiReducer,
    }
});

export default appStore;