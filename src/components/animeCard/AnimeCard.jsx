// import React, { useState } from 'react'


// import img1 from "../../assets/images/bgauto.webp"
// import img2 from "../../assets/images/bgauto1.webp"
// import img3 from "../../assets/images/bgauto2.webp"

// import "./animeCard.scss"

// const TABS = [
//     {
//         id: "engine",
//         label: "Motor oils for passenger cars",
//         image: img1,
//     },
//     {
//         id: "diesel",
//         label: "Motor oils for diesel",
//         image: img2,
//     },
//     {
//         id: "transmission",
//         label: "Transmission",
//         image: img3,
//     }
// ]

// const AnimeCard = () => {
//     const [activeId, setActiveId] = useState(TABS[1].id)
//     const active = TABS.find((t) => t.id === activeId)

//     return (
//         <div className="anime-card">
//             <nav className="anime-card__nav">
//                 <div className="anime-card__nav-inner">
//                     <ul className="anime-card__tabs container">
//                         {TABS.map((tab) => (
//                             <li key={tab.id}>
//                                 <button
//                                     type="button"
//                                     className={
//                                         "anime-card__tab" +
//                                         (tab.id === activeId ? " anime-card__tab--active" : "")
//                                     }
//                                     onClick={() => setActiveId(tab.id)}>
//                                     {tab.label}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </nav>

//             <div className="anime-card__body">
//                 <div
//                     key={active.id}
//                     className="anime-card__bg"
//                     style={{ backgroundImage: `url(${active.image})` }}
//                 />
//             </div>
//         </div>
//     )
// }

// export default AnimeCard

import React, { useEffect, useRef, useState } from 'react'

import img1 from "../../assets/images/bgauto.webp"
import img2 from "../../assets/images/bgauto1.webp"
import img3 from "../../assets/images/bgauto2.webp"

import "./animeCard.scss"

const TABS = [
    { id: "engine", label: "Motor oils for passenger cars", image: img1 },
    { id: "diesel", label: "Motor oils for diesel", image: img2 },
    { id: "transmission", label: "Transmission", image: img3 },
]

const AUTOPLAY_DELAY = 4000
const DIRECTION = "right"

