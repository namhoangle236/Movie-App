import React from 'react';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import {  collection, addDoc } from 'firebase/firestore';
import { useNavigate} from 'react-router-dom';

export default function MovieActionButton({ movie, listType}) {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.stopPropagation();             // Prevents clicking the <li>

        if (!currentUser) {
            navigate('login');
            return;
        }
    

        const image = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

        try {
            await addDoc(collection(db, "users", currentUser.uid, listType), {          // Firestore uses collections → documents → subcollections.
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