import React, { useState, useEffect, useRef } from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const Carousel = styled.div`
  width: 1000px;
  height: ${({ height }) => (height ? `${height}px` : "180px")};
  overflow: hidden;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : "4px"};
  cursor: pointer;
  display: inline-block;
`;

const ImageSlider = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  object-fit: stretch;
  object-position: center;
  overflow: hidden;
  border-radius: 4px;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  margin: 0 auto 0 auto;
  width: ${({ slidesCount }) => `${slidesCount * 100}%`};
  height: 100%;
  z-index: 0;
  transform: translate(${({ currentImageIndex }) => `${currentImageIndex}px`});
  transition: transform 0.3s ease-in-out;
`;

const ImageSlide = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background-image: url("${(props) => (props.image ? props.image : null)}");
  background-position: center;
  background-size: cover;
  transition: transform 0.2s ease-in-out;
  z-index: -1;
`;

const Slide = styled.div`
  display: inline-block;
  position: relative;
  top: 0;
  width: 100%;
  border-radius: 2px;
  z-index: 0;
  &:hover ${ImageSlide} {
    transform: scale(1.06);
  }
`;

const Gradient = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(165, 165, 165, 0) 80%
  );
  opacity: 0.99;
  z-index: 1;
  &&:hover {
  }
`;

const Select = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  top: ${({ height }) => (height ? `${height - 20}px` : "160px")};
  left: 50%;
  margin-left: -100px;
  padding: 0;
  width: 200px;
  height: 5px;
  z-index: 2;
`;

const SelectElement = styled.div`
  width: 16px;
  height: 5px;
  flex: 1;
  margin: 0 2px 0 2px;
  cursor: pointer;
  background: #b7c5c8;
  opacity: 0.6;
  transition: flex-grow 0.2s ease-in-out;
  border-radius: 2px;
  &:hover {
    margin: 0 2px 0 2px;
    flex-grow: 2;
    background: #b7c5c8;
    opacity: 0.79;
    vertical-align: middle;
  }
  &:active {
    margin: 0 2px 0 2px;
    flex-grow: 2;
    background: #b7c5c8;
    opacity: 1;
    vertical-align: middle;
  }

  &:nth-child(${(props) => props.currentImageIndex}) {
    margin: 0 2px 0 2px;
    flex-grow: 2;
    background: #b7c5c8;
    opacity: 1;
    vertical-align: middle;
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 15px;
  z-index: 2;
`;

const Title = styled.h1`
  color: #e1e2e4;
  margin: 0 0 10px 0;
  line-height: 1;
  z-index: 2;
  text-align: ${({ alignment }) => alignment};
`;

const SubTitle = styled.p`
  margin: 0;
  color: #e1e2e4;
  z-index: 2;
  text-align: ${({ alignment }) => alignment};
`;

function openNews(e, inf) {
  e.preventDefault();
  if (inf.url) window.open(inf.url, "_blank");
}

function ImageList({
  currentImageIndex,
  slides,
  disableRedirect,
  alignment,
  onClick,
}) {
  const listImages = slides.map((inf) => {
    return (
      <Slide
        key={inf.id}
        onClick={(e) => {
          if (onClick) onClick(inf);
          !disableRedirect && openNews(e, inf);
        }}
      >
        <InfoContainer>
          <Title alignment={alignment}>{inf.title}</Title>
          <SubTitle alignment={alignment}>
            {inf.description.substring(0, 120) + "..."}
          </SubTitle>
        </InfoContainer>
        <Gradient />
        <ImageSlide image={inf.image} />
      </Slide>
    );
  });

  return (
    <ImageSlider
      slidesCount={slides.length}
      currentImageIndex={-1000 * currentImageIndex}
    >
      {listImages}
    </ImageSlider>
  );
}

function SelectNews(props) {
  const { slides, height, onChange } = props;
  const { setCurrentImageIndex } = props;
  const selectElementList = slides.map((inf, i) => (
    <SelectElement
      key={inf.id}
      onClick={() => {
        setCurrentImageIndex(i);
        if (onChange) onChange(props.currentImageIndex, i);
      }}
      currentImageIndex={props.currentImageIndex + 1}
    />
  ));

  return <Select height={height}>{selectElementList}</Select>;
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function CarouselComponent({
  style,
  slides,
  speed = 5000,
  rtl = true,
  showSelectMenu = true,
  disableRedirect = false,
  borderRadius,
  height,
  // width,
  alignment = "left",
  onChange,
  onClick,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    rtl ? 0 : slides.length - 1
  );

  useInterval(() => {
    const isNotLastElement = rtl
      ? currentImageIndex < slides.length - 1
      : currentImageIndex > 0;

    if (isNotLastElement) {
      if (rtl) setCurrentImageIndex(currentImageIndex + 1);
      else setCurrentImageIndex(currentImageIndex - 1);
      if (onChange)
        onChange(
          currentImageIndex,
          rtl ? currentImageIndex + 1 : currentImageIndex - 1
        );
    } else setCurrentImageIndex(rtl ? 0 : slides.length - 1);
  }, speed);

  return slides.length !== 0 ? (
    <Carousel height={height} borderRadius={borderRadius} style={style}>
      {showSelectMenu && (
        <SelectNews
          height={height}
          slides={slides}
          onChange={onChange}
          setCurrentImageIndex={setCurrentImageIndex}
          currentImageIndex={currentImageIndex}
        />
      )}
      <ImageList
        onClick={onClick}
        alignment={alignment}
        disableRedirect={disableRedirect}
        slides={slides}
        currentImageIndex={currentImageIndex}
      />
    </Carousel>
  ) : (
    <ContentLoader
      speed={2}
      width={1000}
      height={180}
      viewBox="0 0 1000 180"
      foregroundColor="#050818"
      backgroundColor="#121929"
      title={false}
    >
      <rect width="20" height="180" />
      <rect x="980" width="20" height="180" />
      <rect
        x="490"
        y="-490"
        transform="matrix(-1.836970e-16 1 -1 -1.836970e-16 510 -490)"
        width="20"
        height="1000"
      />
      <rect
        x="490"
        y="-330"
        transform="matrix(-1.836970e-16 1 -1 -1.836970e-16 670 -330)"
        width="20"
        height="1000"
      />

      <rect x="40.5" y="100" width="304" height="14.4" />
      <rect x="40.5" y="125.6" width="304" height="14.4" />
    </ContentLoader>
  );
}

export default CarouselComponent;
