import React from "react";
import { Box } from "@mui/material";
import slider1 from "../../assets/slider 1.webp"
import slider2 from "../../assets/silder 2.jpg"
import slider3 from "../../assets/slider 3.jpeg"
import slider4 from "../../assets/slider4.jpg"
import slider5 from "../../assets/slider5.webp"
import slider6 from "../../assets/slider 6.jpeg"
import slider7 from "../../assets/slider 7.webp"
import slider8 from "../../assets/slider 8.jpeg"
import slider9 from "../../assets/slider 9.jpg"
import slider10 from "../../assets/slider 10.webp"
const totalItems = 10;
const animationDuration = 30;

// 🖼️ Replace with your actual image URLs
const images = [
  slider1,
  slider2,
  slider3,
  slider4,
  slider5,
  slider6,
  slider7,
  slider8,
  slider9,
  slider10,


];

const AutoScrollSlider = () => {
  return (
    <Box
      className="wrapper"
      sx={{
        width: "90%",
        maxWidth: "1536px",
        marginInline: "auto",
        position: "relative",
        height: "100px",
        marginTop: "5rem",
        marginBottom: "5rem",
        overflow: "hidden",
        maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0))",
        WebkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 0))",
      }}
    >
      {images.map((src, i) => (
      <Box
  key={i}
  className={`item item${i + 1}`}
  sx={{
    width: "200px",
    height: "100px",
    marginRight: "20px", // spacing between cards
    position: "absolute",
    left: `max(calc((200px + 20px) * ${totalItems}), 100%)`,
    animation: `scrollLeft ${animationDuration}s linear infinite`,
    animationDelay: `calc(${animationDuration}s / ${totalItems} * (${totalItems} - ${i}) * -1)`,
    borderRadius: "6px",
    overflow: "hidden",
  }}
>
          <img
            src={src}
            alt={`dish-${i + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      ))}

      {/* Scroll animation keyframes */}
      <style>
        {`
          @keyframes scrollLeft {
            to {
              left: -200px;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default AutoScrollSlider;
