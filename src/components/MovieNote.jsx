import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const MovieNote = ({ movie, listType, userId }) => {
    const [note, setNote] = useState(movie.note || "");                         // Use existing note if available
    const [isSaved, setIsSaved] = useState(true);                               // Track if note is saved

    const handleChange = (e) => {
        setNote(e.target.value);                                                // value of the textarea input
        setIsSaved(false);                                                      // Mark as unsaved whenever user types
    };

    const handleSaveNote = async () => {
        try {
            const movieRef = doc(db, "users", userId, listType, movie.id);      // Reference to the movie document in Firestore
            await setDoc(movieRef, { note: note }, { merge: true });            // Update the 'note' field
            setIsSaved(true);                                                   // Mark as saved after updating Firebase
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <label htmlFor="movie-note">My Note:</label>
            <textarea
                id="movie-note"
                value={note}
                onChange={handleChange}
                placeholder="My thought on the movie..."
                rows="3"
                cols="30"
            />

            {/* if isSaved is true, the button will be disabled */}
            <button onClick={handleSaveNote} disabled={isSaved}>
                {isSaved ? "Saved" : "Save Note"}
            </button>
        </div>
    );
};

export default MovieNote;


// Note:
// When movie card is first ongamepadconnected, isSaaed is true, so the button will be disabled
// When user types, isSaved becomes false, and the button is enabled
// When user clicks the button, handleSaveNote is called, which updates the note in Firestore
// After updating Firestore, isSaved becomes true, and the button is disabled again