import './index.scss'
import React, { JSX } from 'react'

interface tableProps {
    children: JSX.Element
}
const PageWrapper: React.FC<tableProps> = ({ children }) => {
    return (
        <div className="table-container">
            <table className="table">{children}</table>
        </div>
    )
}

export default PageWrapper
