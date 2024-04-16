import React, { useState, useEffect } from 'react';
import './Carousel.css'
import Img1 from '../../assets/Carousel_Img/1.jpg'
import Img2 from '../../assets/Carousel_Img/2.jpg'
import Img3 from '../../assets/Carousel_Img/3.jpg'
import Img4 from '../../assets/Carousel_Img/4.jpg'
import Img5 from '../../assets/Carousel_Img/5.jpg'

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prevIndex => (prevIndex + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setSlideIndex(prevIndex => (prevIndex + 1) % 5);
  };

  const prevSlide = () => {
    setSlideIndex(prevIndex => (prevIndex === 0 ? 4 : prevIndex - 1));
  };

  const goToSlide = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="carousel-containerx">
      
      <div className="carousel-slidex" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
      <div className={`carousel-itemx`} style={{ backgroundImage: `url(${Img1})` }}></div>
        <div className={`carousel-itemx`} style={{ backgroundImage: `url(${Img2})` }}></div>
        <div className={`carousel-itemx`} style={{ backgroundImage: `url(${Img3})` }}></div>
        <div className={`carousel-itemx`} style={{ backgroundImage: `url(${Img4})` }}></div>
        <div className={`carousel-itemx`} style={{ backgroundImage: `url(${Img5})` }}></div>
   
       </div>
      <button className="carousel-btnx carousel-btn-leftx" onClick={prevSlide}>&#10094;</button>
      <button className="carousel-btnx carousel-btn-rightx" onClick={nextSlide}>&#10095;</button>
      <div className="carousel-dotsx">
        <span className={`dot ${slideIndex === 0 ? 'activex' : ''}`} onClick={() => goToSlide(0)}></span>
        <span className={`dot ${slideIndex === 1 ? 'activex' : ''}`} onClick={() => goToSlide(1)}></span>
        <span className={`dot ${slideIndex === 2 ? 'activex' : ''}`} onClick={() => goToSlide(2)}></span>
        <span className={`dot ${slideIndex === 3 ? 'activex' : ''}`} onClick={() => goToSlide(3)}></span>
        <span className={`dot ${slideIndex === 4 ? 'activex' : ''}`} onClick={() => goToSlide(4)}></span>
      </div>
     
    </div>
  );
};

export default Carousel;
