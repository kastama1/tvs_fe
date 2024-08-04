import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/election'
import useAuth from '../../../hooks/useAuth'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
    let options

    if (election.votable === 'candidates') {
        assignButton = (
            <ButtonLink
                to={`/administration/elections/${election.id}/assign-candidates`}
            >
                Přidat kandidáty
            </ButtonLink>
        )
        options = election.candidates.map(({ id, name, votes }) => ({
            name: name,
            votes: votes,
            link: `/administration/candidates/${id}`,
            subOptions: null,
        }))
    } else if (election.votable === 'election_parties') {
        assignButton = (
            <ButtonLink
                to={`/administration/elections/${election.id}/assign-election-parties`}
            >
                Přidat politické strany
            </ButtonLink>
        )
        options = election.electionParties.map(({ id, name, votes }) => ({
            name: name,
            votes: votes,
            link: `/administration/election-parties/${id}`,
            subOptions: election.candidates
                .filter((candidate) => candidate.electionParty?.id === id)
                .map(({ id, name, votes }) => ({
                    name: name,
                    votes: votes,
                    link: `/administration/candidates/${id}`,
                })),
        }))
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

            <h3>Hlasy</h3>

            <div className="votes">
                <ul>
                    {options &&
                        options.map((option) => {
                            return (
                                <>
                                    <li>
                                        <Link to={option.link}>
                                            {option.name}
                                        </Link>{' '}
                                        - {option.votes}
                                        <ul>
                                            {option.subOptions &&
                                                option.subOptions.map(
                                                    (subOption) => {
                                                        return (
                                                            <li>
                                                                <Link
                                                                    to={
                                                                        subOption.link
                                                                    }
                                                                >
                                                                    {
                                                                        subOption.name
                                                                    }
                                                                </Link>{' '}
                                                                -{' '}
                                                                {
                                                                    subOption.votes
                                                                }
                                                            </li>
                                                        )
                                                    }
                                                )}
                                        </ul>
                                    </li>
                                    <hr></hr>
                                </>
                            )
                        })}
                </ul>
            </div>
        </>
    )
}

export default ElectionShow
