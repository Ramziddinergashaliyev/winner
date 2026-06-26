import "./hero.scss";

function Hero() {
    return (
        <section className="hero">
            <div className="container hero__container">
                <h1 className="hero__container-title">THE POWER OF PERFORMANCE. ENGINEERED TO WIN.</h1>
                <p className="hero__container-text">Explore our full range of advanced automotive fluids.</p>
                <button className="hero__container-btn">VIEW PRODUCT PORTFOLIO</button>
            </div>
        </section>
    );
}

export default Hero;