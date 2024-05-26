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
import { toast } from 'react-toastify'

const ElectionVoting = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'voter' })
    const { id } = useParams()
    const navigate = useNavigate()

    const [vote, setVote] = useState<VoteModel | null>(null)
    const [preferVotes, setPreferVotes] = useState<VoteModel[] | null>(null)
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
                setVotes(data)
            })
        }
    }, [user, id, navigate])

    const handleSubmit = async (data: any) => {
        if (id && election?.active) {
            if (data.vote === null) {
                toast.error('Nejdříve musíte zvolit svůj hlas')
                return
            }

            api.vote(id, data)
            api.getVote(id).then((data) => {
                setVotes(data)
            })

            const voteElement = document.getElementById(data.vote)

            setTimeout(
                () =>
                    voteElement?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    }),
                100
            )
        }
    }

    const setVotes = (votes: VoteModel[]) => {
        setVote(votes.filter((vote) => !vote.isPreferVote)[0])
        setPreferVotes(votes.filter((vote) => vote.isPreferVote))
    }

    if (isLoading || !user || !election) {
        return <Loading />
    }

    if (!election.active) {
        navigate(-1)
    }

    const initialValues = {
        vote: vote && vote.value ? String(vote.value) : null,
        prefer_votes: preferVotes
            ? preferVotes.map((preferVote) => String(preferVote.value))
            : [],
    }

    return (
        <>
            <Heading>{'Hlasování ' + election.name}</Heading>

            {election.active && initialValues && (
                <ElectionVotingForm
                    election={election}
                    initialValues={initialValues}
                    handleSubmit={handleSubmit}
                />
            )}
        </>
    )
}

export default ElectionVoting
