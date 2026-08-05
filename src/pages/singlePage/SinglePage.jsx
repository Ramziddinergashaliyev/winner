import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Reveal from '../../components/reveal/Reveal'
import { NavLink, useParams } from 'react-router-dom'
import { useGetProductByIdQuery, useGetProductsQuery } from '../../services/productApi'
import './singlePage.scss'

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

const THUMBS_PER_PAGE = 4

const LoadingImage = ({ src, alt, className = '', wrapClassName = '', ...rest }) => {
    const [loaded, setLoaded] = useState(false)
    const imgRef = useRef(null)

    useEffect(() => {
        setLoaded(false)
        if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
            setLoaded(true)
        }
    }, [src])

    const handleLoad = () => setLoaded(true)
    const handleError = () => setLoaded(true)

    return (
        <div className={`img-loader${loaded ? '' : ' img-loader--loading'} ${wrapClassName}`}>
            {!loaded && <span className="img-loader__spinner" aria-hidden="true" />}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
                className={`img-loader__img${loaded ? ' img-loader__img--visible' : ''} ${className}`}
                {...rest}
            />
        </div>
    )
}

const Lightbox = ({ src, alt, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = prevOverflow
        }
    }, [onClose])

    return createPortal(
        <div className="lightbox" onClick={onClose}>
            <button
                type="button"
                className="lightbox__close"
                aria-label="Yopish"
                onClick={onClose}
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
                <img src={src} alt={alt} className="lightbox__img" />
            </div>
        </div>,
        document.body
    )
}

const SinglePage = () => {
    const [activeThumb, setActiveThumb] = useState(0)
    const [activeVolume, setActiveVolume] = useState(null)
    const [imgChanging, setImgChanging] = useState(false)
    const [relatedStart, setRelatedStart] = useState(0)
    const [thumbStart, setThumbStart] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const { id } = useParams()
    const { data } = useGetProductByIdQuery(id)
    const { data: productData } = useGetProductsQuery()

    const THUMBNAILS = data?.images

    useEffect(() => {
        if (data?.volumes?.length) {
            setActiveVolume(data.volumes[0])
            setActiveThumb(0)
            setThumbStart(0)
        }
    }, [data])

    const swipperData = productData?.filter(
        (item) =>
            item?.category?.title?.en === data?.category?.title?.en &&
            item?.id !== data?.id
    ) || []

    const goToIndex = (index) => {
        if (index === activeThumb) return
        setImgChanging(true)
        setTimeout(() => {
            setActiveThumb(index)
            setImgChanging(false)
        }, 180)
    }

    const handleThumbChange = (index) => {
        goToIndex(index)
        if (data?.volumes?.[index]) {
            setActiveVolume(data.volumes[index])
        }
    }

    const handleVolumeChange = (vol) => {
        setActiveVolume(vol)
        const volIndex = data?.volumes?.findIndex((v) => v === vol)
        if (volIndex !== -1 && volIndex !== undefined) {
            goToIndex(volIndex)
            const page = Math.floor(volIndex / THUMBS_PER_PAGE) * THUMBS_PER_PAGE
            setThumbStart(page)
        }
    }

    const visibleRelated = swipperData.slice(relatedStart, relatedStart + 3)
    const canPrev = relatedStart > 0
    const canNext = relatedStart + 3 < swipperData.length

    const visibleThumbs = THUMBNAILS?.slice(thumbStart, thumbStart + THUMBS_PER_PAGE) || []
    const canThumbPrev = thumbStart > 0
    const canThumbNext = thumbStart + THUMBS_PER_PAGE < (THUMBNAILS?.length || 0)
    const showThumbNav = (THUMBNAILS?.length || 0) > THUMBS_PER_PAGE

    const characteristicRows = CHARACTERISTIC_ROWS
        .map(({ label, key }) => {
            const [value, method] = data?.[key] || []
            return { label, value, method }
        })
        .filter((row) => row.value || row.method)

    const hasCharacteristics = characteristicRows.length > 0

    return (
        <section className="single">
            <div className="single-bg" />
            <div className="container">
                <div className="single__top">
                    <Reveal as="div" className="single__gallery" variant="left">

                        <div className="single__thumbs-wrap">
                            {showThumbNav && (
                                <button
                                    type="button"
                                    className="single__thumb-nav single__thumb-nav--up"
                                    aria-label="Previous images"
                                    disabled={!canThumbPrev}
                                    onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            )}

                            <div className="single__thumbs">
                                {visibleThumbs.map((thumb, i) => {
                                    const realIndex = thumbStart + i
                                    return (
                                        <button
                                            type="button"
                                            key={realIndex}
                                            className={`single__thumb${activeThumb === realIndex ? ' single__thumb--active' : ''}`}
                                            onClick={() => handleThumbChange(realIndex)}
                                            aria-label={`Show image ${realIndex + 1}`}
                                        >
                                            <LoadingImage
                                                src={thumb}
                                                alt=""
                                                wrapClassName="single__thumb-loader"
                                            />
                                        </button>
                                    )
                                })}
                            </div>

                            {showThumbNav && (
                                <button
                                    type="button"
                                    className="single__thumb-nav single__thumb-nav--down"
                                    aria-label="Next images"
                                    disabled={!canThumbNext}
                                    onClick={() => setThumbStart((s) => (canThumbNext ? s + 1 : s))}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            className="single__main-image"
                            onClick={() => setLightboxOpen(true)}
                            aria-label="Rasmni kattalashtirish"
                        >
                            <LoadingImage
                                key={activeThumb}
                                src={THUMBNAILS?.[activeThumb]}
                                alt={data?.name?.en}
                                className={imgChanging ? 'is-changing' : ''}
                                wrapClassName="single__main-image-loader"
                            />
                        </button>
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
                                        onClick={() => handleVolumeChange(vol)}
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

                {hasCharacteristics && (
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
                                    {characteristicRows.map(({ label, value, method }) => (
                                        <tr key={label}>
                                            <td>{label}</td>
                                            <td>{value}</td>
                                            <td>{method}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Reveal>
                )}

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
                                        <LoadingImage
                                            src={item?.images?.[0]}
                                            alt={item?.name?.en}
                                            wrapClassName="related-card__image-loader"
                                        />
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

            {lightboxOpen && (
                <Lightbox
                    src={THUMBNAILS?.[activeThumb]}
                    alt={data?.name?.en}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </section>
    )
}

export default SinglePage