import React, { useState } from 'react'
import './singlePage.scss'
import img from '../../assets/images/winner.webp'
import Reveal from '../../components/reveal/Reveal'
import { NavLink } from 'react-router-dom'

const THUMBNAILS = [img, img, img]

const VOLUMES = ['1L', '4L', '10L', '20L']

const SPECS = [
    { label: 'Viscosity', value: '5W-30' },
    { label: 'API standard', value: 'SN' },
    { label: 'ACEA standard', value: 'A3/B4' },
    { label: 'Manufactured in', value: 'Uzbekistan' },
]

const TOLERANCES = ['API SN', 'ACEA A3/B4']

const RELATED = [
    { id: 1, name: 'Winner V-City 5W-30', tag: 'Synthetic Motor Oil', volumes: ['1L', '4L', '5L'] },
    { id: 2, name: 'Winner V-Pro 5W-40', tag: 'Fully Synthetic', volumes: ['1L', '4L', '5L'] },
    { id: 3, name: 'Winner V-Axle 75W-90', tag: 'Fully Synthetic Gear Oil', volumes: ['1L', '4L', '10L'] },
]

const SinglePage = () => {
    const [activeThumb, setActiveThumb] = useState(0)
    const [activeVolume, setActiveVolume] = useState('4L')
    const [imgChanging, setImgChanging] = useState(false)
    const [relatedStart, setRelatedStart] = useState(0)

    const handleThumbChange = (index) => {
        if (index === activeThumb) return
        setImgChanging(true)
        setTimeout(() => {
            setActiveThumb(index)
            setImgChanging(false)
        }, 180)
    }

    const visibleRelated = RELATED.slice(relatedStart, relatedStart + 3)
    const canPrev = relatedStart > 0
    const canNext = relatedStart + 3 < RELATED.length

    return (
        <section className="single">
            <div className="single-bg" />
            <div className="container">
                <div className="single__top">
                    <Reveal as="div" className="single__gallery" variant="left">
                        <div className="single__thumbs">
                            {THUMBNAILS.map((thumb, i) => (
                                <button
                                    type="button"
                                    key={i}
                                    className={`single__thumb${activeThumb === i ? ' single__thumb--active' : ''}`}
                                    onClick={() => handleThumbChange(i)}
                                    aria-label={`Show image ${i + 1}`}
                                >
                                    <img src={thumb} alt="" />
                                </button>
                            ))}
                        </div>

                        <div className="single__main-image">
                            <img
                                src={THUMBNAILS[activeThumb]}
                                alt="WINNER 5W-30"
                                className={imgChanging ? 'is-changing' : ''}
                            />
                        </div>
                    </Reveal>

                    <Reveal as="div" className="single__info" variant="right" delay={100}>
                        <h1 className="single__title">WINNER 75W-90 API GL-4/5</h1>

                        <p className="single__desc">
                            WINNER Conecto 75W-90 is a high-performance synthetic transmission oil designed for use in manual gearboxes, differentials, and final drives operating under moderate to heavy loads. Formulated to meet both API GL-4 and GL-5 specifications, it offers excellent versatility and compatibility across a wide range of passenger cars and commercial vehicles.
                        </p>

                        <div className="single__block">
                            <h2 className="single__block-title">Volume</h2>
                            <div className="single__volumes">
                                {VOLUMES.map((vol) => (
                                    <button
                                        type="button"
                                        key={vol}
                                        className={`single__volume${activeVolume === vol ? ' single__volume--active' : ''}`}
                                        onClick={() => setActiveVolume(vol)}
                                    >
                                        {vol}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="single__block">
                            <h2 className="single__block-title">Technical Specifications</h2>
                            <table className="single__specs">
                                <tbody>
                                    {SPECS.map((spec, i) => (
                                        <tr
                                            key={spec.label}
                                            className={i % 2 === 1 ? 'single__specs-row--alt' : ''}
                                        >
                                            <td>{spec.label}</td>
                                            <td>{spec.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Reveal>
                </div>

                <Reveal as="div" className="single__related" variant="up">
                    <div className="single__related-head">
                        <h2 className="single__related-title">Related Products</h2>
                        <div className="single__related-nav">
                            <button
                                type="button"
                                aria-label="Previous"
                                disabled={!canPrev}
                                onClick={() => setRelatedStart((s) => Math.max(0, s - 1))}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                aria-label="Next"
                                disabled={!canNext}
                                onClick={() => setRelatedStart((s) => s + 1)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="single__related-grid">
                        {visibleRelated.map((item, index) => (
                            <article
                                className="related-card"
                                key={item.id}
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <div className="related-card__image">
                                    <img src={img} alt={item.name} loading="lazy" />
                                </div>
                                <h3 className="related-card__name">{item.name}</h3>
                                <p className="related-card__tag">{item.tag}</p>

                                <div className="related-card__footer">
                                    <ul className="related-card__volumes">
                                        {item.volumes.map((v) => (
                                            <li key={v}>{v}</li>
                                        ))}
                                    </ul>

                                    <NavLink to="/single-products" className="related-card__cta">
                                        Details
                                    </NavLink>
                                </div>
                            </article>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

export default SinglePage
