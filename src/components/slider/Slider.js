import React, { useState } from "react";
import { sliderData } from "./Slider-data";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import './Slider.scss'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length
  
  // const autoScroll = false
  // let slideInterval;
  // let intervalTime = 5000

  const handleNext = () => {
    setCurrentSlide((prev) => {
      return  prev === sliderData.length - 1 ? 0 : prev + 1
    })
  }
  const handlePrev = () => {
    setCurrentSlide((prev) => {
      return  prev === 0 ? slideLength - 1 : prev - 1
    })
  }
 


  // useEffect(() => {
  //   //setCurrentSlide(0)
  //      if(autoScroll){
  //       const auto = () => {
  //           slideInterval = setInterval(handleNext , intervalTime)
  //        }
  //        auto()
  //      }
  //      return () => {
  //       clearInterval(slideInterval)
  //      }
  // },[currentSlide , autoScroll , slideInterval])




  return (
    <div className="slider">
      <AiOutlineArrowLeft  className="arrow prev" onClick={handlePrev}/>
      <AiOutlineArrowRight className="arrow next" onClick={handleNext} />
      {sliderData.map((slide, index) => (
        <div
          className={index === currentSlide ? "slide current" : "slide"}
          key={index}
        >
          {index === currentSlide && (
            <>
              <img style={{objectFit:'cover'}} src={slide.image} alt="slide" />
              <div className="content">
                <h2>{slide.heading}</h2>
                <p>{slide.desc}</p>
                <a href="#product" className="--btn --btn-primary">Show Now</a>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
