import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/election'
import useAuth from '../../../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import ElectionModel from '../../../utils/models/election.model'
import Loading from '../../../page-section/loading'
import ButtonLink from '../../../components/button-link'
import './show.scss'

const ElectionShow = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })
    const { id } = useParams()
    const navigate = useNavigate()

    const [election, setElection] = useState<ElectionModel | null>(null)

    useEffect(() => {
        if (user && id) {
            api.show(id).then((data) => {
                setElection(data)
            })
        }
    }, [user, id])

    if (isLoading || !user || !election) {
        return <Loading />
    }

    let assignButton = null

    if (election.votable === 'candidates') {
        assignButton = (
            <ButtonLink
                to={`/administration/elections/${election.id}/assign-candidates`}
            >
                Přidat kandidáta
            </ButtonLink>
        )
    } else if (election.votable === 'election_parties') {
        assignButton = (
            <ButtonLink
                to={`/administration/elections/${election.id}/assign-election-parties`}
            >
                Přidat politické strany
            </ButtonLink>
        )
    } else {
        navigate('/')
    }

    return (
        <>
            <Heading>{election.name}</Heading>
            <ButtonLink to={`/administration/elections/${election.id}/edit`}>
                Upravit
            </ButtonLink>

            {assignButton && assignButton}
            <div className="text-container">{parse(election.info)}</div>
        </>
    )
}

export default ElectionShow
