import { useEffect } from "react";
import { OPTIONS } from "./constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "./movieSlice";

const useMovieVideo = (movieId) => {
    const dispatch = useDispatch();

  const videoDetails = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos", OPTIONS);
    const json = await data.json();

    const trailer = json?.results?.filter((movies) => movies?.type === "Trailer");
    let finalTrailer = null;
    if(trailer.length >= 1){
        finalTrailer = trailer.filter((movies) => movies.name === "Official Trailer");
    }
    if(finalTrailer){
        dispatch(addMovieTrailer(finalTrailer));
    }
    else{
        dispatch(addMovieTrailer(trailer?.[0]));
    }
    
  };

  useEffect(() => {
    videoDetails();
  }, []);
};

export default useMovieVideo;
