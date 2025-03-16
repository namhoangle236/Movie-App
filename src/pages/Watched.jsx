import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, deleteDoc, doc, addDoc, query, where } from "firebase/firestore";
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";
import StarRating from "../components/StarRating";


export default function Watched() {
    const { currentUser} = useAuth();
    const [movies, setMovies] = useState([]);
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
            setMovies(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()})));
        };

        fetchWatchList();
    }, [currentUser]);          // runs on first component load and every time currentUser changes

    const removeMovie = async (movieId) => {
        try {

            // Delete the movie from Firestore
            await deleteDoc(doc(db, "users", currentUser.uid, "watched", movieId));

            // Update state by removing the deleted movie from the UI
                //This creates a new array that excludes the movie we just deleted.
                //It keeps all movies except the one with id === movieId.
            setMovies(movies.filter(movie => movie.id !== movieId));
        } catch (error) {
            console.error('Error deleting movie from the list', error);
        }
    }

    const moveToWatchlist = async (movie) => {
        // Query Firestore to check if the movie already exists in the "watchlist"
        const watchlistCollection = collection(db, "users", currentUser.uid, "watchlist");          //This targets the specific collection in Firestore where the user's watched movies are stored.
        const q = query(watchlistCollection, where("title", "==", movie.title));                    //query() is used to search Firestore.
        const querySnapshot = await getDocs(q);                                                         //getDocs(q) runs the query and returns documents that match the query

        if (!querySnapshot.empty) {
            alert("This movie is already in your Watchlist!");
            return;
        }

        // Add the movie to the "watchlist" and mark as "rewatching"
        try {
            await addDoc(collection(db, "users", currentUser.uid, "watchlist"), {
            title: movie.title,
            image: movie.image,
            overview: movie.overview,
            addedAt: new Date(),
            rewatching: true, // Mark as rewatching
            });

            alert("Movie added to the watchlist!")
        } catch(error) {
            console.error("Error moving to watchlist", error);
        }

    };

    return (
        <>
            <h1>My Watched Movies</h1>
            {selectedMovie ? (
                <MovieCard movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
            ) : (
                <MovieList 
                    movies={movies}
                    onMovieSelect={setSelectedMovie}
                    actionButtons={(movie) => (
                        <>
                            <button onClick={ (e) => {e.stopPropagation(); moveToWatchlist(movie)}}>
                               Watchlist
                            </button>
                            <button onClick={ (e) => {e.stopPropagation(); removeMovie(movie.id)}}>
                                Remove
                            </button>
                            
                            {/* Star Rating Component */}
                            <StarRating movie={movie} listType="watched" userId={currentUser.uid} />
     
                        </>
                    )}
                />
            )}
        </>
    )
}