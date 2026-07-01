import React, { useEffect, useRef, useState } from 'react'
import './distributorSection.scss'

const distributors = [
    { id: 1, country: "Uzbekistan", firm: 'LLC "WINNER UZBEKISTAN"', addr: "Tashkent, Yunusabad district, Amir Temur St. 15", phone: "+998 71 123 45 67" },
    { id: 2, country: "Kazakhstan", firm: 'LLP "WINNER KZ"', addr: "Almaty, Abay St. 100, office 305", phone: "+7 727 123 45 67" },
    { id: 3, country: "Tajikistan", firm: 'LLC "WINNER TAJIKISTAN"', addr: "Dushanbe, Rudaki Ave. 42", phone: "+992 37 123 45 67" },
    { id: 4, country: "Turkmenistan", firm: 'IP «TAGANDURDYEVICH»', addr: "Mary Province, Vekilbazar Etrap, Akgonur", phone: "+993 65 551008" },
    { id: 5, country: "Azerbaijan", firm: 'MMC "WINNER AZERBAIJAN"', addr: "Baku, Nizami St. 56", phone: "+994 12 123 45 67" },
    { id: 6, country: "Kyrgyzstan", firm: 'LLC "WINNER KYRGYZSTAN"', addr: "Bishkek, Chuy Ave. 100", phone: "+996 312 12 34 56" },
]

const PinIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b5262b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
    </svg>
)

const PhoneIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a8f4e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
)

const ArrowIcon = () => (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default function DistributorSection() {
    const [openId, setOpenId] = useState(null)
    const [progress, setProgress] = useState(0)
    const [trackText, setTrackText] = useState('Select a country')
    const [visible, setVisible] = useState([])
    const itemRefs = useRef([])

    useEffect(() => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const i = +e.target.dataset.i
                    setVisible(p => [...new Set([...p, i])])
                }
            })
        }, { threshold: 0.1 })
        itemRefs.current.forEach(el => el && obs.observe(el))
        return () => obs.disconnect()
    }, [])

    const toggle = (d, i) => {
        if (openId === d.id) {
            setOpenId(null)
            setProgress(0)
            setTrackText('Select a country')
        } else {
            setOpenId(d.id)
            setProgress(((i + 1) / distributors.length) * 100)
            setTrackText(`${i + 1} / ${distributors.length} — ${d.country}`)
        }
    }

    return (
        <section className="ds">
            <div className="ds__wrapper container">
                <aside className="ds__left">
                    <p className="ds__badge">
                        <span className="ds__pulse" />
                        Global Network
                    </p>

                    <h2 className="ds__title">
                        Our<br /><em>Distributors</em>
                    </h2>

                    <div className="ds__track">
                        <div className="ds__track-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="ds__track-label">{trackText}</p>
                </aside>

                <div className="ds__list">
                    {distributors.map((d, i) => {
                        const isOpen = openId === d.id
                        return (
                            <div
                                key={d.id}
                                ref={el => itemRefs.current[i] = el}
                                data-i={i}
                                className={[
                                    'ds__item',
                                    isOpen ? 'ds__item--open' : '',
                                    visible.includes(i) ? 'ds__item--show' : ''
                                ].join(' ')}
                                style={{ transitionDelay: `${i * 70}ms` }}
                            >
                                <button
                                    className="ds__head"
                                    onClick={() => toggle(d, i)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="ds__num">0{d.id}</span>
                                    <span className="ds__country">{d.country}</span>
                                    <span className="ds__arrow"><ArrowIcon /></span>
                                </button>

                                <div className={`ds__body${isOpen ? ' ds__body--open' : ''}`}>
                                    <div className="ds__body-inner">
                                        <div className="ds__body-pad">
                                            <p className="ds__firm">{d.firm}</p>
                                            <div className="ds__card">
                                                <div className="ds__row">
                                                    <span className="ds__ico ds__ico--pin"><PinIcon /></span>
                                                    <span>{d.addr}</span>
                                                </div>
                                                <div className="ds__row">
                                                    <span className="ds__ico ds__ico--phone"><PhoneIcon /></span>
                                                    <span>{d.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}