import {useEffect} from "react";
import MovieActionButton from "./MovieActionButton";

// The onBack will run another function passed in from Search.jsx (which just set the selectedMovie state to null)
// This will hide the MovieCard and show the movie-list again
// onBack can be Search.jsx passes in, but in this case, it just hide the MovieCard by modifying the selectedMovie state

const MovieCard = ({ movie, onBack, movies, setMoviesFirebase }) => {
                                              
  return (
    <div className="movie-card">
      <button className="back-btn" onClick={onBack} aria-label="Go back to the movie list">← Back</button>

      <div className="card-content">            
          {/* If movie.image exists, it means the movie was displayed from Firestore → Use movie.image.
              If there is no poster in API, show a placeholder image */}
        <img src={
            movie.image ? 
            movie.image : movie.poster_path ? 
            `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/no-poster-available.png' // fallback placeholder
          } 
          alt={'Movie poster of ' + movie.title} 
        />

        <div className="card-details">
          <div className="text-group">
            <div className="title-date">
              <h3>{movie.title}</h3>
              <p className="release-date"><strong>Release date:</strong> {movie.release_date && movie.release_date}</p>
            </div>
            <p className="overview">{movie.overview}</p>
          </div>

          <div className="button-group">
            {/*changes depending on where the movie list is displayed*/} 
            <MovieActionButton  movie={movie} movies={movies} setMoviesFirebase={setMoviesFirebase} closeCard={onBack} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;


