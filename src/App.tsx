import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home'
import Login from './pages/login'
import PageWrapper from './components/page-wrapper'
import Registration from './pages/registration'
import { ToastContainer } from 'react-toastify'
import moment from 'moment-timezone'
import Election from './pages/admin/election/list'
import ElectionShow from './pages/admin/election/show'
import ElectionCreate from './pages/admin/election/create'
import ElectionEdit from './pages/admin/election/edit'
import ElectionParty from './pages/admin/election-party/list'
import ElectionPartyShow from './pages/admin/election-party/show'
import ElectionPartyCreate from './pages/admin/election-party/create'
import ElectionPartyEdit from './pages/admin/election-party/edit'
import ElectionAssignElectionParties from './pages/admin/election/assign-election-parties'
import Candidate from './pages/admin/candidate/list'
import CandidateShow from './pages/admin/candidate/show'
import CandidateCreate from './pages/admin/candidate/create'
import CandidateEdit from './pages/admin/candidate/edit'

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
            path: '/administration/elections',
            element: <Election />,
            auth: true,
            role: 'admin',
        },
        {
            name: 'Politické strany',
            path: '/administration/election-parties',
            element: <ElectionParty />,
            auth: true,
            role: 'admin',
        },
        {
            name: 'Kandidáti',
            path: '/administration/candidates',
            element: <Candidate />,
            auth: true,
            role: 'admin',
        },
    ]

    const routes = [
        {
            path: '/administration/elections/:id',
            element: <ElectionShow />,
        },
        {
            path: '/administration/elections/create',
            element: <ElectionCreate />,
        },
        {
            path: '/administration/elections/:id/edit',
            element: <ElectionEdit />,
        },
        {
            path: '/administration/elections/:id/assign-election-parties',
            element: <ElectionAssignElectionParties />,
        },
        {
            path: '/administration/election-parties/:id',
            element: <ElectionPartyShow />,
        },
        {
            path: '/administration/election-parties/create',
            element: <ElectionPartyCreate />,
        },
        {
            path: '/administration/election-parties/:id/edit',
            element: <ElectionPartyEdit />,
        },
        {
            path: '/administration/candidates/:id',
            element: <CandidateShow />,
        },
        {
            path: '/administration/candidates/create',
            element: <CandidateCreate />,
        },
        {
            path: '/administration/candidates/:id/edit',
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
