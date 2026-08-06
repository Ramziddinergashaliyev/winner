// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import heroImg1 from "../../assets/images/hero/bannerOne.webp";
// import heroImg2 from "../../assets/images/hero/bannerTwo.webp";
// import heroImg3 from "../../assets/images/hero/bannerThree.webp";

// import "./hero.scss";
// import { useTranslation } from "react-i18next";

// const slidesRu = [
//     {
//         image: heroImg1,
//         title: "МОТОРНОЕ МАСЛО КАЖДАЯ ПОЕЗДКА - КАЖДАЯ ПОБЕДА",
//         text: "Ознакомьтесь с полным ассортиментом наших передовых автомобильных жидкостей.",
//     },
//     {
//         image: heroImg2,
//         title: "ТРАНСМИССИОННАЯ ЖИДКОСТЬ ПЕРЕКЛЮЧАЙТЕСЬ С УВЕРЕННОСТЬЮ",
//         text: "Премиальные смазочные материалы, которым доверяют профессионалы по всему миру.",
//     },
//     {
//         image: heroImg3,
//         title: "МАСЛО ДЛЯ ДИЗЕЛЬНЫХ ДВИГАТЕЛЕЙ МОЩНОСТЬ ДЛЯ ЛЮБОЙ НАГРУЗКИ",
//         text: "Передовые формулы, разработанные для защиты вашего двигателя.",
//     }
// ];

// const slidesEn = [
//     {
//         image: heroImg1,
//         title: "MOTOR OIL EVERY DRIVE EVERY VICTORY",
//         text: "Explore our full range of advanced automotive fluids.",
//     },
//     {
//         image: heroImg2,
//         title: "TRANSMISSION FLUID SHIFT WITH CONFIDENCE",
//         text: "Premium lubricants trusted by professionals worldwide.",
//     },
//     {
//         image: heroImg3,
//         title: "DIESEL ENGINE OIL POWER FOR EVERY LOAD",
//         text: "Advanced formulas designed to protect your engine.",
//     }
// ];

// function Hero() {
//     const { t, i18n } = useTranslation()
//     console.log(i18n?.languages);


//     const SLIDESDATA = i18n?.languages?.[0] === "ru" ? slidesRu : slidesEn


//     return (
//         <section className="hero">
//             <Swiper
//                 modules={[Autoplay, Pagination, Navigation]}
//                 speed={1000}
//                 loop={true}
//                 autoplay={{
//                     delay: 4000,
//                     disableOnInteraction: false,
//                 }}
//                 pagination={{ clickable: true }}
//                 className="hero__swiper"
//             >
//                 {SLIDESDATA?.map((slide, index) => (
//                     <SwiperSlide key={index}>

//                         <div
//                             className="hero__slide"
//                             style={{ backgroundImage: `url(${slide.image})` }}
//                         >
//                             <div className="hero__slide-info container">
//                                 <h3 className="hero__slide-info-text"><i>{slide.title}</i></h3>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </section>
//     );
// }

// export default Hero;


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import heroImg1 from "../../assets/images/hero/bannerOne.webp";
import heroImg2 from "../../assets/images/hero/bannerTwo.webp";
import heroImg3 from "../../assets/images/hero/bannerThree.webp";

import "./hero.scss";
import { useTranslation } from "react-i18next";

const slidesRu = [
    {
        image: heroImg1,
        title: "МОТОРНОЕ МАСЛО КАЖДАЯ ПОЕЗДКА - КАЖДАЯ ПОБЕДА",
        text: "Ознакомьтесь с полным ассортиментом наших передовых автомобильных жидкостей.",
    },
    {
        image: heroImg2,
        title: "ТРАНСМИССИОННАЯ ЖИДКОСТЬ ПЕРЕКЛЮЧАЙТЕСЬ С УВЕРЕННОСТЬЮ",
        text: "Премиальные смазочные материалы, которым доверяют профессионалы по всему миру.",
    },
    {
        image: heroImg3,
        title: "МАСЛО ДЛЯ ДИЗЕЛЬНЫХ ДВИГАТЕЛЕЙ МОЩНОСТЬ ДЛЯ ЛЮБОЙ НАГРУЗКИ",
        text: "Передовые формулы, разработанные для защиты вашего двигателя.",
    }
];

const slidesEn = [
    {
        image: heroImg1,
        title: "MOTOR OIL EVERY DRIVE EVERY VICTORY",
        text: "Explore our full range of advanced automotive fluids.",
    },
    {
        image: heroImg2,
        title: "TRANSMISSION FLUID SHIFT WITH CONFIDENCE",
        text: "Premium lubricants trusted by professionals worldwide.",
    },
    {
        image: heroImg3,
        title: "DIESEL ENGINE OIL POWER FOR EVERY LOAD",
        text: "Advanced formulas designed to protect your engine.",
    }
];

const slidesUz = [
    {
        image: heroImg1,
        title: "MOTOR MOYI HAR BIR SAFAR - HAR BIR G'ALABA",
        text: "Ilg'or avtomobil suyuqliklarining to'liq assortimenti bilan tanishing.",
    },
    {
        image: heroImg2,
        title: "TRANSMISSIYA SUYUQLIGI ISHONCH BILAN UZATING",
        text: "Butun dunyo bo'ylab professionallar ishonadigan premium moylovchi materiallar.",
    },
    {
        image: heroImg3,
        title: "DIZEL DVIGATEL MOYI HAR QANDAY YUK UCHUN QUVVAT",
        text: "Dvigatelingizni himoya qilish uchun ishlab chiqilgan ilg'or formulalar.",
    }
];

function Hero() {
    const { t, i18n } = useTranslation()
    console.log(i18n?.languages);

    const currentLang = i18n?.languages?.[0];

    const SLIDESDATA =
        currentLang === "ru" ? slidesRu :
            currentLang === "uz" ? slidesUz :
                slidesEn;


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
                {SLIDESDATA?.map((slide, index) => (
                    <SwiperSlide key={index}>

                        <div
                            className="hero__slide"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="hero__slide-info container">
                                <h3 className="hero__slide-info-text"><i>{slide.title}</i></h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Hero;