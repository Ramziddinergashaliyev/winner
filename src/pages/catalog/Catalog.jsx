import React from 'react'
import bg from "../../assets/images/bg.webp"
import cons from "../../assets/images/winner.webp"
import './catalog.scss'

import motorOilCar from "../../assets/images/catalog/antif.webp"
import motorOilTruck from "../../assets/images/catalog/antif.webp"
import transmissionOil from "../../assets/images/catalog/antif.webp"
import hydraulicOil from "../../assets/images/catalog/antif.webp"
import antifreeze from "../../assets/images/catalog/antif.webp"
import washerFluid from "../../assets/images/catalog/antif.webp"

const categories = [
    {
        title: "MOTOR OILS",
        subtitle: "FOR PASSENGER CARS",
        color: "gold",
        image: cons,
    },
    {
        title: "MOTOR OILS",
        subtitle: "FOR DIESEL ENGINES",
        color: "blue",
        image: cons,
    },
    {
        title: "TRANSMISSION OILS",
        subtitle: "",
        color: "red",
        image: cons,
    },
    {
        title: "HYDRAULIC OILS",
        subtitle: "",
        color: "graphite",
        image: cons,
    },
    {
        title: "ANTIFREEZE",
        subtitle: "",
        color: "pink",
        image: cons,
    },
    {
        title: "WASHER FLUID",
        subtitle: "",
        color: "skyblue",
        image: cons,
    },
]

const BottleIcon = ({ color }) => (
    <svg className={`bottle bottle--${color}`} viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="0" width="24" height="14" rx="3" className="bottle__cap" />
        <path
            className="bottle__body"
            d="M14 18 h32 a4 4 0 0 1 4 4 v90 a8 8 0 0 1 -8 8 H18 a8 8 0 0 1 -8 -8 V22 a4 4 0 0 1 4 -4 Z"
        />
        <rect x="10" y="55" width="40" height="34" rx="2" className="bottle__label" />
    </svg>
)

const Catalog = () => {
    return (
        <section className="catalog">

            <div className="catalog__grid">
                {categories.map((item, index) => (
                    <a href="#" className="catalog-card" style={{ backgroundImage: `url(${item.image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} key={index}>
                        {/* <div className="catalog-card__text">
                            <h3>{item.title}</h3>
                            {item.subtitle && <span>{item.subtitle}</span>}
                            <div className="catalog-card__arrow">
                                <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L1 13" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div> */}
                    </a>
                ))}
            </div>
        </section>
    )
}

export default Catalog

