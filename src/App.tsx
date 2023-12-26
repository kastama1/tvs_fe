import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home'
import Login from './pages/login'
import PageWrapper from './components/page-wrapper'
import Registration from './pages/registration'
import { ToastContainer } from 'react-toastify'
import Election from './pages/election/list'
import ElectionShow from './pages/election/show'
import ElectionCreate from './pages/election/create'
import ElectionEdit from './pages/election/edit'
import moment from 'moment-timezone'

function App(this: any) {
    moment.tz.setDefault('Europe/Prague')

    const headerRoutes = [
        {
            name: 'Domů',
            path: '/',
            element: <Home />,
        },
        {
            name: 'Volby',
            path: '/elections',
            element: <Election />,
        },
    ]

    const routes = [
        {
            path: '/elections/:id',
            element: <ElectionShow />,
        },
        {
            path: '/elections/create',
            element: <ElectionCreate />,
        },
        {
            path: '/elections/:id/edit',
            element: <ElectionEdit />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/registration',
            element: <Registration />,
        },
    ]

    const allRoutes = [...routes, ...headerRoutes]

    const routesComponents = allRoutes.map((route, index) => {
        return <Route path={route.path} element={route.element} key={index} />
    })

    return (
        <>
            <Header routes={headerRoutes} />
            <PageWrapper>
                <Routes>{routesComponents}</Routes>
            </PageWrapper>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default App
