import React from "react";
import "./error.css";

const Errorpage = () => {
  return (
    <div className="error-content">
      <div className="content">
        <h1>ERROR 404 NOT FOUND</h1>
        <p>I'm sorry, the page you tried to reach is not found.</p>
        <img
          src="https://media.tenor.com/hmoSrzzvK7UAAAAC/thanos-snap.gif"
          alt="Funny GIF"
        />
      </div>
    </div>
  );
};

export default Errorpage;