import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/candidate'
import useAuth from '../../hooks/useAuth'
import { Link, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import Loading from '../../page-section/loading'
import CandidateModel from '../../utils/models/candidate.model'
import './show.scss'

const CandidateShow = () => {
    useTitle('Kandidát')
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    const { id } = useParams()

    const [candidate, setCandidate] = useState<CandidateModel>({
        id: 0,
        name: '',
        campaign: '',
        images: [],
        electionParty: undefined,
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        if (user && id) {
            api.show(id).then((data) => {
                setCandidate(data)
            })
        }
    }, [user, id])

    if ((isLoading || !user) && candidate.id === 0) {
        return <Loading />
    }

    return (
        <>
            <Heading>{candidate.name}</Heading>
            <div>
                <Link to={`/candidates/${candidate.id}/edit`}>Upravit</Link>
            </div>
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
