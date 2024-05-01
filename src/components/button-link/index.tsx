import React, { JSX } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

interface buttonLinkProps {
    children: JSX.Element | string
    to: string
}
const ButtonLink: React.FC<buttonLinkProps> = ({ children, to }) => {
    return (
        <Link className="button-link" to={to}>
            {children}
        </Link>
    )
}

export default ButtonLink
