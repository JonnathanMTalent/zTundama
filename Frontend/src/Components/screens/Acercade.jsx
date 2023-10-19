// import React from "react";

function Acercade() {
  return (
    <div>
      <center>
        <h2> Acerca de nosotros</h2>
      </center>
      <hr />
      <hr />
      <hr />
      <hr />
      <div>
        <iframe
          id="video1"
          src="https://www.youtube.com/embed/Rhy4UmunRNQ"
          //   width="560"
          height="500"
          width="100%"
          frameBorder="0"
          allowFullScreen="allowfullscreen"
        ></iframe>
      </div>
      <center>
        <button
          className="volver btn-block"
          style={{ color: "black", backgroundColor: "rgb(13, 97, 97)" }}
          onClick={() => window.history.back()}
        >
          Volver
        </button>
      </center>
    </div>
  );
}

export default Acercade;
