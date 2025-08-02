import { useDispatch } from "react-redux";
import { addUpComingMovies } from "./movieSlice";
import { useEffect } from "react";
import {OPTIONS} from "./constants"

const useUpComingMoviesData = () => {
    const dispatch = useDispatch();
    const movieData = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/upcoming", OPTIONS);
        const json = await data.json();
        // console.log("This is the data of Upcoming Movies", json?.results);
        dispatch(addUpComingMovies(json?.results));
    }
    
    useEffect(()=>{
        movieData();
    }, [])
}

export default useUpComingMoviesData;