import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "./movieSlice";
import { useEffect } from "react";
import {OPTIONS} from "./constants"

const useTopRatedMoviesData = () => {
    const dispatch = useDispatch();
    const movieData = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/top_rated", OPTIONS);
        const json = await data.json();
        console.log("This is the data of Top Rated Movies", json?.results);
        dispatch(addTopRatedMovies(json?.results));
    }
    
    useEffect(()=>{
        movieData();
    }, [])
}

export default useTopRatedMoviesData;