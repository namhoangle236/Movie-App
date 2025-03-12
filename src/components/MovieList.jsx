import React from "react";

export default function MovieList ({ movies, onMovieSelect, actionButtons}) {
    return (
        <ul className="movie-list">
            {movies.map((movie) => (
                <li
                    key={movie.id}
                    className="movie-item"
                    onClick={ () => onMovieSelect(movie)}
                    style={{ cursor: "pointer" }}
                >
        
                    {/* If movie.image exists, it means the movie was saved from Firestore → Use movie.image. */}
                    <img src={movie.image || `https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    {movie.title}

                    {/* Show "Rewatching" label if the movie is rewatching */}
                    {movie.rewatching && (
                        <span style={{ color: "orange", fontWeight: "bold" }}>Rewatching</span>
                    )}

                    {actionButtons(movie)}              {/*these change depending on where the movie list is displayed*/} 
                </li>
            ))}
        </ul>
    )
}

// Map out the movie to <li> elements, and display the movie title. (and other stuffs like poster, etc)