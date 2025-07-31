import { OPTIONS } from "../utils/constants";
import useMovieVideo from "../utils/useMovieVideo";
import { useSelector } from "react-redux";

const MovieVideoContainer = ({ movieId }) => {
  useMovieVideo(movieId);

  const trailer = useSelector((store) => store.movie.trailer);

  if (!trailer || !trailer.length) return null;

  const movieKey = trailer?.[0]?.key;

  return (
    <div>
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${movieKey}?autoplay=1&mute=1&loop=1&playlist=${movieKey}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default MovieVideoContainer;
