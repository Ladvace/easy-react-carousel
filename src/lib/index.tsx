import React, { useState, useEffect, useRef } from "react";
import ContentLoader from "react-content-loader";
import { styled, setup } from "goober";
import Arrow from "./Arrow";

setup(React.createElement);

interface slideProps {
  image: string;
  title: string;
  description: string;
  url?: string;
}

interface sliderProps {
  currentImageIndex: number;
  slides: slideProps[];
  disableRedirect?: boolean;
  alignment?: string;
  onClick: any;
}

interface selectNewsProps {
  slides: slideProps[];
  height?: number;
  onChange?: any;
  setCurrentImageIndex: any;
  currentImageIndex: number;
}

interface carouselProps {
  style?: any;
  slides: slideProps[];
  speed?: number;
  rtl?: boolean;
  disableAutoRotation?: boolean;
  showArrows?: boolean;
  showSelectMenu?: boolean;
  disableRedirect?: boolean;
  borderRadius?: number;
  height?: number;
  // width,
  alignment?: string;
  onChange?: any;
  onClick?: any;
}

type CarouselStyleProps = {
  height?: number;
  borderRadius?: number;
  style: any;
};

type SliderStyleProps = {
  currentImageIndex?: number;
};

type SelecttyleProps = {
  height?: number;
};

type TitleProps = {
  alignment?: string;
};

const Carousel = styled("div")<CarouselStyleProps>`
  width: 100%;
  position: relative;
  height: ${({ height }) => (height ? `${height}px` : "180px")};
  overflow: hidden;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : "4px"};
  cursor: pointer;
  display: inline-block;
`;

const Slider = styled("ul")<SliderStyleProps>`
  display: flex;
  position: relative;
  border-radius: 4px;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transform: translate3d(
    ${({ currentImageIndex }) => `${-100 * (currentImageIndex || 0)}%`},
    0,
    0
  );
  transition: transform 0.3s ease-in-out;
`;

const ImageSlide = styled("img")`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  background-position: center;
  background-size: cover;
  transition: transform 0.2s ease-in-out;
  z-index: -1;
`;

const Slide = styled("li")`
  display: inline-block;
  position: relative;
  top: 0;
  width: 100%;
  min-width: 100%;
  border-radius: 2px;
  z-index: 0;
  &:hover ${ImageSlide} {
    transform: scale(1.02);
  }
`;

const Gradient = styled("div")`
  position: absolute;
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

const Select = styled("div")<SelecttyleProps>`
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

const SelectElement = styled("div")<SliderStyleProps>`
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

  &:nth-child(${({ currentImageIndex }) => currentImageIndex}) {
    margin: 0 2px 0 2px;
    flex-grow: 2;
    background: #b7c5c8;
    opacity: 1;
    vertical-align: middle;
  }
`;

const InfoContainer = styled("div")`
  position: absolute;
  bottom: 40px;
  left: 15px;
  z-index: 2;
`;

const Title = styled("h1")<TitleProps>`
  color: #e1e2e4;
  margin: 0 0 10px 0;
  line-height: 1;
  z-index: 2;
  text-align: ${({ alignment }) => alignment};
`;

const SubTitle = styled("p")<TitleProps>`
  margin: 0;
  color: #e1e2e4;
  z-index: 2;
  text-align: ${({ alignment }) => alignment};
`;

const uuid4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0;
    let v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const rotate = (
  rotation: string,
  currentImageIndex: number,
  slides: slideProps[],
  setCurrentImageIndex: any
) => {
  const rtl = rotation === "right";

  const isNotLastElement = rtl
    ? currentImageIndex < slides.length - 1
    : currentImageIndex > 0;

  if (isNotLastElement) {
    if (rtl) setCurrentImageIndex(currentImageIndex + 1);
    else setCurrentImageIndex(currentImageIndex - 1);
  } else setCurrentImageIndex(rtl ? 0 : slides.length - 1);
};

const openNews = (e: React.MouseEvent<HTMLElement>, inf: slideProps) => {
  e.preventDefault();
  if (inf.url) window.open(inf.url, "_blank");
};

const ImageList: React.FC<sliderProps> = ({
  currentImageIndex,
  slides,
  disableRedirect,
  alignment,
  onClick,
}) => {
  const listImages = slides.map((inf) => {
    return (
      <Slide
        key={uuid4()}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
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
        <ImageSlide src={inf.image} loading="lazy" alt="" />
      </Slide>
    );
  });

  return <Slider currentImageIndex={currentImageIndex}>{listImages}</Slider>;
};

const SelectNews: React.FC<selectNewsProps> = ({
  slides,
  height,
  onChange,
  setCurrentImageIndex,
  currentImageIndex,
}) => {
  const selectElementList = slides.map((_, i) => (
    <SelectElement
      key={uuid4()}
      onClick={() => {
        setCurrentImageIndex(i);
        if (onChange) onChange(currentImageIndex, i);
      }}
      currentImageIndex={currentImageIndex + 1}
    />
  ));

  return <Select height={height}>{selectElementList}</Select>;
};

const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef<any>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const CarouselComponent: React.FC<carouselProps> = ({
  style,
  slides,
  speed = 5000,
  rtl = true,
  disableAutoRotation,
  showArrows,
  showSelectMenu = true,
  disableRedirect = false,
  borderRadius,
  height,
  // width,
  alignment = "left",
  onChange,
  onClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    rtl ? 0 : slides.length - 1
  );

  useInterval(() => {
    if (!disableAutoRotation) {
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
    }
  }, speed);

  return slides.length !== 0 ? (
    <Carousel height={height} borderRadius={borderRadius} style={style}>
      {showArrows && (
        <>
          <Arrow
            onClick={() => {
              rotate("left", currentImageIndex, slides, setCurrentImageIndex);
            }}
            style={{
              position: "absolute",
              color: "white",
              width: 50,
              top: "50%",
              transform: "translateY(-50%)",
              left: 50,
              zIndex: 3,
            }}
          />
          <Arrow
            onClick={() => {
              rotate("right", currentImageIndex, slides, setCurrentImageIndex);
            }}
            right
            style={{
              position: "absolute",
              color: "white",
              width: 50,
              top: "50%",
              transform: "translateY(-50%)",
              right: 50,
              zIndex: 3,
            }}
          />
        </>
      )}
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
      // title={false}
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
};

export default CarouselComponent;
