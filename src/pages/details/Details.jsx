import React, { useEffect, useMemo, useState } from "react";
import "./details.scss";
import img from "../../assets/images/winner.webp";
import { NavLink } from "react-router-dom";

const CATEGORIES = [
    { id: "all", label: "All Products" },
    { id: "engine", label: "Engine Oil" },
    { id: "transmission", label: "Transmission Oil" },
    { id: "industrial", label: "Industrial Oils" },
    { id: "grease", label: "Grease" },
    { id: "special", label: "Special Fluids" },
];

const VOLUMES = ["1L", "4L", "5L", "10L"];

const PRODUCTS = [
    {
        id: 1,
        name: "Winner V-City 5W-30",
        tag: "Synthetic Motor Oil",
        category: "engine",
        volumes: ["1L", "4L", "5L"],
    },
    {
        id: 2,
        name: "Winner V-Pro 5W-40",
        tag: "Fully Synthetic",
        category: "engine",
        volumes: ["1L", "4L", "5L"],
    },
    {
        id: 3,
        name: "Winner V-Axle 75W-90",
        tag: "Fully Synthetic Gear Oil",
        category: "transmission",
        volumes: ["1L", "4L", "10L"],
    },
    {
        id: 4,
        name: "Winner V-Trans ATF VI",
        tag: "Fully Synthetic",
        category: "transmission",
        volumes: ["1L", "4L", "10L"],
    },
    {
        id: 5,
        name: "Winner V-Industry 46",
        tag: "Machine Oil",
        category: "industrial",
        volumes: ["4L", "5L", "10L"],
    },
    {
        id: 6,
        name: "Winner V-Grease EP 2",
        tag: "Lithium Grease",
        category: "grease",
        volumes: ["1L", "4L"],
    },
    {
        id: 7,
        name: "Winner V-Cool Concentrate",
        tag: "Coolant",
        category: "special",
        volumes: ["1L", "4L", "10L"],
    },
    {
        id: 8,
        name: "Winner V-Brake DOT 4",
        tag: "Brake Fluid",
        category: "special",
        volumes: ["1L", "4L"],
    },
    {
        id: 9,
        name: "Winner V-Gear 80W-90",
        tag: "Mineral Gear Oil",
        category: "transmission",
        volumes: ["1L", "5L", "10L"],
    },
];

const PER_PAGE = 6;

const Details = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedVolumes, setSelectedVolumes] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const toggleVolume = (vol) => {
        setSelectedVolumes((prev) =>
            prev.includes(vol) ? prev.filter((v) => v !== vol) : [...prev, vol]
        );
        setPage(1);
    };

    const handleCategory = (id) => {
        setActiveCategory(id);
        setPage(1);
    };

    const clearFilters = () => {
        setActiveCategory("all");
        setSelectedVolumes([]);
        setPage(1);
    };

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter((product) => {
            const matchesCategory =
                activeCategory === "all" || product.category === activeCategory;
            const matchesVolume =
                selectedVolumes.length === 0 ||
                selectedVolumes.some((v) => product.volumes.includes(v));
            return matchesCategory && matchesVolume;
        });
    }, [activeCategory, selectedVolumes]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PER_PAGE));

    const pagedProducts = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        return filteredProducts.slice(start, start + PER_PAGE);
    }, [filteredProducts, page]);

    return (
        <section className="details">
            <div className="details__hero">
                <div className="details__hero-inner container">
                    <h1 className="details__title">Products</h1>
                    <p className="details__subtitle">
                        Winner Quality — In Every Drop
                    </p>
                </div>
            </div>

            <div className="details__body">
                <aside className="details__sidebar" aria-label="Filters">
                    <div className="filter-block">
                        <button className="filter-block__head" type="button">
                            <span className="filter-block__head-text">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M3 4h18l-7 9v6l-4 2v-8L3 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                                </svg>
                                Category
                            </span>
                        </button>
                        <ul className="filter-block__list">
                            {CATEGORIES.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        type="button"
                                        className={`filter-block__item${activeCategory === cat.id
                                            ? " filter-block__item--active"
                                            : ""
                                            }`}
                                        onClick={() => handleCategory(cat.id)}
                                    >
                                        <span className="filter-block__dot" aria-hidden="true" />
                                        {cat.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

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

                    <button
                        type="button"
                        className="filter-clear"
                        onClick={clearFilters}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M4 6h16M9 6V4h6v2M7 6l1 14h8l1-14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Clear filters
                    </button>
                </aside>

                <div className="details__main">
                    {filteredProducts.length === 0 ? (
                        <p className="details__empty">
                            No products match the selected filters. Try clearing them.
                        </p>
                    ) : (
                        <div className="product-grid">
                            {pagedProducts.map((product) => (
                                <article className="product-card" key={product.id}>
                                    <div className="product-card__image">
                                        <img src={img} alt={product.name} loading="lazy" />
                                    </div>

                                    <h3 className="product-card__name">{product.name}</h3>
                                    <p className="product-card__tag">{product.tag}</p>

                                    <div className="product-card__footer">
                                        <ul className="product-card__volumes">
                                            {product.volumes.map((v) => (
                                                <li key={v}>{v}</li>
                                            ))}
                                        </ul>
                                        <NavLink to={"/single-products"} type="button" className="product-card__cta">
                                            Details
                                        </NavLink>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <nav className="pagination" aria-label="Pagination">
                        <button
                            type="button"
                            className="pagination__arrow"
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            aria-label="Previous page"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button
                                type="button"
                                key={n}
                                className={`pagination__page${page === n ? " pagination__page--active" : ""
                                    }`}
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
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default Details;