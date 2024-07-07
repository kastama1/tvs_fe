import React, { Fragment, JSX, useEffect, useState } from 'react'
import './index.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

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
    const [showLinks, setShowLinks] = useState<boolean>(false)

    const navigate = useNavigate()

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
                        <span className="slash">/</span>
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

    useEffect(() => {
        handleShowLinks(false)
    }, [navigate])

    const handleLogout = async () => {
        toggleShowLinks()
        await logout()
    }

    const handleShowLinks = (value: boolean) => {
        setShowLinks(value)
    }

    const toggleShowLinks = () => {
        handleShowLinks(!showLinks)
    }

    return (
        <div className="header">
            <div className="logo-menu">
                <div className="logo">
                    <h1>TVS</h1>
                    <img src={'/logo.png'} alt="Logo" />
                </div>
                <span className="icon">
                    <FontAwesomeIcon icon={faBars} onClick={toggleShowLinks} />
                </span>
            </div>

            <div className={`links ${showLinks ? 'show' : ''}`}>
                {navLinks.map((navlink) => {
                    return navlink
                })}
                {user ? (
                    <button onClick={handleLogout}>Odhlásit se</button>
                ) : (
                    <NavLink
                        onClick={toggleShowLinks}
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
