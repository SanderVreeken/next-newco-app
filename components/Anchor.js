import Link from 'next/link'

export default function Anchor({ child, href }) {
    return (
        <Link href={href}>
            <a>
                {child}
            </a>
        </Link>
    )
}