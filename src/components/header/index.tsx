import React, { Fragment, JSX } from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

interface headerProps {
    routes: {
        name: string
        path: string
        element: JSX.Element
    }[]
}
const Header: React.FC<headerProps> = ({ routes }) => {
    const { logout, user } = useAuth({ middleware: 'guest' })

    const links = routes.map((route, index, { length }) => {
        return (
            <Fragment key={index}>
                <NavLink
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    to={route.path}
                >
                    {route.name}
                </NavLink>
                <span>/</span>
            </Fragment>
        )
    })

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="header">
            <div className="logo">
                <h1>TVS</h1>
                <img src={'/logo.png'} />
            </div>
            <div className="links">
                {links}
                {user ? (
                    <button onClick={handleLogout}>Odhlásit se</button>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Přihlásit se
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Header
