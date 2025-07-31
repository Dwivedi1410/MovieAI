import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OPTIONS } from "../utils/constants";

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      const data = await response.json();
      setMovieDetail(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  const { original_title, overview, poster_path, release_date, vote_average, runtime } = movieDetail;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img 
                className="w-full h-auto rounded-lg shadow-2xl" 
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt={original_title}
              />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{original_title}</h1>
              
              <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                {release_date && (
                  <span className="flex items-center">
                    <span className="mr-2">📅</span>
                    {new Date(release_date).getFullYear()}
                  </span>
                )}
                {runtime && (
                  <span className="flex items-center">
                    <span className="mr-2">⏱️</span>
                    {runtime} min
                  </span>
                )}
                {vote_average && (
                  <span className="flex items-center">
                    <span className="mr-2">⭐</span>
                    {vote_average.toFixed(1)}/10
                  </span>
                )}
              </div>
            </div>
            {overview && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{overview}</p>
              </div>
            )}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Movie Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Original Title:</span>
                  <p className="text-white">{original_title}</p>
                </div>
                {release_date && (
                  <div>
                    <span className="text-gray-400">Release Date:</span>
                    <p className="text-white">{new Date(release_date).toLocaleDateString()}</p>
                  </div>
                )}
                {runtime && (
                  <div>
                    <span className="text-gray-400">Runtime:</span>
                    <p className="text-white">{runtime} minutes</p>
                  </div>
                )}
                {vote_average && (
                  <div>
                    <span className="text-gray-400">Rating:</span>
                    <p className="text-white">{vote_average.toFixed(1)}/10</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
