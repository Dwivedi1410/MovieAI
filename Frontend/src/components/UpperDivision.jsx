import { useSelector } from "react-redux";
import useNowPlayingMoviesData from "../utils/useNowPlayingMovieData";
import usePopularMoviesData from "../utils/usePopularMoviesData";
import useTopRatedMoviesData from "../utils/useTopRatedMoviesData";
import useUpComingMoviesData from "../utils/useUpComingMoviesData";
import MovieDescriptionContainer from "./MovieDescriptionContainer";
import MovieVideoContainer from "./MovieVideoContainer";
export default function UpperDivision(){
    useNowPlayingMoviesData();
    usePopularMoviesData();
    useTopRatedMoviesData();
    useUpComingMoviesData();

    const movieData = useSelector((store) => store.movie.nowPlayingMovies);
  
    if (!movieData ||  !movieData.length) return null;
    
    const firstMovie = movieData[1];


    return(
        <div className="relative">
            <MovieDescriptionContainer firstMovieDetails = {firstMovie}/>
            <MovieVideoContainer movieId = {firstMovie?.id}/>
        </div>
    )
}