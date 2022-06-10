import React, { useState } from "react";
import "./Carrossel.css";
import { ICarrosselProps } from "./props";
import { FontIcon, initializeIcons, Link, Text } from "@fluentui/react";

export const Carrossel = (props: ICarrosselProps) => {
  initializeIcons();
  const [current, setCurrent] = useState(0);
  const length = props.items.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (props.items.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <div className="left-arrow" onClick={prevSlide}>
        <FontIcon iconName="ChevronLeftMed" />
      </div>
      <div className="right-arrow" onClick={nextSlide}>
        <FontIcon iconName="ChevronRightMed" />
      </div>
      {props.items.map((slide, i) => {
        return (
          <div className={i === current ? "slide active" : "slide"}>
            {i === current && (
              <>
                <div className="info">
                  <Text className="title">{slide.title}</Text>
                  <Link className="link" href={slide.link} target="_blank">Saiba mais...</Link>
                </div>
                <img className="image" src={slide.img} alt="Slide" />
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};
