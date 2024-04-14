import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/electionParty'
import useAuth from '../../hooks/useAuth'
import { Link, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import ElectionPartyModel from '../../utils/models/election-party.model'
import Loading from '../../page-section/loading'
import Table from '../../components/table'
import CandidateTableHeader from '../../page-section/candidate/candidate-table-header'
import CandidateTableRow from '../../page-section/candidate/candidate-table-row'
import './show.scss'

const ElectionPartyShow = () => {
    useTitle('Politická strana')
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    const { id } = useParams()

    const [electionParty, setElectionParty] = useState<ElectionPartyModel>({
        id: 0,
        name: '',
        campaign: '',
        images: [],
        candidates: null,
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        if (user && id) {
            api.show(id).then((data) => {
                console.log(data)
                setElectionParty(data)
            })
        }
    }, [user, id])

    if ((isLoading || !user) && electionParty.id === 0) {
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
            <div className="image-text-container">
                {electionParty.images.length > 0 && (
                    <img
                        src={electionParty.images[0].url}
                        alt={electionParty.name}
                    />
                )}

                <p>{parse(electionParty.campaign)}</p>
            </div>

            <h3>Kandidáti</h3>

            <div>
                <Link
                    to={`/candidates/create?election-party=${electionParty.id}`}
                >
                    Přidat nového kandidáta
                </Link>
            </div>

            {electionParty.candidates && (
                <Table>
                    <>
                        <thead>
                            <CandidateTableHeader />
                        </thead>

                        <tbody>
                            {electionParty.candidates.map(
                                (candidate, index) => {
                                    return (
                                        <CandidateTableRow
                                            candidate={candidate}
                                            key={index}
                                        />
                                    )
                                }
                            )}
                        </tbody>
                    </>
                </Table>
            )}
        </>
    )
}

export default ElectionPartyShow
