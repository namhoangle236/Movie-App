import React from 'react';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import {  collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate} from 'react-router-dom';

export default function MovieActionButton({ movie, listType}) {
    const { currentUser } = useAuth();
    const navigate = useNavigate();


    // Function to handle the button click, check if logged in, 
    // add movie to list, check if movie already exists, prevent duplicates
    const handleClick = async (e) => {
        e.stopPropagation();             // Prevents clicking the <li>

        if (!currentUser) {
            navigate('login');
            return;
        }


        // Reference to the list collection of current user
        const movieRef = collection(db, "users", currentUser.uid, listType); 
        // create a query 'q' to that reference, where the title is equal to the movie.title
        const q = query(movieRef, where("title", "==", movie.title));
    

        const image = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

        try {
            const querySnapshot = await getDocs(q); // send the query to see if the movie already exists

            // If the movie is found, prevent adding a duplicate
            if (!querySnapshot.empty) {
                alert(`"${movie.title}" is already in ${listType}!`);
                return;
            }

            await addDoc(movieRef, {          // Firestore uses collections → documents → subcollections.
                title: movie.title,
                image: image,
                overview: movie.overview,
                addedAt: new Date(),
            })
            alert(`Movie added to ${listType}!`);
        } catch (error) {
            console.error(`Error adding to ${listType}: ${error}`);
        }
    }

    return (
        <button className='add-btn' onClick={handleClick}>
            {listType === "watchlist" ? "Watchlist" : "Watched"}
        </button>
    )
}