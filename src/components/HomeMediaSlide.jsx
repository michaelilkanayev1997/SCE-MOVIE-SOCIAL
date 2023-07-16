import React, { useState, useEffect } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { getMediaList } from "../api/axiosClient";
import MovieCard from "./MovieCard";
import "../scss/movie-slide.scss";

const HomeMediaSlide = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      window.scrollTo(0, 0);
      const res = await getMediaList(props.type, props.MediaName);

      setItems(res);
    };
    getMovies();
  }, [props.type, props.MediaName]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={6}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} MediaType={props.type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeMediaSlide;
