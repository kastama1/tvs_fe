import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home'
import Login from './pages/login'
import PageWrapper from './components/page-wrapper'
import Registration from './pages/registration'
import { ToastContainer } from 'react-toastify'
import moment from 'moment-timezone'
import Election from './pages/election/list'
import ElectionShow from './pages/election/show'
import ElectionCreate from './pages/election/create'
import ElectionEdit from './pages/election/edit'
import ElectionParty from './pages/election-party/list'
import ElectionPartyShow from './pages/election-party/show'
import ElectionPartyCreate from './pages/election-party/create'
import ElectionPartyEdit from './pages/election-party/edit'
import ElectionAssignElectionParties from './pages/election/assign-election-parties'
import Candidate from './pages/candidate/list'
import CandidateShow from './pages/candidate/show'
import CandidateCreate from './pages/candidate/create'
import CandidateEdit from './pages/candidate/edit'

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
            auth: true,
        },
        {
            name: 'Politické strany',
            path: '/election-parties',
            element: <ElectionParty />,
            auth: true,
        },
        {
            name: 'Kandidáti',
            path: '/candidates',
            element: <Candidate />,
            auth: true,
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
            path: '/elections/:id/assign-election-parties',
            element: <ElectionAssignElectionParties />,
        },
        {
            path: '/election-parties/:id',
            element: <ElectionPartyShow />,
        },
        {
            path: '/election-parties/create',
            element: <ElectionPartyCreate />,
        },
        {
            path: '/election-parties/:id/edit',
            element: <ElectionPartyEdit />,
        },
        {
            path: '/candidates/:id',
            element: <CandidateShow />,
        },
        {
            path: '/candidates/create',
            element: <CandidateCreate />,
        },
        {
            path: '/candidates/:id/edit',
            element: <CandidateEdit />,
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
                limit={5}
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
