import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/electionParty'
import useAuth from '../../../hooks/useAuth'
import ElectionPartyModel from '../../../utils/models/election-party.model'
import Table from '../../../components/table'
import ElectionPartyTableHeader from '../../../page-section/election-party/election-party-table-header'
import ElectionPartyTableRow from '../../../page-section/election-party/election-party-table-row'
import Loading from '../../../page-section/loading'
import ButtonLink from '../../../components/button-link'

const ElectionParty = () => {
    useTitle('Politické strany')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })

    const [electionParties, setElectionParties] = useState<
        ElectionPartyModel[]
    >([])

    useEffect(() => {
        if (user) {
            api.list().then((data) => {
                setElectionParties(data)
            })
        }
    }, [user])

    if (isLoading || !user) {
        return <Loading />
    }

    return (
        <>
            <Heading>Politické strany</Heading>

            <ButtonLink to={'/administration/election-parties/create'}>
                Přidat novou politickou stranu
            </ButtonLink>

            {electionParties.length > 0 && (
                <Table>
                    <>
                        <thead>
                            <ElectionPartyTableHeader />
                        </thead>

                        <tbody>
                            {electionParties.map((electionParty, index) => {
                                return (
                                    <ElectionPartyTableRow
                                        electionParty={electionParty}
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

export default ElectionParty
