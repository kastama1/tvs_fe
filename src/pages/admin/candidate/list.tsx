import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/candidate'
import useAuth from '../../../hooks/useAuth'
import Table from '../../../components/table'
import Loading from '../../../page-section/loading'
import CandidateModel from '../../../utils/models/candidate.model'
import CandidateTableHeader from '../../../page-section/candidate/candidate-table-header'
import CandidateTableRow from '../../../page-section/candidate/candidate-table-row'
import ButtonLink from '../../../components/button-link'

const Candidate = () => {
    useTitle('Kandidáti')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })

    const [candidates, setCandidates] = useState<CandidateModel[]>([])

    useEffect(() => {
        if (user) {
            api.list().then((data) => {
                setCandidates(data)
            })
        }
    }, [user])

    if (isLoading || !user) {
        return <Loading />
    }

    return (
        <>
            <Heading>Kandidáti</Heading>

            <ButtonLink to={'/administration/candidates/create'}>
                Přidat nového kandidáta
            </ButtonLink>

            {candidates.length > 0 && (
                <Table>
                    <>
                        <thead>
                            <CandidateTableHeader />
                        </thead>

                        <tbody>
                            {candidates.map((candidate, index) => {
                                return (
                                    <CandidateTableRow
                                        candidate={candidate}
                                        key={index}
                                    />
                                )
                            })}
                        </tbody>
                    </>
                </Table>
            )}
        </>
    )
}

export default Candidate
