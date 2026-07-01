

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



// import React from 'react'
// import './catalog.scss'

// const categories = [
//     {
//         title: "MOTOR OILS",
//         subtitle: "FOR PASSENGER CARS",
//         color: "gold",
//     },
//     {
//         title: "MOTOR OILS",
//         subtitle: "FOR DIESEL ENGINES",
//         color: "blue",
//     },
//     {
//         title: "TRANSMISSION OILS",
//         subtitle: "",
//         color: "red",
//     },
//     {
//         title: "HYDRAULIC OILS",
//         subtitle: "",
//         color: "graphite",
//     },
//     {
//         title: "ANTIFREEZE",
//         subtitle: "",
//         color: "pink",
//     },
//     {
//         title: "WASHER FLUID",
//         subtitle: "",
//         color: "skyblue",
//     },
// ]

// const BottleIcon = ({ color }) => (
//     <svg className={`bottle bottle--${color}`} viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg">
//         <rect x="18" y="0" width="24" height="14" rx="3" className="bottle__cap" />
//         <path
//             className="bottle__body"
//             d="M14 18 h32 a4 4 0 0 1 4 4 v90 a8 8 0 0 1 -8 8 H18 a8 8 0 0 1 -8 -8 V22 a4 4 0 0 1 4 -4 Z"
//         />
//         <rect x="10" y="55" width="40" height="34" rx="2" className="bottle__label" />
//     </svg>
// )

// const Catalog = () => {
//     return (
//         <section className="catalog">
//             <div className="catalog__inner">

//                 <div className="catalog__hero">
//                     <div className="catalog__hero-inner">
//                         <div className="catalog__logo">
//                             <span className="catalog__logo-mark">W</span>
//                             <span className="catalog__logo-text">WINNER</span>
//                         </div>

//                         <div className="catalog__heading">
//                             <span className="catalog__divider" />
//                             <h1>CATALOG</h1>
//                             <p className="catalog__subtitle">
//                                 LUBRICANTS, FLUIDS<br />
//                                 AND AUTOMOTIVE CARE
//                             </p>
//                         </div>

//                         <div className="catalog__car" aria-hidden="true">
//                             <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" fill="none">
//                                 <path
//                                     d="M20 150 Q40 90 100 80 L160 60 Q220 55 260 75 L340 90 Q370 100 375 130 L375 150"
//                                     stroke="rgba(255,255,255,0.15)"
//                                     strokeWidth="2"
//                                 />
//                                 <circle cx="90" cy="155" r="28" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
//                                 <circle cx="300" cy="155" r="28" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="catalog__grid container">
//                     {categories.map((item, index) => (
//                         <a href="#" className="catalog-card" key={index}>
//                             <div className="catalog-card__text">
//                                 <h3>{item.title}</h3>
//                                 {item.subtitle && <span>{item.subtitle}</span>}
//                                 <div className="catalog-card__arrow">
//                                     <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M1 1L7 7L1 13" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             <div className="catalog-card__image">
//                                 <BottleIcon color={item.color} />
//                             </div>
//                         </a>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     )
// }

// export default Catalog