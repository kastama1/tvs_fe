import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import electionApi from '../../utils/api/election'
import voteApi from '../../utils/api/vote'
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
    const [election, setElection] = useState<ElectionModel | null>(null)
    const [loadingVote, setLoadingVote] = useState<boolean>(true)

    useEffect(() => {
        if (user && id) {
            electionApi.show(id).then((data) => {
                if (data) {
                    setElection(data)
                } else {
                    navigate(-1)
                }
            })

            electionApi.getVote(id).then((data) => {
                setVote(data)
                setLoadingVote(false)
            })
        }
    }, [user, id, navigate])

    const handleSubmit = async (data: any) => {
        if (id && election?.active) {
            if (data.vote === null) {
                toast.error('Nejdříve musíte zvolit svůj hlas')
                return
            }

            electionApi.vote(id, data)
            electionApi.getVote(id).then((data) => {
                setVote(data)
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

    const handleDownloadVote = (vote: VoteModel) => {
        voteApi.download(String(vote.id))
    }

    const initialValues = {
        vote: vote && vote.value ? String(vote.value) : null,
        prefer_votes: vote?.votes
            ? vote.votes.map((preferVote) => String(preferVote.value))
            : [],
    }

    if (isLoading || !user || !election || loadingVote) {
        return <Loading />
    }

    if (!election.active && !election.userVoted) {
        navigate(-1)
    }

    return (
        <>
            <Heading>{'Hlasování ' + election.name}</Heading>
            {vote && election.ended && (
                <button onClick={() => handleDownloadVote(vote)}>
                    Stáhnout hlas
                </button>
            )}

            {initialValues && (
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
