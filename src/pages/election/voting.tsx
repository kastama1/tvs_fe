import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import ElectionModel from '../../utils/models/election.model'
import Loading from '../../page-section/loading'
import ElectionVotingForm from '../../page-section/election/election-voting-form'
import VoteModel from '../../utils/models/vote.model'
import ElectionVotingBox from '../../page-section/election/election-voting-box'

const ElectionVoting = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    const { id } = useParams()
    const navigate = useNavigate()

    const now = new Date()

    const [vote, setVote] = useState<VoteModel | null>(null)
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

            api.getVote(id).then((data) => {
                setVote(data)
            })
        }
    }, [user, id])

    const handleSubmit = async (data: any) => {
        if (id && isActive) {
            api.vote(id, data)
            api.getVote(id).then((data) => {
                setVote(data)
            })
        }
    }

    if (isLoading || !user || !election || !vote) {
        return <Loading />
    }

    const initialValues = {
        electionParty: vote && vote.value ? vote.value : 0,
    }

    const isPublished =
        new Date(election.publishFrom) <= now &&
        now < new Date(election.startFrom)
    const isActive =
        new Date(election.startFrom) <= now && now < new Date(election.endTo)

    return (
        <>
            <Heading>{'Hlasování ' + election.name}</Heading>

            {isActive ? (
                <ElectionVotingForm
                    election={election}
                    initialValues={initialValues}
                    handleSubmit={handleSubmit}
                />
            ) : (
                isPublished && <ElectionVotingBox election={election} />
            )}
        </>
    )
}

export default ElectionVoting
