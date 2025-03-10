import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = "7c72c1b67c6abe3b675236e07076b41b";

  const searchMovies = async () => {
    if (!query) return;
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
      const data = await response.json();
      setMovies(data.results);                  // TMDB movie's data is stored in 'result' key inside the json 
      console.log(data.results)
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    searchMovies();
  }, [query]);              // update search when there's change in query

  return (
    <div>
      <h2>Movie Search</h2>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
