import './index.scss'
import React from 'react'

interface headingProps {
    children: string
}
const Heading: React.FC<headingProps> = ({ children }) => {
    return (
        <div className="heading-container">
            <h2 className="heading">{children}</h2>
        </div>
    )
}

export default Heading
