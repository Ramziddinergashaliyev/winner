import React, { useState } from 'react'
import img from '../../assets/images/winner.webp'
import img1 from '../../assets/images/catalog/ant.webp'
import Reveal from '../../components/reveal/Reveal'
import { NavLink, useParams } from 'react-router-dom'
import { useGetProductByIdQuery, useGetProductsQuery } from '../../services/productApi'
import './singlePage.scss'

const THUMBNAILS = [img, img1, img]

const CHARACTERISTIC_ROWS = [
    { label: 'SAE viscosity grade', key: 'viscosityClass' },
    { label: 'Density at 15°C, g/cm3', key: 'densityAt15C' },
    { label: 'Kinematic viscosity at 40 °C, mm2/s', key: 'kinematicViscosityAt40C' },
    { label: 'Kinematic viscosity at 100 °C, mm2/s', key: 'kinematicViscosityAt100C' },
    { label: 'Viscosity index', key: 'viscosityIndex' },
    { label: 'Flash point in open crucible °C', key: 'flashPoint' },
    { label: 'Pour point, °C', key: 'pourPoint' },
    { label: 'Base number, mg KOH/g', key: 'baseNumber' },
]

const SinglePage = () => {
    const [activeThumb, setActiveThumb] = useState(0)
    const [activeVolume, setActiveVolume] = useState('4L')
    const [imgChanging, setImgChanging] = useState(false)
    const [relatedStart, setRelatedStart] = useState(0)
    const { id } = useParams()
    const { data } = useGetProductByIdQuery(id)
    const { data: productData } = useGetProductsQuery()

    const swipperData = productData?.filter(
        (item) =>
            item?.category?.title?.en === data?.category?.title?.en &&
            item?.id !== data?.id
    ) || []

    const handleThumbChange = (index) => {
        if (index === activeThumb) return
        setImgChanging(true)
        setTimeout(() => {
            setActiveThumb(index)
            setImgChanging(false)
        }, 180)
    }

    const visibleRelated = swipperData.slice(relatedStart, relatedStart + 3)
    const canPrev = relatedStart > 0
    const canNext = relatedStart + 3 < swipperData.length

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
                        <h1 className="single__title">{data?.name?.en}</h1>

                        <p className="single__desc">{data?.description?.en}</p>

                        <div className="single__block">
                            <h2 className="single__block-title">Volume</h2>
                            <div className="single__volumes">
                                {data?.volumes?.map((vol) => (
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
                            <h2 className="single__block-title">Specifications</h2>
                            <div className="single__specs">
                                {data?.specifications?.map((spec, i) => (
                                    <p className="single__specs-row--alt" key={i}>
                                        {spec}
                                    </p>
                                ))}
                            </div>
                        </div>

                    </Reveal>
                </div>

                <Reveal as="div" className="char-table" variant="up">
                    <div className="char-table__header">Characteristics</div>
                    <div className="char-table__subheader">Basic physicochemical characteristics</div>

                    <div className="char-table__wrap">
                        <table className="char-table__table">
                            <thead>
                                <tr>
                                    <th>Indicator name</th>
                                    <th>Value</th>
                                    <th>Testing method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CHARACTERISTIC_ROWS.map(({ label, key }) => {
                                    const [value, method] = data?.[key] || []
                                    if (!value && !method) return null
                                    return (
                                        <tr key={key}>
                                            <td>{label}</td>
                                            <td>{value}</td>
                                            <td>{method}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Reveal>

                {swipperData.length > 0 && (
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
                                        <img src={item?.images?.[0]} alt={item?.name?.en} loading="lazy" />
                                    </div>
                                    <h3 className="related-card__name">{item?.name?.en}</h3>
                                    <p className="related-card__tag">{item?.category?.title?.en}</p>

                                    <div className="related-card__footer">
                                        <ul className="related-card__volumes">
                                            {item?.volumes?.map((v) => (
                                                <li key={v}>{v}</li>
                                            ))}
                                        </ul>

                                        <NavLink to={`/single-products/${item?.id}`} className="related-card__cta">
                                            Details
                                        </NavLink>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}

export default SinglePage
