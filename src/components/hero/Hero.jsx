// import "./hero.scss";

// function Hero() {
//     return (
//         <section className="hero">
//             <div className="container hero__container">
//                 <h1 className="hero__container-title">THE POWER OF PERFORMANCE. ENGINEERED TO WIN.</h1>
//                 <p className="hero__container-text">Explore our full range of advanced automotive fluids.</p>
//                 <button className="hero__container-btn">VIEW PRODUCT PORTFOLIO</button>
//             </div>
//         </section>
//     );
// }

// export default Hero;

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./hero.scss";

import heroImg1 from "../../assets/images/hero/bannerOne.webp";
import heroImg2 from "../../assets/images/hero/bannerTwo.webp";
import heroImg3 from "../../assets/images/hero/bannerThree.webp";

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
    },
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
                            {/* <div className="container hero__container">
                                <h1 className="hero__container-title">{slide.title}</h1>
                                <p className="hero__container-text">{slide.text}</p>
                                <button className="hero__container-btn">VIEW PRODUCT PORTFOLIO</button>
                            </div> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Hero;