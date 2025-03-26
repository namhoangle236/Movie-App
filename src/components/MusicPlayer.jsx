import { useState, useRef } from "react";

const MusicPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(src));

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.volume = 0.1;
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button className="music-toggle" onClick={toggleMusic} aria-label="Toggle background music">
            {isPlaying ? "🔇" : "🎵"}
        </button>
    );
};

export default MusicPlayer;


// note:
// MusicPlayer takes in a src
// create an Audio object with the src
// toggleMusic function toggles between play and pause depending on the current state of isPlaying
// Also flip isPlaying state

// useRef is needed to persist the Audio object across re-renders, but don't re-render the audio itself