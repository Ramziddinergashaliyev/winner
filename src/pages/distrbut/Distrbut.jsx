// import React from 'react'
// import './distrbut.scss'
// import Reveal from '../../components/reveal/Reveal'
// import DistributorSection from '../../components/distributorSection/DistributorSection'

// import car from '../../assets/images/dist.png'
// import global from '../../assets/images/glob.png'

// const Distrbut = () => {
//     return (
//         <div className="dist">
//             <section className="distrbut">
//                 <div
//                     className="distrbut__panel distrbut__panel--map"
//                     style={{ backgroundImage: `url(${global})` }}
//                 >
//                     <div className="distrbut__overlay" aria-hidden="true" />

//                     <div className="distrbut__content container">
//                         <Reveal as="div" variant="left">
//                             <h2 className="distrbut__title">
//                                 <span>Partnership and </span>
//                                 <br />
//                                 Distributorship
//                             </h2>
//                         </Reveal>

//                         <Reveal as="p" className="distrbut__text" variant="left" delay={120}>
//                             Cooperate with the WINNER brand and lead the market together. Quality, trust and profit are the basis of our partnership.
//                         </Reveal>
//                     </div>
//                 </div>

//                 <span className="distrbut__divider" aria-hidden="true" />

//                 <Reveal
//                     as="div"
//                     className="distrbut__panel distrbut__panel--car distrbut__panel--reveal"
//                     variant="right"
//                     style={{ backgroundImage: `url(${car})` }}
//                 />
//             </section>

//             <DistributorSection />
//         </div>
//     )
// }

// export default Distrbut


import React from 'react'
import './distrbut.scss'
import Reveal from '../../components/reveal/Reveal'
import DistributorSection from '../../components/distributorSection/DistributorSection'

import car from '../../assets/images/dist.png'
import global from '../../assets/images/glob.png'

const Distrbut = () => {
    return (
        <div className="dist">
            <section className="distrbut">
                <div
                    className="distrbut__panel distrbut__panel--map"
                    style={{ backgroundImage: `url(${global})` }}
                >
                    <div className="distrbut__overlay" aria-hidden="true" />

                    <div className="distrbut__content">
                        <Reveal as="div" variant="left">
                            <h2 className="distrbut__title">
                                <span>Partnership and </span>
                                <br />
                                Distributorship
                            </h2>
                        </Reveal>

                        <Reveal as="p" className="distrbut__text" variant="left" delay={120}>
                            Cooperate with the WINNER brand and lead the market together. Quality, trust and profit are the basis of our partnership.
                        </Reveal>
                    </div>
                </div>

                <span className="distrbut__divider" aria-hidden="true" />

                <Reveal
                    as="div"
                    className="distrbut__panel distrbut__panel--car distrbut__panel--reveal"
                    variant="right"
                    style={{ backgroundImage: `url(${car})` }}
                />
            </section>

            <DistributorSection />
        </div>
    )
}

export default Distrbut