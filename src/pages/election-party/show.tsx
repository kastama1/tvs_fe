import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/electionParty'
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import ElectionPartyModel from '../../utils/models/election-party.model'
import Loading from '../../page-section/loading'
import './show.scss'

const ElectionPartyShow = () => {
    useTitle('Politická strana')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'voter' })
    const { id } = useParams()

    const [electionParty, setElectionParty] =
        useState<ElectionPartyModel | null>(null)

    useEffect(() => {
        if (user && id) {
            api.show(id).then((data) => {
                setElectionParty(data)
            })
        }
    }, [user, id])

    if (isLoading || !user || !electionParty) {
        return <Loading />
    }

    return (
        <>
            <Heading>{electionParty.name}</Heading>
            <div className="image-text-container">
                {electionParty.images.length > 0 && (
                    <img
                        src={electionParty.images[0].url}
                        alt={electionParty.name}
                    />
                )}

                <div>{parse(electionParty.campaign)}</div>
            </div>
        </>
    )
}

export default ElectionPartyShow
