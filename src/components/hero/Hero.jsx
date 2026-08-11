import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import heroImg1 from "../../assets/images/hero/bannerOne.webp";
import heroImg2 from "../../assets/images/hero/bannerTwo.webp";
import heroImg3 from "../../assets/images/hero/bannerThree.webp";

import heroMobileOne from "../../assets/images/hero/OneMobile.webp";
import heroMobileTwo from "../../assets/images/hero/TwoMobile.webp";
import heroMobileThree from "../../assets/images/hero/ThreeMobile.webp";

import "./hero.scss";

import { useTranslation } from "react-i18next";

const slidesRu = [
    {
        image: heroImg1,
        mobileImage: heroMobileOne,
        title: "МОТОРНОЕ МАСЛО КАЖДАЯ ПОЕЗДКА - КАЖДАЯ ПОБЕДА",
        text: "Ознакомьтесь с полным ассортиментом наших передовых автомобильных жидкостей.",
    },
    {
        image: heroImg2,
        mobileImage: heroMobileTwo,
        title: "ТРАНСМИССИОННАЯ ЖИДКОСТЬ ПЕРЕКЛЮЧАЙТЕСЬ С УВЕРЕННОСТЬЮ",
        text: "Премиальные смазочные материалы, которым доверяют профессионалы по всему миру.",
    },
    {
        image: heroImg3,
        mobileImage: heroMobileThree,
        title: "МАСЛО ДЛЯ ДИЗЕЛЬНЫХ ДВИГАТЕЛЕЙ МОЩНОСТЬ ДЛЯ ЛЮБОЙ НАГРУЗКИ",
        text: "Передовые формулы, разработанные для защиты вашего двигателя.",
    }
];

const slidesEn = [
    {
        image: heroImg1,
        mobileImage: heroMobileOne,
        title: "MOTOR OIL EVERY DRIVE EVERY VICTORY",
        text: "Explore our full range of advanced automotive fluids.",
    },
    {
        image: heroImg2,
        mobileImage: heroMobileTwo,
        title: "TRANSMISSION FLUID SHIFT WITH CONFIDENCE",
        text: "Premium lubricants trusted by professionals worldwide.",
    },
    {
        image: heroImg3,
        mobileImage: heroMobileThree,
        title: "DIESEL ENGINE OIL POWER FOR EVERY LOAD",
        text: "Advanced formulas designed to protect your engine.",
    }
];

const slidesUz = [
    {
        image: heroImg1,
        mobileImage: heroMobileOne,
        title: "MOTOR MOYI HAR BIR YO'L - HAR BIR G'ALABA",
        text: "Ilg'or avtomobil suyuqliklarimizning to'liq assortimenti bilan tanishing.",
    },
    {
        image: heroImg2,
        mobileImage: heroMobileTwo,
        title: "TRANSMISSIYA MOYI ISHONCH BILAN UZATING",
        text: "Butun dunyo bo'ylab mutaxassislar ishonadigan premium moylash materiallari.",
    },
    {
        image: heroImg3,
        mobileImage: heroMobileThree,
        title: "DIZEL DVIGATEL MOYI HAR QANDAY YUK UCHUN QUVVAT",
        text: "Dvigatelingizni himoya qilish uchun ishlab chiqilgan ilg'or formulalar.",
    }
];

function Hero() {
    const { t, i18n } = useTranslation();

    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth <= 550 : false
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 550);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                            style={{
                                backgroundImage: `url(${isMobile ? slide.mobileImage : slide.image})`,
                            }}
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