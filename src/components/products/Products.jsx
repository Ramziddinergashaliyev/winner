import React, { useRef } from "react";
import img from "../../assets/images/winner.webp";

import "./products.scss";

const productsData = [
    { id: 1, name: "WINNER", type: "5W-30 | SP | C3" },
    { id: 2, name: "WINNER", type: "0W-20 | SP | RC" },
    { id: 3, name: "WINNER", type: "5W-40 | SN | C3" },
    { id: 4, name: "WINNER", type: "10W-40 | SL | CF" },
    { id: 5, name: "WINNER", type: "15W-30 | SL | CF" },
];

const Products = () => {
    const sliderRef = useRef(null);

    const scroll = (direction) => {
        if (!sliderRef.current) return;
        const { clientWidth } = sliderRef.current;
        sliderRef.current.scrollBy({
            left: direction === "left" ? -clientWidth / 2 : clientWidth / 2,
            behavior: "smooth",
        });
    };

    return (
        <section className="products">
            <div className="products__container">
                <div className="products__header">
                    <h2 className="products__title">OUR PRODUCTS</h2>
                    <a href="#" className="products__view-all">
                        VIEW ALL <span>›</span>
                    </a>
                </div>

                <div className="products__slider-wrapper">
                    <button
                        className="products__arrow products__arrow--left"
                        onClick={() => scroll("left")}
                        aria-label="Previous"
                    >
                        ‹
                    </button>

                    <div className="products__slider" ref={sliderRef}>
                        {productsData.map((item) => (
                            <div className="products__card" key={item.id}>
                                <img src={img} alt={item.name} className="products__img" />
                                <div className="products__info">
                                    <h3 className="products__name">{item.name}</h3>
                                    <p className="products__type">{item.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="products__arrow products__arrow--right"
                        onClick={() => scroll("right")}
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>

                <div className="products__dots">
                    <span className="products__dot products__dot--active"></span>
                    <span className="products__dot"></span>
                    <span className="products__dot"></span>
                    <span className="products__dot"></span>
                </div>
            </div>
        </section>
    );
};

export default Products;