import React, { useMemo, useState } from 'react'
import './details.scss'
import img from '../../assets/images/winner.webp'
import { NavLink, useParams } from 'react-router-dom'
import Reveal from '../../components/reveal/Reveal'
import { useGetCategoriesByIdQuery } from '../../services/categoryApi'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const VOLUMES = ['1L', '4L', '5L', '10L']

const PER_PAGE = 6

const Details = () => {
    const [selectedVolumes, setSelectedVolumes] = useState([])
    const [page, setPage] = useState(1)
    const { id } = useParams()
    const { data, isLoading, isError } = useGetCategoriesByIdQuery(id)
    console.log(data)

    const toggleVolume = (vol) => {
        setSelectedVolumes((prev) =>
            prev.includes(vol) ? prev.filter((v) => v !== vol) : [...prev, vol]
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
            const matchesVolume =
                selectedVolumes.length === 0 ||
                selectedVolumes.some((v) => product.volumes?.includes(v))
            return matchesVolume
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
            <div className="details__hero"></div>

            <div className="details__body container">
                <Reveal as="aside" className="details__sidebar" variant="left" aria-label="Filters">

                    <h1 className="filter-block__title">
                        {data?.name?.ru || data?.name?.en || 'Category'}
                    </h1>

                    <div className="filter-block">

                        <button className="filter-block__head" type="button">
                            <span className="filter-block__head-text">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 2s7 7.58 7 12.5A7 7 0 1 1 5 14.5C5 9.58 12 2 12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                                </svg>
                                Volume
                            </span>
                        </button>

                        <ul className="filter-block__checks">
                            {VOLUMES.map((vol) => (
                                <li key={vol}>
                                    <label className="checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedVolumes.includes(vol)}
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
                        Clear filters
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
                                    <div className="product-card__image">
                                        <img
                                            src={product?.images?.[0] || img}
                                            alt={product?.name?.ru || product?.name?.en}
                                            loading="lazy"
                                        />
                                    </div>

                                    <h3 className="product-card__name">
                                        {product?.name?.ru || product?.name?.en}
                                    </h3>

                                    <p className="product-card__tag">
                                        {product?.tag?.ru || product?.tag?.en}
                                    </p>

                                    <div className="product-card__footer">
                                        <ul className="product-card__volumes">
                                            {product?.volumes?.map((v) => (
                                                <li key={v}>{v}</li>
                                            ))}
                                        </ul>

                                        <NavLink to={`/single-products/${product.id}`} className="product-card__cta">
                                            Details
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