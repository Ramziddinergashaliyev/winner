// import React from 'react'
// import './distrbut.scss'
// import Reveal from '../../components/reveal/Reveal'
// import DistributorSection from '../../components/distributorSection/DistributorSection'

// import car from '../../assets/images/dist.png'
// import global from '../../assets/images/glob.png'

// const Distrbut = () => {
//     return (
//         <div className="dist">
//             <section className="distrbut">
//                 <div
//                     className="distrbut__panel distrbut__panel--map"
//                     style={{ backgroundImage: `url(${global})` }}
//                 >
//                     <div className="distrbut__overlay" aria-hidden="true" />

//                     <div className="distrbut__content container">
//                         <Reveal as="div" variant="left">
//                             <h2 className="distrbut__title">
//                                 <span>Partnership and </span>
//                                 <br />
//                                 Distributorship
//                             </h2>
//                         </Reveal>

//                         <Reveal as="p" className="distrbut__text" variant="left" delay={120}>
//                             Cooperate with the WINNER brand and lead the market together. Quality, trust and profit are the basis of our partnership.
//                         </Reveal>
//                     </div>
//                 </div>

//                 <span className="distrbut__divider" aria-hidden="true" />

//                 <Reveal
//                     as="div"
//                     className="distrbut__panel distrbut__panel--car distrbut__panel--reveal"
//                     variant="right"
//                     style={{ backgroundImage: `url(${car})` }}
//                 />
//             </section>

//             <DistributorSection />
//         </div>
//     )
// }

// export default Distrbut


import React, { useState } from 'react'
import './distrbut.scss'

const countries = [
    { id: '01', name: 'Uzbekistan' },
    { id: '02', name: 'Kazakhstan' },
    { id: '03', name: 'Tajikistan' },
    { id: '04', name: 'Turkmenistan' },
    { id: '05', name: 'Azerbaijan' },
    { id: '06', name: 'Kyrgyzstan' },
]

const stats = [
    { icon: 'globe', value: '30+', label: 'Countries' },
    { icon: 'partners', value: '200+', label: 'Partners' },
    { icon: 'support', value: '24/7', label: 'Support' },
]

const StatIcon = ({ type }) => {
    if (type === 'globe') {
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 12h18M12 3c2.4 2.5 3.7 5.8 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.8-3.7-9s1.3-6.5 3.7-9Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        )
    }
    if (type === 'partners') {
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.5 20c0-3.2 2.5-5.3 5.5-5.3s5.5 2.1 5.5 5.3M14 20c0-2.5 1.8-4.3 4-4.3s4 1.8 4 4.3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        )
    }
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

const Distrbut = () => {
    const [activeId, setActiveId] = useState(null)

    const toggleCountry = (id) => {
        setActiveId((prev) => (prev === id ? null : id))
    }

    const half = Math.ceil(countries.length / 2)
    const columns = [countries.slice(0, half), countries.slice(half)]

    return (
        <section className="distrbut">
            <div className="distrbut__top">
                <div className="container distrbut__inner-container">
                    <div className="distrbut__content">
                        <span className="distrbut__label">Global network</span>
                        <h2 className="distrbut__title">
                            Official <span className="distrbut__title-accent">Distributors.</span>
                            <br />
                            Stronger Together.
                        </h2>
                        <p className="distrbut__desc">
                            Join our global network of trusted partners and deliver
                            performance that drives results.
                        </p>

                        <div className="distrbut__stats">
                            {stats.map((stat) => (
                                <div className="distrbut__stat" key={stat.label}>
                                    <span className="distrbut__stat-icon">
                                        <StatIcon type={stat.icon} />
                                    </span>
                                    <span className="distrbut__stat-value">{stat.value}</span>
                                    <span className="distrbut__stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="distrbut__list container">
                {columns.map((col, colIndex) => (
                    <div className="distrbut__column" key={colIndex}>
                        {col.map((country) => (
                            <div
                                className={`distrbut__item ${activeId === country.id ? 'distrbut__item--active' : ''}`}
                                key={country.id}
                            >
                                <button
                                    type="button"
                                    className="distrbut__item-head"
                                    onClick={() => toggleCountry(country.id)}
                                    aria-expanded={activeId === country.id}
                                >
                                    <span className="distrbut__item-index">{country.id}</span>
                                    <span className="distrbut__item-name">{country.name}</span>
                                    <span className="distrbut__item-toggle">
                                        <span className="distrbut__item-toggle-line distrbut__item-toggle-line--v" />
                                        <span className="distrbut__item-toggle-line" />
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Distrbut

