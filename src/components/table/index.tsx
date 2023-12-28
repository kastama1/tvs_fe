import './index.scss'
import React, { JSX } from 'react'

interface tableProps {
    children: JSX.Element
}
const PageWrapper: React.FC<tableProps> = ({ children }) => {
    return <table className="table">{children}</table>
}

export default PageWrapper
