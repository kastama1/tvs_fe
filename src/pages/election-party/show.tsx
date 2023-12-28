import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/electionParty'
import useAuth from '../../hooks/useAuth'
import { Link, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import ElectionPartyModel from '../../utils/models/election-party.model'
import Loading from '../../page-section/loading'

const ElectionPartyShow = () => {
    useTitle('Politická strana')
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    const { id } = useParams()

    const [electionParty, setElectionParty] = useState<ElectionPartyModel>({
        id: 0,
        name: '',
        campaign: '',
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        if (user) {
            api.show(id).then((data) => {
                setElectionParty(data)
            })
        }
    }, [])

    if ((isLoading || !user) && !electionParty) {
        return <Loading />
    }

    return (
        <>
            <Heading>{electionParty.name}</Heading>
            <div>
                <Link to={`/election-parties/${electionParty.id}/edit`}>
                    Upravit
                </Link>
            </div>
            <div>{parse(electionParty.campaign)}</div>
        </>
    )
}

export default ElectionPartyShow
