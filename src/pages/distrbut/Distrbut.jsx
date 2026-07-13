import React, { useState } from 'react'
import './distrbut.scss'

const countries = [
    {
        id: '01',
        name: 'УЗБЕКИСТАН',
        distributors: [
            {
                company: 'ООО «ЮНИМАКС ТЕХНИКС»',
                address: 'Узбекистан, Ташкент Регион ул 4K 744A, Зангиота, 100000, (EXZAP Автозапчасти и Масла)',
                phone: '+998712033344',
            },
        ],
    },
    {
        id: '02',
        name: 'КАЗАХСТАН',
        distributors: [
            {
                company: 'TOO «AVTODETAIL»',
                address: 'Казахстан, Южно-Казахстанская область, 160021, город Шымкент, Абайский район, ул Байтулы баба 14А',
                phone: '77022837999',
            },
        ],
    },
    {
        id: '03',
        name: 'ТАДЖИКИСТАН',
        distributors: [
            {
                company: 'ООО «ТОСОЛ-ПЛЮС»',
                address: 'Таджикистан, Согдийская область, Дж. Расуловский район, пгт Мехробод ул. И. Нурматов 45/4',
                phone: '+992 92 707 49 86',
            },
        ],
    },
    {
        id: '04',
        name: 'ТУРКМЕНИСТАН',
        distributors: [
            {
                company: 'ИП «НУРЫЕВ ГУВАНЧ ТАГАНДУРДЫЕВИЧ»',
                address: 'Туркменистан, Марыйский велаят, Векилбазар Этрап, Акгонур',
                phone: '+993 65 551008',
            },
        ],
    },
    {
        id: '05',
        name: 'АЗЕРБАЙДЖАН',
        distributors: [
            {
                company: 'OOO «ILKIN-N»',
                address: 'Респ. Азербайджан, Сальянский район д. Карабаглы',
                phone: '+99 450 321 44 72',
            },
        ],
    },
    {
        id: '06',
        name: 'КАЗАХСТАН',
        distributors: [
            {
                company: 'TOO «TANAUTO KAZAKHSTAN»',
                address: 'г. Алматы пр. Райымбека д. 169 А',
                phone: '+7 701 711 0430',
            },
        ],
    },
    {
        id: '07',
        name: 'КЫРГЫЗСТАН',
        distributors: [
            {
                company: 'ООО «КАРД ГРУПП»',
                address: 'Кыргызская Республика, г г.Бишкек, ул.Садыгалиева 1',
                phone: '+996 702 676 514',
            },
        ],
    },
]

const countriesEN = [
    {
        id: '01',
        name: 'UZBEKISTAN',
        distributors: [
            {
                company: 'LLC «UNIMAX TECHNICS»',
                address: 'Узбекистан, Ташкент Регион ул 4K 744A, Зангиота, 100000, (EXZAP Автозапчасти и Масла)',
                phone: '+998712033344',
            },
        ],
    },
    {
        id: '02',
        name: 'KAZAKHSTAN',
        distributors: [
            {
                company: 'LLP «AVTODETAIL»',
                address: 'Kazakhstan, South Kazakhstan Region, 160021, Shymkent City, Abai District, 14A Baituly Baba St',
                phone: '77022837999',
            },
        ],
    },
    {
        id: '03',
        name: 'TAJIKISTAN',
        distributors: [
            {
                company: 'LLC «TOSOL-PLUS»',
                address: 'Tajikistan, Sughd Region, J. Rasulov District, Mehrobod Settlement, 45/4 I. Nurmatov St',
                phone: '+992 92 707 49 86',
            },
        ],
    },
    {
        id: '04',
        name: 'TURKMENISTAN',
        distributors: [
            {
                company: 'IE «NURYYEV GUVANCH TAGANDURDYEVICH»',
                address: 'Turkmenistan, Mary Region, Vekilbazar District, Akgonur',
                phone: '+993 65 551008',
            },
        ],
    },
    {
        id: '05',
        name: 'AZERBAIJAN',
        distributors: [
            {
                company: 'LIC «ILKIN-N»',
                address: 'Salyansk area, Karabagly h',
                phone: '+99 450 321 4472',
            },
        ],
    },
    {
        id: '06',
        name: 'KAZAKHSTAN',
        distributors: [
            {
                company: 'TOO «Tanauto Kazakhstan»',
                address: 'Almaty. Raimbek avenue 169 A',
                phone: '+7 701 711 0430',
            },
        ],
    },
    {
        id: '07',
        name: 'KYRGYZSTAN',
        distributors: [
            {
                company: 'LLC «KARD GROUP»',
                address: 'Kyrgyz Republic, Bishkek city, Sadygalieva str. 1',
                phone: '+996 702 676 514',
            },
        ],
    },
]

