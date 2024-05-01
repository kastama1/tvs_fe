import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/election'
import useAuth from '../../../hooks/useAuth'
import ElectionModel from '../../../utils/models/election.model'
import Table from '../../../components/table'
import ElectionTableHeader from '../../../page-section/election/election-table-header'
import ElectionTableRow from '../../../page-section/election/election-table-row'
import Loading from '../../../page-section/loading'
import ButtonLink from '../../../components/button-link'

const Election = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })

    const [elections, setElections] = useState<ElectionModel[]>([])

    useEffect(() => {
        if (user) {
            api.list().then((data) => {
                setElections(data)
            })
        }
    }, [user])

    if (isLoading || !user) {
        return <Loading />
    }

    return (
        <>
            <Heading>Volby</Heading>

            <ButtonLink to={'/administration/elections/create'}>
                Přidat nové volby
            </ButtonLink>

            {elections.length > 0 && (
                <Table>
                    <>
                        <thead>
                            <ElectionTableHeader />
                        </thead>
                        <tbody>
                            {elections.map((election, index) => {
                                return (
                                    <ElectionTableRow
                                        election={election}
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

export default Election
