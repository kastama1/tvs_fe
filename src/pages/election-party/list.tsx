import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/electionParty'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import ElectionPartyModel from '../../utils/models/election-party.model'
import Table from '../../components/table'
import ElectionPartyTableHeader from '../../page-section/election-party/election-party-table-header'
import ElectionPartyTableRow from '../../page-section/election-party/election-party-table-row'
import Loading from '../../page-section/loading'

const ElectionParty = () => {
    useTitle('Politické strany')
    const { user, isLoading } = useAuth({ middleware: 'auth' })

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

    if ((isLoading || !user) && electionParties.length === 0) {
        return <Loading />
    }

    return (
        <>
            <Heading>Politické strany</Heading>

            <div>
                <Link to={'/election-parties/create'}>
                    Přidat novou politickou stranu
                </Link>
            </div>

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
        </>
    )
}

export default ElectionParty
