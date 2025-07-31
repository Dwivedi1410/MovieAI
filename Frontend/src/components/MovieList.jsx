import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movieData }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative z-10 px-2">
      <button
        className="absolute z-20 top-1/2 left-0 ml-2 bg-gray-400 opacity-70 px-1 rounded-xl py-5"
        onClick={scrollLeft}
        aria-label="Scroll Left"
      >
        <span className="text-4xl text-black">{"<"}</span>
      </button>
      <button
        className="absolute z-20 top-1/2 right-0 mr-2 bg-gray-400 opacity-70 px-1 rounded-xl py-5"
        onClick={scrollRight}
        aria-label="Scroll Right"
      >
        <span className="text-4xl text-black">{">"}</span>
      </button>
      <h1 className="text-2xl font-semibold text-white mb-4">{title}</h1>
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto pb-4 no-scrollbar scroll-smooth"
      >
        <div className="flex gap-4">
          {movieData?.map((movie) => (
            <MovieCard key={movie.id} movieData={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
