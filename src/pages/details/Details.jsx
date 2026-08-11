import React, { useMemo, useState } from 'react'
import './details.scss'
import img from '../../assets/images/winner.webp'
import { NavLink, useParams } from 'react-router-dom'
import Reveal from '../../components/reveal/Reveal'
import { useGetCategoriesByIdQuery } from '../../services/categoryApi'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import bgOne from "../../assets/images/productBg/ant.webp"
import bgTwo from "../../assets/images/productBg/diesel.webp"
import bgThree from "../../assets/images/productBg/hyd.webp"
import bgFour from "../../assets/images/productBg/singleBg.webp"
import bgFife from "../../assets/images/productBg/tran.webp"
import bgSix from "../../assets/images/productBg/wind.webp"

const PER_PAGE = 6

const getAvailableVolumes = (products) => {
    if (!Array.isArray(products)) return []

    const set = new Set()
    products.forEach((product) => {
        (product?.volumes || []).forEach((v) => {
            if (v !== null && v !== undefined && String(v).trim() !== '') {
                set.add(String(v).trim())
            }
        })
    })

    return Array.from(set).sort((a, b) => {
        const numA = parseFloat(a)
        const numB = parseFloat(b)
        if (numA !== numB) return numA - numB
        return a.localeCompare(b)
    })
}

const CATEGORY_BANNERS = {
    5: bgOne,
    2: bgTwo,
    4: bgThree,
    3: bgFife,
    6: bgSix,
    1: bgFour,
}

const getCategoryBanner = (data, id) => {
    const categoryId = data?.id ?? id
    return CATEGORY_BANNERS[categoryId] || bgFour
}

const normalizeVolume = (raw) => {
    if (raw === null || raw === undefined) return ''

    if (typeof raw === 'object') {
        raw = raw.value ?? raw.volume ?? raw.label ?? raw.name ?? ''
    }

    return String(raw)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/л/g, 'l')
        .replace(/litr(a)?/g, 'l')
}

const getProductVolumes = (product) => {
    const vols = product?.volumes ?? product?.volume ?? []
    const arr = Array.isArray(vols) ? vols : [vols]
    return arr.map(normalizeVolume).filter(Boolean)
}

const ProductImage = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className={`product-card__image${loaded ? '' : ' product-card__image--loading'}`}>
            {!loaded && (
                <span className="product-card__spinner" aria-hidden="true" />
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`product-card__img${loaded ? ' product-card__img--visible' : ''}`}
            />
        </div>
    )
}

const Details = () => {
    const [selectedVolumes, setSelectedVolumes] = useState([])
    const [page, setPage] = useState(1)
    const { id } = useParams()
    const { data, isLoading, isError } = useGetCategoriesByIdQuery(id)
    const { t, i18n } = useTranslation()

    const heroBanner = useMemo(() => getCategoryBanner(data, id), [data, id])

    const availableVolumes = useMemo(
        () => getAvailableVolumes(data?.products),
        [data]
    )

    const toggleVolume = (vol) => {
        const normalized = normalizeVolume(vol)
        setSelectedVolumes((prev) =>
            prev.includes(normalized)
                ? prev.filter((v) => v !== normalized)
                : [...prev, normalized]
        )
        setPage(1)
    }

    const clearFilters = () => {
        setSelectedVolumes([])
        setPage(1)
    }

    const filteredProducts = useMemo(() => {
        if (!data?.products) return []

        return data.products.filter((product) => {
            if (selectedVolumes.length === 0) return true

            const productVolumes = getProductVolumes(product)
            return selectedVolumes.some((v) => productVolumes.includes(v))
        })
    }, [data, selectedVolumes])

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PER_PAGE))

    const pagedProducts = useMemo(() => {
        const start = (page - 1) * PER_PAGE
        return filteredProducts.slice(start, start + PER_PAGE)
    }, [filteredProducts, page])

    const gridKey = `${selectedVolumes.join(',')}-${page}`

    if (isLoading) {
        return (
            <section className="details">
                <div className="details__body container">
                    <p className='details__body-title'>Loading...</p>
                </div>
            </section>
        )
    }

    if (isError) {
        return (
            <section className="details">
                <div className="details__body container">
                    <p className='details__body-title'>An error occurred while loading the data.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="details">
            <div
                className="details__hero"
                style={{ backgroundImage: `url(${heroBanner})` }}
            ></div>

            <div className="details__body container">
                <Reveal as="aside" className="details__sidebar" variant="left" aria-label="Filters">

                    <h1 className="filter-block__title">
                        {t('Filters')}
                    </h1>

                    <div className="filter-block">

                        <button className="filter-block__head" type="button">
                            <span className="filter-block__head-text">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 2s7 7.58 7 12.5A7 7 0 1 1 5 14.5C5 9.58 12 2 12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                                </svg>
                                {t("Volume")}
                            </span>
                        </button>

                        <ul className="filter-block__checks">
                            {availableVolumes.map((vol) => (
                                <li key={vol}>
                                    <label className="checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedVolumes.includes(normalizeVolume(vol))}
                                            onChange={() => toggleVolume(vol)}
                                        />
                                        <span className="checkbox__box" aria-hidden="true" />
                                        {vol}
                                    </label>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <button type="button" className="filter-clear" onClick={clearFilters}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M4 6h16M9 6V4h6v2M7 6l1 14h8l1-14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {t("Clear filters")}
                    </button>

                </Reveal>

                <div className="details__main">
                    {filteredProducts.length === 0 ? (
                        <p className="details__empty">No products match the selected filters. Try clearing them.</p>
                    ) : (
                        <div className="product-grid product-grid--animate" key={gridKey}>
                            {pagedProducts.map((product, index) => (
                                <article
                                    className="product-card"
                                    key={product.id}
                                    style={{ animationDelay: `${index * 70}ms` }}
                                >
                                    <NavLink to={`/single-products/${product.id}`}>
                                        <ProductImage
                                            src={
                                                product?.images?.length === 2 || product?.images?.length === 3
                                                    ? product?.images?.[1]
                                                    : product?.images?.[0] || img
                                            }
                                            alt={product?.name?.ru || product?.name?.en}
                                        />
                                    </NavLink>

                                    <h3 className="product-card__name">
                                        {product?.name?.ru || product?.name?.en}
                                    </h3>

                                    <p className="product-card__tag">
                                        {product?.tag?.ru || product?.tag?.en}
                                    </p>

                                    <div className="product-card__footer">
                                        <ul className="product-card__volumes">
                                            {product?.volumes?.map((v, i) => (
                                                <li key={i}>{typeof v === 'object' ? (v.value ?? v.volume ?? v.label ?? v.name) : v}</li>
                                            ))}
                                        </ul>

                                        <NavLink to={`/single-products/${product.id}`} className="product-card__cta">
                                            {t("Details")}
                                        </NavLink>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <Reveal as="nav" className="pagination" variant="up" delay={200} aria-label="Pagination">
                            <button
                                type="button"
                                className="pagination__arrow"
                                disabled={page === 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                aria-label="Previous page"
                            >
                                <FaAngleLeft />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <button
                                    type="button"
                                    key={n}
                                    className={`pagination__page${page === n ? ' pagination__page--active' : ''}`}
                                    onClick={() => setPage(n)}
                                >
                                    {n}
                                </button>
                            ))}

                            <button
                                type="button"
                                className="pagination__arrow"
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                aria-label="Next page"
                            >
                                <FaAngleRight />
                            </button>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Details