const AnimeCard = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(null)

    const animKey = useRef(0)
    const activeIndexRef = useRef(activeIndex)
    const intervalRef = useRef(null)

    const active = TABS[activeIndex]
    const prev = prevIndex !== null ? TABS[prevIndex] : null

    const goTo = (idx, manual = false) => {
        setActiveIndex((current) => {
            if (idx === current) return current
            setPrevIndex(current)
            animKey.current += 1
            return idx
        })
        if (manual) restartAutoplay()
    }

    const startAutoplay = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            const next = (activeIndexRef.current + 1) % TABS.length
            goTo(next)
        }, AUTOPLAY_DELAY)
    }

    const restartAutoplay = () => {
        startAutoplay()
    }

    useEffect(() => {
        activeIndexRef.current = activeIndex
    }, [activeIndex])

    useEffect(() => {
        startAutoplay()
        return () => clearInterval(intervalRef.current)
    }, [])

    const handleTabClick = (idx) => {
        if (idx === activeIndexRef.current) return
        goTo(idx, true)
    }

    return (
        <div className="anime-card">
            <nav className="anime-card__nav">
                <div className="anime-card__nav-inner">
                    <ul className="anime-card__tabs container">
                        {TABS.map((tab, idx) => (
                            <li key={tab.id}>
                                <span
                                    role="button"
                                    tabIndex={0}
                                    className={
                                        "anime-card__tab" +
                                        (idx === activeIndex ? " anime-card__tab--active" : "")
                                    }
                                    onClick={() => handleTabClick(idx)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") handleTabClick(idx)
                                    }}
                                >
                                    {tab.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div className="anime-card__body">
                {prev && (
                    <div
                        key={`prev-${animKey.current}`}
                        className={`anime-card__bg anime-card__bg--out-${DIRECTION}`}
                        style={{ backgroundImage: `url(${prev.image})` }}
                        onAnimationEnd={() => setPrevIndex(null)}
                    />
                )}
                <div
                    key={`active-${animKey.current}`}
                    className={`anime-card__bg anime-card__bg--in-${DIRECTION}`}
                    style={{ backgroundImage: `url(${active.image})` }}
                />
                <div className="anime-card__overlay" />
            </div>
        </div>
    )
}

export default AnimeCard


// import React, { useLayoutEffect, useRef, useState } from 'react'

// import img1 from "../../assets/images/bgauto.webp"
// import img2 from "../../assets/images/bgauto1.webp"
// import img3 from "../../assets/images/bgauto2.webp"

// import "./animeCard.scss"

// const TABS = [
//     { id: "engine", label: "Motor oils for passenger cars", image: img1 },
//     { id: "diesel", label: "Motor oils for diesel", image: img2 },
//     { id: "transmission", label: "Transmission", image: img3 },
// ]

// const AnimeCard = () => {
//     const [activeIndex, setActiveIndex] = useState(1)
//     const [prevIndex, setPrevIndex] = useState(null)
//     const [direction, setDirection] = useState("right")
//     const [indicator, setIndicator] = useState({ left: 0, width: 0 })

//     const animKey = useRef(0)
//     const tabRefs = useRef([])

//     const active = TABS[activeIndex]
//     const prev = prevIndex !== null ? TABS[prevIndex] : null

//     const measure = (idx) => {
//         const el = tabRefs.current[idx]
//         if (!el) return
//         setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
//     }

//     useLayoutEffect(() => {
//         measure(activeIndex)
//     }, [activeIndex])

//     useLayoutEffect(() => {
//         const onResize = () => measure(activeIndex)
//         window.addEventListener("resize", onResize)
//         return () => window.removeEventListener("resize", onResize)
//     }, [activeIndex])

//     const handleTabClick = (idx) => {
//         if (idx === activeIndex) return
//         setDirection(idx > activeIndex ? "right" : "left")
//         setPrevIndex(activeIndex)
//         setActiveIndex(idx)
//         animKey.current += 1
//     }

//     return (
//         <div className="anime-card">
//             <nav className="anime-card__nav">
//                 <div className="anime-card__nav-inner">
//                     <ul className="anime-card__tabs container">
//                         {TABS.map((tab, idx) => (
//                             <li key={tab.id}>
//                                 <span
//                                     ref={(el) => (tabRefs.current[idx] = el)}
//                                     role="button"
//                                     tabIndex={0}
//                                     className={
//                                         "anime-card__tab" +
//                                         (idx === activeIndex ? " anime-card__tab--active" : "")
//                                     }
//                                     onClick={() => handleTabClick(idx)}
//                                     onKeyDown={(e) => {
//                                         if (e.key === "Enter" || e.key === " ") handleTabClick(idx)
//                                     }}
//                                 >
//                                     {tab.label}
//                                 </span>
//                             </li>
//                         ))}

//                         <span
//                             className="anime-card__indicator"
//                             style={{ left: indicator.left, width: indicator.width }}
//                         />
//                     </ul>
//                 </div>
//             </nav>

//             <div className="anime-card__body">
//                 {prev && (
//                     <div
//                         key={`prev-${animKey.current}`}
//                         className={`anime-card__bg anime-card__bg--out-${direction}`}
//                         style={{ backgroundImage: `url(${prev.image})` }}
//                         onAnimationEnd={() => setPrevIndex(null)}
//                     />
//                 )}

//                 <div
//                     key={`active-${animKey.current}`}
//                     className={`anime-card__bg anime-card__bg--in-${direction}`}
//                     style={{ backgroundImage: `url(${active.image})` }}
//                 />

//                 <div className="anime-card__overlay" />
//             </div>
//         </div>
//     )
// }

// export default AnimeCard