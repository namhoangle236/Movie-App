import React from "react";

const TVDisplay = () => {
  return (
    <div className="tv-container">
        <img src="/Television.png" alt="Overlay Image" className="image-overlay" />
        <video autoPlay muted loop className="tv-video">
            <source src="/ChangeChannel.mp4" type="video/mp4" />
        </video>

        {/* <div className="tv-textBox">
            <h1>Movie Search</h1>
            <p>Search for your movie here</p>
        </div> */}
    </div>
  );
};

export default TVDisplay;
