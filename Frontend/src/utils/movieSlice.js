import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState:{
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upComingMovies: null,
        trailer: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action)=>{
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action)=>{
            state.topRatedMovies = action.payload;
        },
        addUpComingMovies: (state, action)=>{
            state.upComingMovies = action.payload;
        },
        addMovieTrailer: (state, action)=>{
            state.trailer = action.payload;
        }
    }
})

export const { addNowPlayingMovies, addMovieTrailer, addPopularMovies, addTopRatedMovies, addUpComingMovies } = movieSlice.actions;

export default movieSlice.reducer;