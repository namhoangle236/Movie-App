import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieList from "../components/MovieList";
import TVDisplay from "../components/TV-display"; // Import the TV lmaooooo


const Search = () => {
  const [query, setQuery] = useState(sessionStorage.getItem("searchQuery") || "");      // search query is restored if the page was reloaded with search results
  const [movies, setMovies] = useState(
    JSON.parse(sessionStorage.getItem("searchResults")) || []        // movies are restored if the page was reloaded with search results
  );
  const [selectedMovie, setSelectedMovie] = useState(null);        // to store the selected movie for movie card

  const API_KEY = "7c72c1b67c6abe3b675236e07076b41b";

  const searchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
      const data = await response.json();
      setMovies(data.results);                                              // TMDB movie's data is stored in 'result' key inside the json 
      sessionStorage.setItem("searchResults", JSON.stringify(data.results)); // Save results in sessionStorage
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => { 
    if (query){    
      sessionStorage.setItem("searchQuery", query);        // Save query to sessionStorage
      searchMovies();  
    }  
  }, [query]);                                        // run the search when there's change in query. When component mount and useState first runs, it is also a change

// Reset search state when the component unmounts
useEffect(() => {
  return () => {                                      // The return inside useEffect is used for cleanup functions, which run when a component unmounts (is removed from the DOM).
    sessionStorage.removeItem("searchQuery"); // Clear query
    sessionStorage.removeItem("searchResults"); // Clear movie results
  };
}, []);

  return (
    <>
      <TVDisplay />
      <div className="movie-container">
        <h2>Movie Search</h2>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}                                 // set the input value to the query state when page start, and when there's change in query (this will continuously get updated thanks to setQuery)     
          onChange={(e) => setQuery(e.target.value)}    // set the query state to the input as the user types
        />

        {/* if there's a selected movie, display MovieCard and back button and hide the movie-list */}
        {selectedMovie ? (
          <MovieCard movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
        ) : (
          <MovieList
            movies={movies}
            onMovieSelect={setSelectedMovie} 
          />
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

