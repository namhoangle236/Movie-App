import React from "react";

// The onBack will run another function passed in from Search.jsx (which just set the selectedMovie state to null)
// This will hide the MovieCard and show the movie-list again
// onBack can be Search.jsx passes in, but in this case, it just hide the MovieCard by modifying the selectedMovie state

const MovieCard = ({ movie, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>← Back</button>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieCard;
