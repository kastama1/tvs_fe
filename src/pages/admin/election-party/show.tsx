import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/electionParty'
import useAuth from '../../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import ElectionPartyModel from '../../../utils/models/election-party.model'
import Loading from '../../../page-section/loading'
import Table from '../../../components/table'
import CandidateTableHeader from '../../../page-section/candidate/candidate-table-header'
import CandidateTableRow from '../../../page-section/candidate/candidate-table-row'
import './show.scss'
import ButtonLink from '../../../components/button-link'

const ElectionPartyShow = () => {
    useTitle('Politická strana')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })
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
            <ButtonLink
                to={`/administration/election-parties/${electionParty.id}/edit`}
            >
                Upravit
            </ButtonLink>
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

            <ButtonLink
                to={`/administration/candidates/create?election-party=${electionParty.id}`}
            >
                Přidat nového kandidáta
            </ButtonLink>

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
