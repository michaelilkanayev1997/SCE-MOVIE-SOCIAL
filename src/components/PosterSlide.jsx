import { Box } from "@mui/material";
import tmdbConfigs from "../api/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";

const PosterSlide = ({ posters }) => {
  return (
    <Swiper grabCursor={true} spaceBetween={0} slidesPerView={5}>
      {[...posters].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "160%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.w500Image(item.file_path)})`,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PosterSlide;
