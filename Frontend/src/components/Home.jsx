import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useNowPlayingMoviesData from "../utils/useNowPlayingMovieData";
import usePopularMoviesData from "../utils/usePopularMoviesData";
import useTopRatedMoviesData from "../utils/useTopRatedMoviesData";
import useUpComingMoviesData from "../utils/useUpComingMoviesData";
import UpperDivision from "./UpperDivision";
import LowerDivision from "./LowerDivision";

export default function Home(){
    const { user } = useSelector((store) => store.user);
    useNowPlayingMoviesData();
    usePopularMoviesData();
    useTopRatedMoviesData();
    useUpComingMoviesData();

    const movieData = useSelector((store) => store.movie);
    console.log("This is the movie data in Home Page", movieData);

    // Check if all movie categories are loaded
    const isDataLoading = !movieData.nowPlayingMovies || 
                         !movieData.popularMovies || 
                         !movieData.topRatedMovies || 
                         !movieData.upComingMovies;

    if(isDataLoading){
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="text-white text-xl">Loading movies...</div>
            </div>
        )
    }

    if(!user){
        return <Navigate to="/authentication" />
    }

    return(
        <div>
            <UpperDivision />
            <LowerDivision />
        </div>
    )
}