const stats = [
    { icon: 'globe', value: '30+', label: 'Countries' },
    { icon: 'partners', value: '200+', label: 'Partners' },
    { icon: 'support', value: '24/7', label: 'Support' },
]

const StatIcon = ({ type }) => {
    if (type === 'globe') {
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 12h18M12 3c2.4 2.5 3.7 5.8 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.8-3.7-9s1.3-6.5 3.7-9Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        )
    }

    if (type === 'partners') {
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.5 20c0-3.2 2.5-5.3 5.5-5.3s5.5 2.1 5.5 5.3M14 20c0-2.5 1.8-4.3 4-4.3s4 1.8 4 4.3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5l3.2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

const Distrbut = () => {
    const [activeId, setActiveId] = useState(null)

    const toggleCountry = (id) => {
        setActiveId((prev) => (prev === id ? null : id))
    }

    const half = Math.ceil(countries.length / 2)
    const columns = [countries.slice(0, half), countries.slice(half)]

    return (
        <section className="distrbut">
            <div className="distrbut__top">
                <div className="container distrbut__inner-container">
                    <div className="distrbut__content">
                        <span className="distrbut__label">Global network</span>
                        <h2 className="distrbut__title">
                            Official <span className="distrbut__title-accent">Distributors.</span>
                            <br />
                            Stronger Together.
                        </h2>
                        <p className="distrbut__desc">
                            Join our global network of trusted partners and deliver
                            performance that drives results.
                        </p>

                        <div className="distrbut__stats">
                            {stats.map((stat) => (
                                <div className="distrbut__stat" key={stat.label}>
                                    <span className="distrbut__stat-icon">
                                        <StatIcon type={stat.icon} />
                                    </span>
                                    <span className="distrbut__stat-value">{stat.value}</span>
                                    <span className="distrbut__stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="distrbut__list container">
                {columns.map((col, colIndex) => (
                    <div className="distrbut__column" key={colIndex}>
                        {col.map((country) => {
                            const isActive = activeId === country.id
                            return (
                                <div
                                    className={`distrbut__item ${isActive ? 'distrbut__item--active' : ''}`}
                                    key={country.id}
                                >
                                    <button
                                        type="button"
                                        className="distrbut__item-head"
                                        onClick={() => toggleCountry(country.id)}
                                        aria-expanded={isActive}
                                    >
                                        <span className="distrbut__item-index">{country.id}</span>
                                        <span className="distrbut__item-name">{country.name}</span>
                                        <span className="distrbut__item-toggle">
                                            <span className="distrbut__item-toggle-line distrbut__item-toggle-line--v" />
                                            <span className="distrbut__item-toggle-line" />
                                        </span>
                                    </button>

                                    <div className="distrbut__item-body">
                                        <div className="distrbut__item-body-inner">
                                            <div className="distrbut__panel">
                                                <div className="distrbut__panel-head">
                                                    <span className="distrbut__panel-title">{country.name}</span>
                                                    <button
                                                        type="button"
                                                        className="distrbut__panel-close"
                                                        onClick={() => toggleCountry(country.id)}
                                                        aria-label="Close"
                                                    >
                                                        <span />
                                                        <span />
                                                    </button>
                                                </div>

                                                {country.distributors.map((dist, i) => (
                                                    <div className="distrbut__dist" key={i}>
                                                        <p className="distrbut__dist-company">{dist.company}</p>
                                                        <p className="distrbut__dist-address">{dist.address}</p>
                                                        <p className="distrbut__dist-phone">{dist.phone}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Distrbut