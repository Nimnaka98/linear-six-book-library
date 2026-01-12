import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/assets/carousel/home-2-revolution-img-5.png',
      background: 'linear-gradient(135deg, #fef9e7 0%, #f8f6f0 100%)',
      layout: 'left',
      subtitle: 'Literary Excellence',
      title: 'We Love Literature',
      description: 'Discover the finest collection of books that inspire, educate, and transform minds. Join thousands of readers in their literary journey.',
      textColor: '#4a3c54'
    },
    {
      id: 2,
      backgroundImage: '/assets/carousel/background.webp',
      background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
      layout: 'center',
      subtitle: 'Knowledge Hub',
      title: 'Expand Your Mind',
      description: 'Explore diverse genres and discover new perspectives through our carefully curated book collection.',
      textColor: '#ffffff',
      hideButton: true
    },
    {
      id: 3,
      image: 'https://skyryedesign.com/wp-content/uploads/2016/04/56c6f9b7efad5-cover-books-design-illustrations.jpg',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      layout: 'right',
      subtitle: 'Reading Revolution',
      title: 'Transform Through Books',
      description: 'Experience the power of reading with our premium collection of bestsellers and timeless classics.',
      textColor: '#ffffff'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''} layout-${slide.layout}`}
            style={{ 
              background: slide.backgroundImage 
                ? `${slide.background}, url(${slide.backgroundImage}) center/cover no-repeat`
                : slide.background 
            }}
          >
            <div className="container">
              <div className="slide-content">
                <div className="slide-text" style={{ color: slide.textColor }}>
                  <span className="slide-subtitle">{slide.subtitle}</span>
                  <h1 className="slide-title">{slide.title}</h1>
                  <p className="slide-description">{slide.description}</p>
                  {!slide.hideButton && (
                    <button className="read-more-btn">Read More</button>
                  )}
                </div>
                {slide.image && (
                  <div className="slide-image">
                    <img src={slide.image} alt={slide.title} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}}
      </div>
      
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;