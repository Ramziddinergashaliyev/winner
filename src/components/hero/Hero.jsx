import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import heroImg1 from "../../assets/images/hero/bannerOne.webp";
import heroImg2 from "../../assets/images/hero/bannerTwo.webp";
import heroImg3 from "../../assets/images/hero/bannerThree.webp";

import "./hero.scss";

const slides = [
    {
        image: heroImg1,
        title: "THE POWER OF PERFORMANCE. ENGINEERED TO WIN.",
        text: "Explore our full range of advanced automotive fluids.",
    },
    {
        image: heroImg2,
        title: "BUILT FOR EXTREME CONDITIONS.",
        text: "Premium lubricants trusted by professionals worldwide.",
    },
    {
        image: heroImg3,
        title: "INNOVATION IN EVERY DROP.",
        text: "Advanced formulas designed to protect your engine.",
    }
];

function Hero() {
    return (
        <section className="hero">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                speed={1000}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="hero__swiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="hero__slide"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Hero;