import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/election'
import useAuth from '../../../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import ElectionModel from '../../../utils/models/election.model'
import Loading from '../../../page-section/loading'
import ElectionAssignForm from '../../../page-section/election/election-assign-form'

const ElectionAssign = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })
    const { id } = useParams()
    const navigate = useNavigate()

    const [election, setElection] = useState<ElectionModel | null>(null)

    useEffect(() => {
        if (user && id) {
            api.show(id).then((data) => {
                if (data) {
                    setElection(data)
                } else {
                    navigate(-1)
                }
            })
        }
    }, [user, id, navigate])

    if (isLoading || !user || !election) {
        return <Loading />
    }

    const handleSubmit = async (data: any) => {
        if (election.id !== 0) {
            api.assignOptions(election.id, data)

            navigate('/administration/elections')
        }
    }

    let initialValues
    let headline = ''
    if (election?.votable === 'candidates') {
        headline = 'Přidat kandidáty'
        initialValues = {
            options: election.candidates
                ? election.candidates.map(({ id }) => String(id))
                : [],
            subOptions: [],
        }
    } else if (election?.votable === 'election_parties') {
        headline = 'Přidat politické strany a kandidáty'
        initialValues = {
            options: election.electionParties
                ? election.electionParties.map(({ id }) => String(id))
                : [],
            subOptions: election.candidates
                ? election.candidates.map(({ id }) => String(id))
                : [],
        }
    } else {
        initialValues = {
            options: [],
            subOptions: [],
        }
    }

    return (
        <>
            <Heading>{headline}</Heading>

            <ElectionAssignForm
                election={election}
                initialValues={initialValues}
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default ElectionAssign
