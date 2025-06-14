import React, { useEffect, useState } from 'react';
import './AutoSlider.css';

const slides = [
  { id: 1, image: '/banners/banner1.png' },
  { id: 2, image: '/banners/banner2.jpg' },
  { id: 3, image: '/banners/banner3.jpg' },
  { id: 4, image: '/banners/banner4.jpg' },
];

function AutoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Chuyển slide kế tiếp
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Chuyển slide trước đó
  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='container-auto-slider'>
      <div className="slider-container">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              <img src={slide.image} alt={`Slide ${slide.id}`} />
            </div>
          ))}
        </div>
        {/* Chấm tròn chỉ mục */}
        <div className="indicators">
          {slides.map((slide, index) => (
            <span
              key={slide.id}
              className={`indicator ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
        {/* Nút trái/phải */}
        <button className="nav-button left" onClick={goToPrev}>
          ❮
        </button>
        <button className="nav-button right" onClick={goToNext}>
          ❯
        </button>
      </div>
      <div className="static-banner">
        <img src="/banners/banner5.jpg" alt="banner" />
      </div>
    </div>
  );
}

export default AutoSlider;
