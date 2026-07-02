// import React from 'react'
// import bg from "../../assets/images/bg.webp"
// import cons from "../../assets/images/winnerbg.webp"
// import './catalog.scss'

// import ant from "../../assets/images/catalog/ant.webp"
// import gid from "../../assets/images/catalog/gid.webp"
// import leg from "../../assets/images/catalog/leg.webp"
// import mM from "../../assets/images/catalog/mM.webp"
// import trans from "../../assets/images/catalog/trans.webp"
// import washer from "../../assets/images/catalog/washer.webp"

// const categories = [
//     {
//         title: "Motor oils for passenger cars and light commercial vehicles",
//         subtitle: "FOR PASSENGER CARS",
//         color: "gold",
//         image: leg,
//     },
//     {
//         title: "Motor oils for diesel engines",
//         subtitle: "FOR DIESEL ENGINES",
//         color: "blue",
//         image: mM,
//     },
//     {
//         title: "Transmission oils",
//         subtitle: "",
//         color: "red",
//         image: trans,
//     },
//     {
//         title: "Hydraulic oils",
//         subtitle: "",
//         color: "graphite",
//         image: gid,
//     },
//     {
//         title: "Antifreeze",
//         subtitle: "",
//         color: "pink",
//         image: ant,
//     },
//     {
//         title: "Window washers",
//         subtitle: "",
//         color: "skyblue",
//         image: washer,
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

//             <div className="catalog__grid">
//                 {categories.map((item, index) => (
//                     <div className="catalog__grid-box">
//                         <a href="#" className="catalog-card" style={{ backgroundImage: `url(${item.image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} key={index}>
//                         </a>
//                         <div className="catalog-card__text">
//                             <h3>{item.title}</h3>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )
// }

// export default Catalog

import React from 'react'
import bg from "../../assets/images/bg.webp"
import cons from "../../assets/images/winnerbg.webp"
import './catalog.scss'

import ant from "../../assets/images/catalog/ant.webp"
import gid from "../../assets/images/catalog/gid.webp"
import leg from "../../assets/images/catalog/leg.webp"
import mM from "../../assets/images/catalog/mM.webp"
import trans from "../../assets/images/catalog/trans.webp"
import washer from "../../assets/images/catalog/washer.webp"

const categories = [
    {
        title: "Motor oils for passenger cars and light commercial vehicles",
        image: leg,
    },
    {
        title: "Motor oils for diesel engines",
        image: mM,
    },
    {
        title: "Transmission oils",
        image: trans,
    },
    {
        title: "Hydraulic oils",
        image: gid,
    },
    {
        title: "Antifreeze",
        image: ant,
    },
    {
        title: "Window washers",
        image: washer,
    },
]

const Catalog = () => {
    return (
        <section className="catalog">
            <div className="catalog__grid">
                {categories.map((item, index) => (
                    <a
                        href="#"
                        className="catalog-card"
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        key={index}
                    >
                        <div className="catalog-card__overlay"></div>

                        <div className="catalog-card__info">
                            <h3 className='catalog-card__info-text'>{item.title}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </section >
    )
}

export default Catalog