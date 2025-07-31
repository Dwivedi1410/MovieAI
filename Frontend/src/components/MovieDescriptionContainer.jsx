const MovieDescriptionContainer = ({ firstMovieDetails }) => {
  const { original_title, overview } = firstMovieDetails || {};

  return (
    <div className="w-full aspect-video hidden md:block absolute pt-100 pl-8 text-white">
      <h1 className="text-lg font-semibold md:text-4xl md:font-bold opacity-60">{original_title}</h1>
      <p className="w-4/12 mt-4 hidden opacity-50">{overview}</p>
      <div className="mt-4 flex">
        <button className="bg-amber-400 p-1 text-xs opacity-60 md:text-lg rounded-lg w-[60px] md:w-[100px] flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-3 md:size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 md:ml-2">Play</span>
        </button>
        <button className="bg-amber-400 opacity-60 p-1 md:p-2 text-xs md:text-lg rounded-lg w-[60px] md:w-[100px] ml-2 md:ml-3 flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 md:size-6">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
</svg>
<span className="ml-1 md:ml-2">Info</span>
        </button>
      </div>
    </div>
  );
};

export default MovieDescriptionContainer;
