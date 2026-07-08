import React from 'react'
import "./texnalogy.scss"

const Leaf = ({ cx, cy, angle }) => (
    <ellipse
        cx={cx}
        cy={cy}
        rx="3.1"
        ry="1.5"
        transform={`rotate(${angle} ${cx} ${cy})`}
        className="leaf"
    />
)

const LaurelWreath = ({ side }) => {
    const cx = 32
    const cy = 36
    const radius = 17
    const count = 7
    const leaves = []

    for (let i = 0; i < count; i++) {
        const t = i / (count - 1)
        const startAngle = side === -1 ? 205 : -25
        const endAngle = side === -1 ? 65 : 115
        const angle = startAngle + t * (endAngle - startAngle) * (side === -1 ? 1 : -1)
        const rad = (angle * Math.PI) / 180
        const x = cx + radius * Math.cos(rad)
        const y = cy - radius * Math.sin(rad)
        const tilt = angle + (side === -1 ? -55 : 55)
        leaves.push(<Leaf key={`${side}-${i}`} cx={x} cy={y} angle={tilt} />)
    }

    return <g>{leaves}</g>
}

const TrophyIcon = () => (
    <svg viewBox="0 0 64 64" className="icon-svg" xmlns="http://www.w3.org/2000/svg">
        <LaurelWreath side={-1} />
        <LaurelWreath side={1} />
        <g className="icon-stroke">
            <path d="M23 16h18v9a9 9 0 0 1-18 0v-9z" />
            <path d="M23 19h-5.5a5.5 5.5 0 0 0 5.5 7.5" />
            <path d="M41 19h5.5a5.5 5.5 0 0 1-5.5 7.5" />
            <line x1="32" y1="34" x2="32" y2="41" />
            <path d="M23 47h18l-2.5-5h-13l-2.5 5z" />
        </g>
        <text x="32" y="24" textAnchor="middle" className="icon-number">1</text>
    </svg>
)

const MoleculeIcon = () => (
    <svg viewBox="0 0 64 64" className="icon-svg" xmlns="http://www.w3.org/2000/svg">
        <g className="icon-stroke">
            <line x1="23" y1="19" x2="43" y2="14" />
            <line x1="23" y1="19" x2="17" y2="33" />
            <line x1="23" y1="19" x2="35" y2="40" />
            <line x1="35" y1="40" x2="46" y2="31" />
            <line x1="35" y1="40" x2="17" y2="33" />
        </g>
        <circle cx="23" cy="19" r="6" className="node node--lg" />
        <circle cx="43" cy="14" r="3.4" className="node node--sm" />
        <circle cx="17" cy="33" r="3" className="node node--sm" />
        <circle cx="35" cy="40" r="6" className="node node--lg" />
        <circle cx="46" cy="31" r="3.4" className="node node--sm" />
    </svg>
)

const ShieldIcon = () => (
    <svg viewBox="0 0 64 64" className="icon-svg" xmlns="http://www.w3.org/2000/svg">
        <g className="icon-stroke">
            <path d="M32 14l15 5.5v11c0 11-6.5 17.5-15 20.5-8.5-3-15-9.5-15-20.5v-11L32 14z" />
            <path d="M32 20l9.5 3.5v7c0 7-4 11-9.5 13-5.5-2-9.5-6-9.5-13v-7L32 20z" />
        </g>
    </svg>
)

const features = [
    {
        id: 'quality',
        Icon: TrophyIcon,
        title: 'ЛЕГЕНДА КАЧЕСТВА',
        text: 'WINNER – это европейское качество, проверенное временем и тысячами довольных клиентов.',
    },
    {
        id: 'tech',
        Icon: MoleculeIcon,
        title: 'ПЕРЕДОВЫЕ ТЕХНОЛОГИИ',
        text: 'Инновационные формулы обеспечивают максимальную защиту двигателя в любых условиях.',
    },
    {
        id: 'protection',
        Icon: ShieldIcon,
        title: 'ЗАЩИТА И НАДЁЖНОСТЬ',
        text: 'Надёжная защита от износа, чистота двигателя и стабильная работа при любых нагрузках.',
    },
]

const Texnalogy = () => {
    return (
        <section className="texnalogy">
            <div className="texnalogy__inner container">
                {features.map(({ id, Icon, title, text }) => (
                    <div className="texnalogy__card" key={id}>
                        <div className="texnalogy__icon">
                            <Icon />
                        </div>

                        <div className="texnalogy__content">
                            <h3 className="texnalogy__title">{title}</h3>
                            <span className="texnalogy__divider" />
                            <p className="texnalogy__text">{text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Texnalogy