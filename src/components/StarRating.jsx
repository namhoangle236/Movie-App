import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const StarRating = ({ movie, listType, userId }) => {
    const [rating, setRating] = useState(movie.rating || 0);    // If movie.rating exists in user db, use it, otherwise use 0

    const handleRatingChange = async (e) => {
        e.stopPropagation();                                    // Prevents triggering click events of parent elements
        const newRating = Number(e.target.value);               // convert value gotten from event from slider to number type
        setRating(newRating);

        try {
            const movieRef = doc(db, "users", userId, listType, movie.id);
            await setDoc(movieRef, { rating: newRating }, { merge: true });
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.5" 
                value={rating} 
                onChange={handleRatingChange}
            />
            <span>{rating} ★</span>
        </div>
    );
};

export default StarRating;


// -----------  How this works: ---------------
//
// When a new movie is added to the watchedList,
// If movie.rating is undefined, it defaults to 0 
// When the user moves the slider, onChange event fires, trigger handleRatingChange
//
// handleRatingChange extracts the new rating from the slider via newRating = e.target.value, and converts it into a number
// setRating updates the rating state with newRating
//
// updateDoc with new rating
// { merge: true } ensures only the rating field is modified
//
// Next time the component renders, movie.rating now exists in Firestore
// useState(movie.rating || 0) uses the rating from Firestore,
// <span>{rating} ★</span> displays the saved rating.