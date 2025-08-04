import { useSelector } from "react-redux";
import MovieDescriptionContainer from "./MovieDescriptionContainer";
import MovieVideoContainer from "./MovieVideoContainer";
export default function UpperDivision(){
    

    const movieData = useSelector((store) => store.movie.nowPlayingMovies);
  
    if (!movieData ||  !movieData.length) return null;
    
    const firstMovie = movieData[0];


    return(
        <div className="relative">
            <MovieDescriptionContainer firstMovieDetails = {firstMovie}/>
            <MovieVideoContainer movieId = {firstMovie?.id}/>
        </div>
    )
}
