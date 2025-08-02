import { useDispatch } from "react-redux";
import { addPopularMovies } from "./movieSlice";
import { useEffect } from "react";
import {OPTIONS} from "./constants"

const usePopularMoviesData = () => {
    const dispatch = useDispatch();
    const movieData = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/popular", OPTIONS);
        const json = await data.json();
        // console.log("This is the data of Popular Movies", json?.results);
        dispatch(addPopularMovies(json?.results));
    }
    
    useEffect(()=>{
        movieData();
    }, [])
}

export default usePopularMoviesData;