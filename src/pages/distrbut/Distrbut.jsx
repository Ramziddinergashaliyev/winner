import React from 'react'
import "./distrbut.scss"

import car from "../../assets/images/dist.png"
import global from "../../assets/images/glob.png"

const Distrbut = () => {
    return (
        <section className="distrbut">
            <div
                className="distrbut__truck"
                style={{ backgroundImage: `url(${car})` }}
            />

            <div
                className="distrbut__map"
                style={{ backgroundImage: `url(${global})` }}
            />

            <div className="distrbut__base" />
            <div className="distrbut__divider" />

            <div className="distrbut__container">
                <div className="distrbut__content">
                    <h2 className="distrbut__title">
                        <span className="distrbut__title--accent">Cooperation &</span>
                        <span className="distrbut__title--main">Distribution</span>
                    </h2>

                    <span className="distrbut__line" />

                    <p className="distrbut__text">
                        Partner with the WINNER brand and lead the market together.
                        Quality, trust and profit — this is the foundation of our
                        cooperation.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Distrbut