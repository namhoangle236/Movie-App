import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useSearchParams } from 'react-router-dom';
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";


export default function Watchlist() {
    const { currentUser} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [moviesFirebase, setMoviesFirebase] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);



    // Get the user's current watchlist from Firestore
    useEffect(() => {
        if (!currentUser) return;
    
        const watchlistRef = collection(db, "users", currentUser.uid, "watchlist");             // Reference to the user’s watchlist collection
    
        const unsubscribe = onSnapshot(watchlistRef, (snapshot) => {                            // firestore function, listens to the watchlist collection, gets a live snapshot of the collection. AND store the stop listening function in 'unsubscribe' const
            setMoviesFirebase(
                snapshot.docs                                                                   // snapshot.docs is an array of all documents in the collection (movies in this case)
                    .map(doc => ({ id: doc.id, ...doc.data() }))                                // for doc in docs, return an object with id and data (movie details, added rating, notes, etc...)
                    .sort((a, b) => b.addedAt?.seconds - a.addedAt?.seconds)                    // sort the movies by the time they were added
            );
        });
        
        // note: this return does not run when the component mounts,
        // it runs when the component unmounts ONLY!
        // useEffect has 2 main parts, and part 1 has 2 smaller parts
        // 1. The first part is the function that runs when the component mounts
        // 2. The second part is the function that runs when the component unmounts

        return () => unsubscribe();                                                             // This 'return' only runs when the component unmounts, calling a anonymous function that calls the 'unsubscribe', which holds the stop listening function, returned by onSnapshot
    }, [currentUser]);




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


// notes:
// .seconds -> represents the time in seconds since January 1, 1970 (Unix time).
// ?. is optional chaining. It checks if addeddAt exists before accessing .seconds. It prevents errors.




// The onSnapshot is confusing as hell! but it just behave different when calling onSnapshot directly vs calling what it returns
// and in this case, what onSnapshot returns is assigned to 'unsubscribe' const. So calling unsubscribe() will do different thing





// example of a function similar to onSnapshot:

// A function that returns another function
// function createFunction() {
//     // This is the function that will be returned
//     const innerFunction = () => {
//       console.log("I am the inner function, called through the variable!");
//     };
  
//     // This function is also available when called directly
//     console.log("I am the outer function, called directly!");
  
//     // Returning the inner function
//     return innerFunction;
//   }
  
//   // Calling the outer function directly
//   createFunction();  // This will log: "I am the outer function, called directly!"
  
//   // Assigning the returned function to a variable
//   const myFunction = createFunction();  // This will log: "I am the outer function, called directly!"
  
//   // Now calling the variable holding the returned function
//   myFunction();



// Ana's notes

// const unsubscribe = onSnapshot(watchlistRef, (snapshot) => {
// This sets up a real-time listener to the watchlistRef. Firestore will now keep watching the watchlist for any live changes.
// The onSnapshot function:
// - Listens for changes
// - Calls the callback function (the one inside (snapshot) => {}) every time the data changes
