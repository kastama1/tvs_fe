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
    }, [user, id])

    if (isLoading || !user || !election) {
        return <Loading />
    }

    if (!election.published) {
        navigate(-1)
    }

    return (
        <>
            <Heading>{election.name}</Heading>
            <div>{parse(election.info)}</div>

            {election.active && (
                <ButtonLink to={`/elections/${election.id}/voting`}>
                    Přejít volit
                </ButtonLink>
            )}
        </>
    )
}

export default ElectionShow
