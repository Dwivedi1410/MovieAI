import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const LowerDivision = () => {
    const movieList = useSelector((store) => store.movie);

  return (
    <div className="bg-black">
      <div className="-mt-10 sm:-mt-20 md:-mt-10">
        <MovieList title={"Now Playing Movies"} movieData={movieList.nowPlayingMovies}/>
        <MovieList title={"Top Rated Movies"} movieData={movieList.topRatedMovies}/>
        <MovieList title={"Popular Movies"} movieData={movieList.popularMovies}/>
        <MovieList title={"Up Coming Movies"} movieData={movieList.upComingMovies}/>
        
      </div>
    </div>
  );
};

export default LowerDivision;
