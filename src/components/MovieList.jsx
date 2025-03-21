import React, { useEffect } from "react";
import MovieActionButton from "./MovieActionButton";
import {useLocation} from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import StarRating from "../components/StarRating";


export default function MovieList ({ movies, onMovieSelect, setMoviesFirebase}) {
    const location = useLocation();
    const { currentUser} = useAuth();

    useEffect(() => {

    }, [movies]) 

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
                    <img src={movie.image || `https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={'Movie poster of ' + movie.title} />
                    
                    <p>{movie.title}</p>

                    <p>{movie.release_date && movie.release_date.substring(0, 4)}</p>

                    {/* Show "Rewatching" label if the movie is rewatching */}
                    {movie.rewatching && (
                        <span style={{ color: "orange", fontWeight: "bold" }}>Rewatching</span>
                    )}

                    <MovieActionButton  movie={movie} movies={movies} setMoviesFirebase={setMoviesFirebase} />              {/*changes depending on where the movie list is displayed*/} 
                    
                    {/* User can put rating to movies in his "watched" list */}
                    {location.pathname.includes("watched") && (
                        /* Star Rating Component */
                        <StarRating movie={movie} listType="watched" userId={currentUser.uid} />
                    )}
                </li>
            ))}
        </ul>
    )
}

// Map out the movie to <li> elements, and display the movie title. (and other stuffs like poster, etc)