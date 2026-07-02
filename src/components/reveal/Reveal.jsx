import { useReveal } from '../../hooks/useReveal'

const Reveal = ({
    as: Tag = 'div',
    className = '',
    delay = 0,
    variant = 'up',
    children,
    style,
    ...rest
}) => {
    const [ref, visible] = useReveal()

    return (
        <Tag
            ref={ref}
            className={`reveal reveal--${variant} ${visible ? 'reveal--visible' : ''} ${className}`.trim()}
            style={{ transitionDelay: `${delay}ms`, ...style }}
            {...rest}
        >
            {children}
        </Tag>
    )
}

export default Reveal
