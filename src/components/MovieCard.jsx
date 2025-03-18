import React from "react";
import MovieActionButton from "./MovieActionButton";

// The onBack will run another function passed in from Search.jsx (which just set the selectedMovie state to null)
// This will hide the MovieCard and show the movie-list again
// onBack can be Search.jsx passes in, but in this case, it just hide the MovieCard by modifying the selectedMovie state

const MovieCard = ({ movie, onBack, movies, setMoviesFirebase }) => {
  return (
    <div>
      <button onClick={onBack} aria-label="Go back to the movie list">← Back</button>
      <h2>{movie.title}</h2>
      <img
        /* If movie.image exists, it means the movie was saved from Firestore → Use movie.image. */
        src={movie.image || `https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={'Movie poster of ' + movie.title}
      />
      <p>{movie.release_date && movie.release_date}</p>
      <p>{movie.overview}</p>
      <MovieActionButton  movie={movie} movies={movies} setMoviesFirebase={setMoviesFirebase} closeCard={onBack} />              {/*these change depending on where the movie list is displayed*/} 
    </div>
  );
};

export default MovieCard;
