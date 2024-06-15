import React, { useState, useEffect } from 'react';
import { Img, Text } from 'components';
import './Slideshow.css';

const SlideshowComponent = () => {
  const images = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <Img
          key={index}
          className={`slideshow-image ${index === currentImageIndex ? "active" : ""}`}
          src={image}
          alt={`slide-${index}`}
        />
      ))}

      <div className="slideshow-text-container">
        <div className="slideshow-text-left">
          <Text className="text-white-A700 text-xl" size="txtPoppinsRegular20">
            <>I&#39;m lovin&#39; it!</>
          </Text>
          <Text className="slideshow-title" size="txtPoppinsSemiBold54">
            LEON’S KITCHEN GALLE
          </Text>
        </div>
        <Text className="slideshow-delivery-time" size="txtPoppinsSemiBold18">
          Delivery in 20-25 Minutes
        </Text>
        <Text className="slideshow-min-order" size="txtPoppinsSemiBold18">
          Minimum Order: Rs.1000
        </Text>
        <div className="slideshow-icon order-completed">
          <Img
            className="slideshow-icon-image"
            src="images/img_ordercompleted.png"
            alt="ordercompleted"
          />
        </div>
        <div className="slideshow-icon motocross">
          <Img
            className="slideshow-icon-image"
            src="images/img_motocross.png"
            alt="motocross"
          />
        </div>
      </div>
    </div>
  );
};

export default SlideshowComponent;
