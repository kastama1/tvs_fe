import React, { Fragment, JSX, useEffect, useState } from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

interface headerProps {
    routes: {
        navlink?: React.JSX.Element
        name: string
        path: string
        element: JSX.Element
        auth?: boolean
        role?: string
    }[]
}
const Header: React.FC<headerProps> = ({ routes }) => {
    const { logout, user } = useAuth({ middleware: undefined })
    const [navLinks, setNavLinks] = useState<any[]>([])

    const renderLink = () => {
        const links: React.SetStateAction<any[]> = []

        routes.forEach((route, index) => {
            if (
                (user && route.auth && route.role === user.role) ||
                !route.auth
            ) {
                const link = (
                    <Fragment key={index}>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                            to={route.path}
                        >
                            {route.name}
                        </NavLink>
                        <span>/</span>
                    </Fragment>
                )
                links.push(link)
            }
        })
        setNavLinks(links)
    }

    useEffect(() => {
        renderLink()
    }, [user])

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="header">
            <div className="logo">
                <h1>TVS</h1>
                <img src={'/logo.png'} alt="Logo" />
            </div>
            <div className="links">
                {navLinks.map((navlink) => {
                    return navlink
                })}
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
