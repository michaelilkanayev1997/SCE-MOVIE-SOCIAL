import React, { useState, useEffect, useRef } from "react";
import { getVideo } from "../api/axiosClient";
import { A11y, Keyboard, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const VideoSlide = (props) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await getVideo(props.type, props.id);
      setVideos(res.slice(0, 5));
    };
    getVideos();
  }, [props.id, props.type]);

  return (
    <>
      <Swiper
        modules={[Keyboard, Pagination, Navigation, A11y]}
        navigation={true}
        pagination={{ clickable: true }}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        keyboard={{
          enabled: true,
        }}
        style={{
          "--swiper-pagination-color": "#FFBA08",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-size": "10px",
        }}
      >
        {videos.map((item, i) => (
          <SwiperSlide key={i}>
            <Video key={i} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

const Video = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div
      className="video"
      style={{ padding: "40px", paddingTop: "0", paddingBottom: "0%" }}
    >
      <div className="video__title"></div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoSlide;
