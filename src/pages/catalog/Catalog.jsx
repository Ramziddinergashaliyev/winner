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
import { useTranslation } from 'react-i18next'

const Catalog = ({ embedded = false }) => {
    const { t, i18n } = useTranslation()
    const { data } = useGetCategoriesQuery()

    return (
        <section className={`catalog ${embedded ? 'catalog--embedded' : ''}`}>
            <div className="container">
                <div className="catalog-wrapper">

                    <div className="catalog-info">
                        <h2 className='catalog-info-title'>{t("catalog")}</h2>
                        <p className='catalog-info-text'>{t("LUBRICANTS")}</p>
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
                                    <h3 className="catalog-card__info-text">{i18n?.languages?.[0] === "ru" ? item?.title?.ru : item?.title?.en}</h3>
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