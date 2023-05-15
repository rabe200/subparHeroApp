import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import styled from "styled-components";
import Image from "next/image";
import "swiper/swiper-bundle.min.css";

const StyledSwiper = styled(Swiper)`
  display: block;
  position: fixed;
  top: 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  background: orange;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://akabab.github.io/superhero-api/api/all.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!data) {
    return <>loading</>;
  } else {
    return (
      <>
        {loading && <div>wait a second...</div>}
        {error && <div>(`problem in http: ${error}`)</div>}
        <Swiper
          enabled={true}
          id={"swiper"}
          loop={true}
          speed={300}
          modules={[Navigation, A11y]}
          spaceBetween={250}
          slidesPerView={1}
          navigation={true}
          onSlideChange={(event) => {
            console.log("slideChange", event);
          }}
          grabCursor={true}
          centeredSlides={true}
          // initialSlide={slug}
          lazyPreloadPrevNext={8}
        >
          {data.map((hero) => (
            <SwiperSlide key={hero.id} id={`swiperSlide${hero.id}`}>
              {/* {<p>1234</p>} */}
              <Image
                loading="eager"
                src={hero.images.md}
                alt={hero.name}
                width={300}
                height={527}
                onClick={() => console.log("click")}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* {data.map((hero) => (
          <Image
            src={hero.images.md}
            alt={hero.name}
            height={500}
            width={300}
          ></Image>
        ))} */}
      </>
    );
  }
}
