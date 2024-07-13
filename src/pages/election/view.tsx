import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import ElectionModel from '../../utils/models/election.model'
import Loading from '../../page-section/loading'
import ElectionListCandidates from '../../page-section/election/election-list-candidates'
import ElectionListElectionParties from '../../page-section/election/election-list-election-parties'

const ElectionView = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'voter' })
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

    if (!election.published) {
        navigate(-1)
    }

    let headline = ''
    let list
    if (election.votable === 'candidates') {
        headline = 'Kandidáti'
        list = <ElectionListCandidates candidates={election.candidates} />
    } else if (election.votable === 'election_parties') {
        headline = 'Politické strany a jejich kandidáty'
        list = (
            <ElectionListElectionParties
                electionParties={election.electionParties}
                candidates={election.candidates}
            />
        )
    }

    return (
        <>
            <Heading>{headline}</Heading>

            {list && list}
        </>
    )
}

export default ElectionView
