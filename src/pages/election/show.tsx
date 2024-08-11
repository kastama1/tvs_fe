import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import ElectionModel from '../../utils/models/election.model'
import Loading from '../../page-section/loading'
import ButtonLink from '../../components/button-link'

const ElectionShow = () => {
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

    let buttonText = ''
    if (election.votable === 'candidates') {
        buttonText = 'Zobrazit kandidáty'
    } else if (election.votable === 'election_parties') {
        buttonText = 'Zobrazit politické strany a jejich kandidáty'
    }

    return (
        <>
            <Heading>{election.name}</Heading>
            <div>{parse(election.info)}</div>

            <ButtonLink to={`/elections/${election.id}/view`}>
                {buttonText}
            </ButtonLink>

            {election.active ? (
                <ButtonLink to={`/elections/${election.id}/voting`}>
                    Přejít volit
                </ButtonLink>
            ) : (
                election.ended && (
                    <ButtonLink to={`/elections/${election.id}/voting`}>
                        Prohlédnout hlas
                    </ButtonLink>
                )
            )}
        </>
    )
}

export default ElectionShow
