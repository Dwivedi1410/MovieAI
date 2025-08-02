import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "./movieSlice";
import { useEffect } from "react";
import {OPTIONS} from "./constants"

const useNowPlayingMoviesData = () => {
    const dispatch = useDispatch();
    const movieData = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/now_playing", OPTIONS);
        const json = await data.json();
        // console.log("This is the data of Now Playing Movies", json?.results);
        dispatch(addNowPlayingMovies(json?.results));
    }
    
    useEffect(()=>{
        movieData();
    }, [])
}

export default useNowPlayingMoviesData;