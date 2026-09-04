import React, { useMemo, useState, useEffect } from 'react'
import './details.scss'
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

import bgOneRu from "../../assets/images/productBg-ru/ant.webp"
import bgTwoRu from "../../assets/images/productBg-ru/diesel.webp"
import bgThreeRu from "../../assets/images/productBg-ru/hyd.webp"
import bgFourRu from "../../assets/images/productBg-ru/singleBg.webp"
import bgFifeRu from "../../assets/images/productBg-ru/tran.webp"
import bgSixRu from "../../assets/images/productBg-ru/wind.webp"

import bgOneMb from "../../assets/images/productBg/antMb.webp"
import bgTwoMb from "../../assets/images/productBg/dieselMb.webp"
import bgThreeMb from "../../assets/images/productBg/hydMb.webp"
import bgFourMb from "../../assets/images/productBg/singleBgMb.webp"
import bgFifeMb from "../../assets/images/productBg/tranMb.webp"
import bgSixMb from "../../assets/images/productBg/windMb.webp"

import bgOneRuMb from "../../assets/images/productBg-ru/antMb.webp"
import bgTwoRuMb from "../../assets/images/productBg-ru/dieselMb.webp"
import bgThreeRuMb from "../../assets/images/productBg-ru/hydMb.webp"
import bgFourRuMb from "../../assets/images/productBg-ru/singleBgMb.webp"
import bgFifeRuMb from "../../assets/images/productBg-ru/tranMb.webp"
import bgSixRuMb from "../../assets/images/productBg-ru/windMb.webp"

const PER_PAGE = 6
const MOBILE_BREAKPOINT = 700

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

const CATEGORY_BANNERS_RU = {
    5: bgOneRu,
    2: bgTwoRu,
    4: bgThreeRu,
    3: bgFifeRu,
    6: bgSixRu,
    1: bgFourRu,
}

const CATEGORY_BANNERS_MB = {
    5: bgOneMb,
    2: bgTwoMb,
    4: bgThreeMb,
    3: bgFifeMb,
    6: bgSixMb,
    1: bgFourMb,
}

const CATEGORY_BANNERS_RU_MB = {
    5: bgOneRuMb,
    2: bgTwoRuMb,
    4: bgThreeRuMb,
    3: bgFifeRuMb,
    6: bgSixRuMb,
    1: bgFourRuMb,
}

const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' && window.innerWidth <= breakpoint
    )

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [breakpoint])

    return isMobile
}

const getCategoryBanner = (data, id, lang, isMobile) => {
    const categoryId = String(data?.id ?? id ?? '')
    const isRu = typeof lang === 'string' && lang.toLowerCase().startsWith('ru')

    let banners
    let fallback

    if (isMobile) {
        banners = isRu ? CATEGORY_BANNERS_RU_MB : CATEGORY_BANNERS_MB
        fallback = isRu ? bgFourRuMb : bgFourMb
    } else {
        banners = isRu ? CATEGORY_BANNERS_RU : CATEGORY_BANNERS
        fallback = isRu ? bgFourRu : bgFour
    }

    const entry = Object.entries(banners).find(([key]) => key === categoryId)
    return entry ? entry[1] : fallback
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
    const isMobile = useIsMobile()

    const heroBanner = useMemo(
        () => getCategoryBanner(data, id, i18n.language, isMobile),
        [data, id, i18n.language, isMobile]
    )

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