import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/candidate'
import useAuth from '../../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import Loading from '../../../page-section/loading'
import CandidateModel from '../../../utils/models/candidate.model'
import './show.scss'
import ButtonLink from '../../../components/button-link'

const CandidateShow = () => {
    useTitle('Kandidát')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })
    const { id } = useParams()

    const [candidate, setCandidate] = useState<CandidateModel | null>(null)

    useEffect(() => {
        if (user && id) {
            api.show(id).then((data) => {
                setCandidate(data)
            })
        }
    }, [user, id])

    if (isLoading || !user || !candidate) {
        return <Loading />
    }

    return (
        <>
            <Heading>{candidate.name}</Heading>
            <ButtonLink to={`/administration/candidates/${candidate.id}/edit`}>
                Upravit
            </ButtonLink>
            <div className="image-text-container">
                {candidate.images.length > 0 && (
                    <img src={candidate.images[0].url} alt={candidate.name} />
                )}

                <p>{parse(candidate.campaign)}</p>
            </div>
        </>
    )
}

export default CandidateShow
