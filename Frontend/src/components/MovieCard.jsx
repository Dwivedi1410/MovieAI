import { useNavigate } from "react-router-dom";
const MovieCard = ({ movieData }) => {
   const navigate = useNavigate()




  return (
    <div className="flex-shrink-0 w-28 sm:w-40 md:w-50 hover:scale-105 transition-transform duration-300 cursor-pointer">
      <img
        src={"https://image.tmdb.org/t/p/w500//" + movieData.poster_path}
        onClick={() => navigate(`/movie-detail/${movieData.id}`)}
        className="w-full h-38 sm:h-56 md:h-70 object-cover rounded-lg shadow-lg"
        alt={movieData.title || movieData.name}
      />
    </div>
  );
};

export default MovieCard;
