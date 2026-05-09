import React from "react";
import slide1 from "../images/console 2.png";
import slide2 from "../images/console.webp";
import slide3 from "../images/p1.jpeg";
import slide4 from "../images/p4.jpg";

const CarouselComponent = () => {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">

        <div className="carousel-item active">
          <img
            src={slide1}
            className="d-block w-100"
            alt="slide1"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>

        <div className="carousel-item">
          <img
            src={slide2}
            className="d-block w-100"
            alt="slide2"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>

        <div className="carousel-item">
          <img
            src={slide3}
            className="d-block w-100"
            alt="slide3"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>

        <div className="carousel-item">
          <img
            src={slide4}
            className="d-block w-100"
            alt="slide4"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>

      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default CarouselComponent;