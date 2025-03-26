import {useEffect} from "react";
import MovieActionButton from "./MovieActionButton";

// The onBack will run another function passed in from Search.jsx (which just set the selectedMovie state to null)
// This will hide the MovieCard and show the movie-list again
// onBack can be Search.jsx passes in, but in this case, it just hide the MovieCard by modifying the selectedMovie state

const MovieCard = ({ movie, onBack, movies, setMoviesFirebase }) => {
                                              
  return (
    <div className="movie-card">
      <button onClick={onBack} aria-label="Go back to the movie list">← Back</button>
      <div className="movie-content">
        <div className="text-content">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="release-date">Release date: {movie.release_date && movie.release_date}</p>
          <p className="overview">
            {movie.overview}
          </p>
        </div>
        <img 
          className="movie-card-poster"
          src={
            movie.image ? 
            movie.image : movie.poster_path ? 
            `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/no-poster-available.png' 
          } 
          alt={'Movie poster of ' + movie.title} 
        />
      </div>
      <MovieActionButton 
        movie={movie} 
        movies={movies} 
        setMoviesFirebase={setMoviesFirebase} 
        closeCard={onBack} 
      />
    </div>
  );
}

export default MovieCard;


