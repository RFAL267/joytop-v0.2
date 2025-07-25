import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "../css/components/listing.slider.css"; // для кастомизации

const ListingSlider = ({ images = [], direction = "horizontal" }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="listing_slider">
      {/* Главный слайдер */}
      <Swiper
        spaceBetween={10}
        navigation
        modules={[Thumbs, Navigation]}
        thumbs={{ swiper: thumbsSwiper }}
        className="main_slider"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`Slide ${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Слайдер миниатюр */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={Math.min(images.length, 8)}
        freeMode
        watchSlidesProgress
        direction={direction}
        modules={[Thumbs]}
        className="thumbs_slider"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`Thumb ${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ListingSlider;
