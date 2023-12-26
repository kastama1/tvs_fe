import './index.scss'
import React, { JSX } from 'react'

interface pageWrapperProps {
    children: JSX.Element
}
const PageWrapper: React.FC<pageWrapperProps> = ({ children }) => {
    return (
        <div className="page-wrapper">
            <div className="container">{children}</div>
        </div>
    )
}

export default PageWrapper
