import { useState } from 'react'

export default function Button({ background, border, color, hoverBackground, hoverBorder, hoverColor, onClick, text, type, width }) {
    const [isHovered, setIsHovered] = useState(false)

    // As the button is also used for the anchor element, a check is needed to see whether a onClick function is defined.
    if (onClick) {
        return (
            <button onClick={(event) => onClick(event)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} type={type} style={{
                backgroundColor: isHovered ? hoverBackground : background,
                borderColor: border ? ( isHovered ? hoverBorder : border ) : background,
                color: isHovered ? hoverColor : color,
                width: width
            }}>
                {text}
            </button>
        )
    } else {
        return (
            <button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} type={type} style={{
                backgroundColor: isHovered ? hoverBackground : background,
                borderColor: border ? ( isHovered ? hoverBorder : border ) : background,
                color: isHovered ? hoverColor : color,
                width: width
            }}>
                {text}
            </button>
        )
    }
}