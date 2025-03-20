import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieList from "../components/MovieList";
import TVDisplay from "../components/TV-display";
import { useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const API_KEY = "7c72c1b67c6abe3b675236e07076b41b";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    searchMovies();
  }, [query]);

  const searchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    navigate(`?q=${query}&movie=${movie.id}`);
  };

  const handleBack = () => {
    setSelectedMovie(null);
    navigate(`?q=${query}`);
  };

  useEffect(() => {
    const movieId = searchParams.get('movie');
    if (movieId) {
      const foundMovie = movies.find(movie => movie.id === parseInt(movieId));
      if (foundMovie) {
        setSelectedMovie(foundMovie);
      }
    } else {
      setSelectedMovie(null); // Reset selectedMovie if no movie parameter
    }
  }, [movies, searchParams]); // Ensure effect runs on searchParams change

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setSearchParams({ q: e.target.value });
  };

  return (
    <>
      <TVDisplay />
      <div className="movie-container">
        <h2>Movie Search</h2>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={handleQueryChange}
        />
        {selectedMovie ? (
          <MovieCard movie={selectedMovie} onBack={handleBack} />
        ) : (
          <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
        )}
      </div>
    </>
  );
};

export default Search;


// Note:
// As the user type, the query state will be updated with the input value. AND the value of the input will be updated with the query state.
// As this happens, useEffect will run the searchMovies function due to changes detected in query.
// searchMovies will then fetch data from TMDB API and set the movies state with the data fetched (which can be multiple movies, thanks to API Endpoint partial search support)

// useState assigns initial values when a component mounts(first added to the DOM). Refresh page is considered a mount.

