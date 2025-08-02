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
        className="absolute z-20 top-1/2 -translate-y-1/2 left-0 ml-1 sm:ml-2 bg-black/80 hover:bg-black/90 backdrop-blur-sm border border-white/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-80 hover:opacity-100 shadow-lg"
        onClick={scrollLeft}
        aria-label="Scroll Left"
      >
        <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">‹</span>
      </button>
      <button
        className="absolute z-20 top-1/2 -translate-y-1/2 right-0 mr-1 sm:mr-2 bg-black/80 hover:bg-black/90 backdrop-blur-sm border border-white/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-80 hover:opacity-100 shadow-lg"
        onClick={scrollRight}
        aria-label="Scroll Right"
      >
        <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">›</span>
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
