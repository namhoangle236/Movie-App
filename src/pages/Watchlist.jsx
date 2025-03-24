import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs} from "firebase/firestore";
import { useSearchParams } from 'react-router-dom';
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";


export default function Watchlist() {
    const { currentUser} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [moviesFirebase, setMoviesFirebase] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // We use useEffect in this case to fetch the user's watchlist from Firestore only when the currentUser changes.
    useEffect(() => {
        async function fetchWatchList() {
            if (!currentUser) return;

            // Fetch all movies from Firestore under the user's watchlist collection
            const querySnapshot = await getDocs(collection(db, "users", currentUser.uid, "watchlist"));

            // Convert Firestore documents into an array and update state
            // Firestore stores each movie as a document, and each document has an ID plus the data inside it.
            // To convert Firestore documents into an array of movies, we use:
            setMoviesFirebase(
                querySnapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data()}))
                    .sort((a,b) => b.addedAt?.seconds - a.addedAt?.seconds)                     // sorting movies in descending order
                );
        };

        fetchWatchList();
    }, [currentUser]);          // runs on first component load and every time currentUser changes

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
        setSearchParams({ movie: movie.id });
    };

    const handleBack = () => {
        setSelectedMovie(null);
        setSearchParams({});
    };

    useEffect(() => {
        const movieId = searchParams.get('movie');
        if (movieId) {
            const foundMovie = moviesFirebase.find(movie => movie.id === movieId);
            if (foundMovie) {
                setSelectedMovie(foundMovie);
            }
        } else {
            setSelectedMovie(null);
        }
    }, [moviesFirebase, searchParams]);    

    return (
        <div className='movie-container'>
            <h2>My Watchlist</h2>
            {selectedMovie ? (
                <MovieCard 
                movie={selectedMovie} 
                onBack={handleBack}
                movies={moviesFirebase}
                setMoviesFirebase = {setMoviesFirebase}
                />            
            ) : (
                <MovieList 
                    movies={moviesFirebase}
                    onMovieSelect={handleMovieSelect}
                    setMoviesFirebase = {setMoviesFirebase}
                />
            )}
        </div>
    )
}


// notes: .seconds -> represents the time in seconds since January 1, 1970 (Unix time).
// ?. is optional chaining. It checks if addeddAt exists before accessing .seconds. It prevents errors.