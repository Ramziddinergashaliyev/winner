import React, { useEffect, useRef, useCallback } from 'react'
import './animeCard.scss'

import leg from '../../assets/images/winner.webp'
import mM from '../../assets/images/winner.webp'
import trans from '../../assets/images/winner.webp'
import gid from '../../assets/images/winner.webp'
import ant from '../../assets/images/winner.webp'
import washer from '../../assets/images/winner.webp'

const rows = [
    {
        left: { id: 1, img: leg, title: 'Passenger Cars', desc: 'Light commercial oils' },
        right: { id: 2, img: mM, title: 'Diesel Engines', desc: 'Heavy-duty protection' },
    },
    {
        left: { id: 3, img: trans, title: 'Transmission', desc: 'Smooth gear shifts' },
        right: { id: 4, img: gid, title: 'Hydraulic Oils', desc: 'Industrial performance' },
    },
    {
        left: { id: 5, img: ant, title: 'Antifreeze', desc: 'All-season cooling' },
        right: { id: 6, img: washer, title: 'Window Washers', desc: 'Crystal-clear vision' },
    },
]

const smoothstep = (t) => t * t * (3 - 2 * t)
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const AnimeCard = () => {
    const wrapperRef = useRef(null)
    const rowRefs = useRef([])
    const textRefs = useRef({})
    const rafId = useRef(null)
    const isActive = useRef(false)

    const setRowRef = (index) => (el) => {
        rowRefs.current[index] = el
    }

    const setTextRef = (id) => (el) => {
        textRefs.current[id] = el
    }

    const render = useCallback(() => {
        const wrapper = wrapperRef.current

        if (wrapper && isActive.current) {
            const rect = wrapper.getBoundingClientRect()
            const scrollable = rect.height - window.innerHeight
            const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0
            const spread = Math.min(window.innerWidth * 0.14, 168)

            rows.forEach((row, index) => {
                const rowEl = rowRefs.current[index]
                if (!rowEl) return

                const rowDelay = index * 0.07
                const rowProgress = clamp((progress - rowDelay) / (1 - rowDelay * 2), 0, 1)
                const eased = smoothstep(rowProgress)
                const textEased = smoothstep(clamp((rowProgress - 0.28) / 0.72, 0, 1))

                const leftEl = rowEl.querySelector('.anime-row__side--left')
                const rightEl = rowEl.querySelector('.anime-row__side--right')

                if (leftEl) {
                    leftEl.style.transform = `translateX(${-eased * spread}px)`
                }

                if (rightEl) {
                    rightEl.style.transform = `translateX(${eased * spread}px)`
                }

                ;[row.left.id, row.right.id].forEach((id) => {
                    const textEl = textRefs.current[id]
                    if (!textEl) return

                    textEl.style.opacity = textEased
                    textEl.style.transform = `translateY(${(1 - textEased) * 10}px)`
                })
            })

            wrapper.style.setProperty('--head-opacity', smoothstep(clamp(progress / 0.35, 0, 1)))
        }

        rafId.current = requestAnimationFrame(render)
    }, [])

    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                isActive.current = entry.isIntersecting
            },
            { rootMargin: '20% 0px' }
        )

        observer.observe(wrapper)
        rafId.current = requestAnimationFrame(render)

        return () => {
            observer.disconnect()
            cancelAnimationFrame(rafId.current)
        }
    }, [render])

    return (
        <section className="anime-wrapper" ref={wrapperRef}>
            <div className="anime-sticky">
                <header className="anime-head">
                    <span className="anime-head__label">Product Range</span>
                    <h2 className="anime-head__title">Engineered to Win</h2>
                </header>

                <div className="anime-grid">
                    {rows.map((row, index) => (
                        <div className="anime-grid__row" key={row.left.id} ref={setRowRef(index)}>
                            <div className="anime-row">
                                <div className="anime-row__side anime-row__side--left">
                                    <div
                                        ref={setTextRef(row.left.id)}
                                        className="anime-piece__text anime-piece__text--right"
                                    >
                                        <h3>{row.left.title}</h3>
                                        <p>{row.left.desc}</p>
                                    </div>
                                    <div className="anime-piece__img-wrap">
                                        <img
                                            src={row.left.img}
                                            alt={row.left.title}
                                            className="anime-piece__img"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                <div className="anime-row__side anime-row__side--right">
                                    <div className="anime-piece__img-wrap">
                                        <img
                                            src={row.right.img}
                                            alt={row.right.title}
                                            className="anime-piece__img"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div
                                        ref={setTextRef(row.right.id)}
                                        className="anime-piece__text anime-piece__text--left"
                                    >
                                        <h3>{row.right.title}</h3>
                                        <p>{row.right.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AnimeCard
