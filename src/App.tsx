import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home'
import Login from './pages/login'
import PageWrapper from './components/page-wrapper'
import Registration from './pages/registration'
import { ToastContainer } from 'react-toastify'
import moment from 'moment-timezone'
import AdminElection from './pages/admin/election/list'
import AdminElectionShow from './pages/admin/election/show'
import AdminElectionCreate from './pages/admin/election/create'
import AdminElectionEdit from './pages/admin/election/edit'
import AdminElectionParty from './pages/admin/election-party/list'
import AdminElectionPartyShow from './pages/admin/election-party/show'
import AdminElectionPartyCreate from './pages/admin/election-party/create'
import AdminElectionPartyEdit from './pages/admin/election-party/edit'
import AdminCandidate from './pages/admin/candidate/list'
import AdminCandidateShow from './pages/admin/candidate/show'
import AdminCandidateCreate from './pages/admin/candidate/create'
import AdminCandidateEdit from './pages/admin/candidate/edit'
import AdminElectionAssign from './pages/admin/election/assign'
import Election from './pages/election/list'
import ElectionShow from './pages/election/show'
import ElectionVoting from './pages/election/voting'

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
            element: <AdminElection />,
            auth: true,
            role: 'admin',
        },
        {
            name: 'Volby',
            path: '/elections',
            element: <Election />,
            auth: true,
            role: 'voter',
        },
        {
            name: 'Politické strany',
            path: '/administration/election-parties',
            element: <AdminElectionParty />,
            auth: true,
            role: 'admin',
        },
        {
            name: 'Kandidáti',
            path: '/administration/candidates',
            element: <AdminCandidate />,
            auth: true,
            role: 'admin',
        },
    ]

    const routes = [
        {
            path: '/administration/elections/:id',
            element: <AdminElectionShow />,
        },
        {
            path: '/administration/elections/create',
            element: <AdminElectionCreate />,
        },
        {
            path: '/administration/elections/:id/edit',
            element: <AdminElectionEdit />,
        },
        {
            path: '/administration/elections/:id/assign',
            element: <AdminElectionAssign />,
        },
        {
            path: '/administration/election-parties/:id',
            element: <AdminElectionPartyShow />,
        },
        {
            path: '/administration/election-parties/create',
            element: <AdminElectionPartyCreate />,
        },
        {
            path: '/administration/election-parties/:id/edit',
            element: <AdminElectionPartyEdit />,
        },
        {
            path: '/administration/candidates/:id',
            element: <AdminCandidateShow />,
        },
        {
            path: '/administration/candidates/create',
            element: <AdminCandidateCreate />,
        },
        {
            path: '/administration/candidates/:id/edit',
            element: <AdminCandidateEdit />,
        },
        {
            path: '/elections/:id',
            element: <ElectionShow />,
        },
        {
            path: '/elections/:id/voting',
            element: <ElectionVoting />,
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
