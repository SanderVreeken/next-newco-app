import { useState } from 'react'

export default function Button({ background, border, color, hoverBackground, hoverBorder, hoverColor, text, type, width }) {
    const [isHovered, setIsHovered] = useState(false)

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