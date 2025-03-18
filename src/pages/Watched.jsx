import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs} from "firebase/firestore";
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";


export default function Watched() {
    const { currentUser} = useAuth();
    const [moviesFirebase, setMoviesFirebase] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // We use useEffect in this case to fetch the user's watchlist from Firestore only when the currentUser changes.
    useEffect(() => {
        async function fetchWatchList() {
            if (!currentUser) return;

            // Fetch all movies from Firestore under the user's watchlist collection
            const querySnapshot = await getDocs(collection(db, "users", currentUser.uid, "watched"));

            // Convert Firestore documents into an array and update state
            // Firestore stores each movie as a document, and each document has an ID plus the data inside it.
            // To convert Firestore documents into an array of movies, we use:
            setMoviesFirebase(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()})));
        };

        fetchWatchList();
    }, [currentUser]);          // runs on first component load and every time currentUser changes

    return (
        <div className="movie-container">
            <h2>My Watched Movies</h2>
            {selectedMovie ? (
                <MovieCard 
                    movie={selectedMovie} 
                    onBack={() => setSelectedMovie(null)}
                    movies={moviesFirebase}
                    onMovieSelect={setSelectedMovie}
                    setMoviesFirebase = {setMoviesFirebase}
                />
            ) : (
                <MovieList 
                    movies={moviesFirebase}
                    onMovieSelect={setSelectedMovie}
                    setMoviesFirebase = {setMoviesFirebase}
                />
            )}
        </div>
    )
}