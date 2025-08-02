import { useRef, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { LOGIN_PAGE_BACKGROUND_IMAGE } from "../utils/constants";

const AiSearch = () => {
  const inputRequest = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const GEMINI_API = import.meta.env.VITE_GEMINI_API_KEY;

  const handleButtonClick = async () => {
    if (!inputRequest.current.value.trim()) {
      setError("Please enter a search query");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearchResults([]);

      const ai = new GoogleGenAI({ apiKey: GEMINI_API });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Give me the names of 5 movies based on this input: ${inputRequest.current.value}. Only respond with the movie names in this format: [name1, name2, name3, name4, name5]. Do not include any extra text or explanation.`,
      });
      
      let data = response?.candidates[0]?.content?.parts[0]?.text;
      
      if (data) {
        data = data.replace(/[[\]]/g, '').trim();
        const movieArray = data.split(',').map(movie => movie.trim());
        
        setSearchResults(movieArray);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to get movie recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <img 
          src={LOGIN_PAGE_BACKGROUND_IMAGE} 
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-black/80 backdrop-blur-sm text-white p-8 rounded-2xl shadow-2xl border border-white/10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                AI Movie Search
              </h1>
              <p className="text-gray-300 text-lg">
                Tell us what you're in the mood for and we'll recommend the perfect movies
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="What would you like to watch today?"
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl py-4 px-6 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  ref={inputRequest}
                  disabled={loading}
                />
                <button 
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl px-8 py-4 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleButtonClick}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </div>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-300 text-center">{error}</p>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Recommended Movies
                </h2>
                <div className="space-y-3">
                  {searchResults.map((movie, index) => (
                    <div 
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-white font-medium text-lg">{movie}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSearch;
