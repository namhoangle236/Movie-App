import React from "react";
import MovieActionButton from "./MovieActionButton";
import { useLocation } from "react-router-dom";

// The onBack will run another function passed in from Search.jsx (which just set the selectedMovie state to null)
// This will hide the MovieCard and show the movie-list again
// onBack can be Search.jsx passes in, but in this case, it just hide the MovieCard by modifying the selectedMovie state

const MovieCard = ({ movie, onBack }) => {
  const location = useLocation(); // Get the current page route

  // Determine which buttons to show based on the page
  let actionButtons;
  if (location.pathname.includes("watchlist")) {
    // If in Watchlist page
    actionButtons = (
      <>
        <button onClick={() => moveToWatched(movie)}>
          Watched
        </button>
        <button onClick={() => removeMovie(movie.id)}>
          Remove
        </button>
      </>
    );
  } else if (location.pathname.includes("watched")) {
    // If in Watched page
    actionButtons = (
      <>
        <button onClick={() => moveToWatchlist(movie)}>
          Watchlist
        </button>
        <button onClick={() => removeMovie(movie.id)}>
          Remove
        </button>
      </>
    );
  } else {
    // If in Search page
    actionButtons = (
      <>
        <MovieActionButton movie={movie} listType="watchlist" />
        <MovieActionButton movie={movie} listType="watched" />
      </>
    );
  }

  return (
    <div>
      <button onClick={onBack}>← Back</button>
      <h2>{movie.title}</h2>
      <img
        /* If movie.image exists, it means the movie was saved from Firestore → Use movie.image. */
        src={movie.image || `https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      {actionButtons}
    </div>
  );
};

export default MovieCard;
