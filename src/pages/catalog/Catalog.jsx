import React from 'react'
import Reveal from '../../components/reveal/Reveal'
import { NavLink } from 'react-router-dom'

import './catalog.scss'

import ant from '../../assets/images/catalog/ant.webp'
import gid from '../../assets/images/catalog/gid.webp'
import leg from '../../assets/images/catalog/leg.webp'
import mM from '../../assets/images/catalog/mM.webp'
import trans from '../../assets/images/catalog/trans.webp'
import washer from '../../assets/images/catalog/washer.webp'
import { useGetCategoriesQuery } from '../../services/categoryApi'

const categories = [
    {
        title: 'Motor oils for passenger cars and light commercial vehicles',
        image: leg,
    },
    {
        title: 'Motor oils for diesel engines',
        image: mM,
    },
    {
        title: 'Transmission oils',
        image: trans,
    },
    {
        title: 'Hydraulic oils',
        image: gid,
    },
    {
        title: 'Antifreeze',
        image: ant,
    },
    {
        title: 'Window washers',
        image: washer,
    }
]

const Catalog = ({ embedded = false }) => {
    const { data } = useGetCategoriesQuery()

    return (
        <section className={`catalog ${embedded ? 'catalog--embedded' : ''}`}>
            <div className="container">
                <div className="catalog-wrapper">
                    <div className="catalog-info">
                        <h2 className='catalog-info-title'>Catalog</h2>
                        <p className='catalog-info-text'>LUBRICANTS,FLUIDS AND AUTOMATIVE CARE</p>
                    </div>

                    <div className="catalog__grid">
                        {data?.map((item, index) => (
                            <Reveal
                                as={NavLink}
                                to={`/categories/${item?.id}`}
                                className="catalog-card"
                                key={item?.title?.en}
                                variant="scale"
                                delay={index * 80}
                                style={{
                                    backgroundImage: `url(${item?.images?.[0]})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="catalog-card__overlay" />
                                <div className="catalog-card__info">
                                    <h3 className="catalog-card__info-text">{item?.title?.en}</h3>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Catalog