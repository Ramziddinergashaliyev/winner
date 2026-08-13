import React, { useEffect, useRef, useState } from 'react'

import img1 from "../../assets/images/anime/bgauto.webp"
import img2 from "../../assets/images/anime/bgauto1.webp"
import img3 from "../../assets/images/anime/bgauto2.webp"

import oneMobile from "../../assets/images/anime/oneMobile.webp"
import twoMobile from "../../assets/images/anime/twoMobile.webp"
import threeMobile from "../../assets/images/anime/threeMobile.webp"

import "./animeCard.scss"
import { useTranslation } from 'react-i18next'

const TABSEN = [
    { id: "engine", label: "Motor oils for passenger cars", image: img1, mobileImage: oneMobile },
    { id: "diesel", label: "Motor oils for diesel", image: img2, mobileImage: twoMobile },
    { id: "transmission", label: "Transmission", image: img3, mobileImage: threeMobile },
]

const TABSRU = [
    { id: "engine", label: "Моторные масла для легковой техники", image: img1, mobileImage: oneMobile },
    { id: "diesel", label: "Моторные масла для дизельных двигателей", image: img2, mobileImage: twoMobile },
    { id: "transmission", label: "Трансмиссионные масла", image: img3, mobileImage: threeMobile },
]

const TABSUZ = [
    { id: "engine", label: "Yengil avtomobillar uchun motor moylari", image: img1, mobileImage: oneMobile },
    { id: "diesel", label: "Dizel dvigatellari uchun motor moylari", image: img2, mobileImage: twoMobile },
    { id: "transmission", label: "Transmissiya moylari", image: img3, mobileImage: threeMobile },
]

const AUTOPLAY_DELAY = 4000
const DIRECTION = "right"

const AnimeCard = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(null)
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth <= 550 : false
    )
    const { t, i18n } = useTranslation()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 550)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const currentLang = i18n?.languages?.[0]
    const TABSDATA =
        currentLang === "ru" ? TABSRU :
            currentLang === "uz" ? TABSUZ :
                TABSEN

    const animKey = useRef(0)
    const activeIndexRef = useRef(activeIndex)
    const intervalRef = useRef(null)

    const active = TABSDATA[activeIndex]
    const prev = prevIndex !== null ? TABSDATA[prevIndex] : null

    const getImage = (tab) => (isMobile ? tab.mobileImage : tab.image)

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
            const next = (activeIndexRef.current + 1) % TABSDATA.length
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
                        {TABSDATA?.map((tab, idx) => (
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
                        style={{ backgroundImage: `url(${getImage(prev)})` }}
                        onAnimationEnd={() => setPrevIndex(null)}
                    />
                )}

                <div
                    key={`active-${animKey.current}`}
                    className={`anime-card__bg anime-card__bg--in-${DIRECTION}`}
                    style={{ backgroundImage: `url(${getImage(active)})` }}
                />
                <div className="anime-card__overlay" />

            </div>
        </div>
    )
}

export default AnimeCard