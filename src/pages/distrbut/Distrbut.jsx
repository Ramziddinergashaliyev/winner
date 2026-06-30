import React, { useEffect } from 'react'
import "./distrbut.scss"

import car from "../../assets/images/dist.png"
import global from "../../assets/images/glob.png"

const Distrbut = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="dist">
            <section className="distrbut">
                <div
                    className="distrbut__panel distrbut__panel--map"
                    style={{ backgroundImage: `url(${global})` }}
                >
                    <div className="distrbut__overlay" aria-hidden="true" />

                    <div className="distrbut__content container">

                        <h2 className="distrbut__title">
                            <span>Partnership and </span>
                            <br />
                            Distributorship
                        </h2>

                        <p className="distrbut__text">
                            Cooperate with the WINNER brand and lead the market together. Quality, trust and profit are the basis of our partnership.
                        </p>

                    </div>
                </div>

                <span className="distrbut__divider" aria-hidden="true" />

                <div
                    className="distrbut__panel distrbut__panel--car"
                    style={{ backgroundImage: `url(${car})` }}
                />
            </section>
        </div>
    )
}

export default Distrbut