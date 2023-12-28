import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import ElectionModel from '../../utils/models/election.model'
import Table from '../../components/table'
import ElectionTableHeader from '../../page-section/election/election-table-header'
import ElectionTableRow from '../../page-section/election/election-table-row'
import Loading from '../../page-section/loading'

const Election = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth' })

    const [elections, setElections] = useState<ElectionModel[]>([])

    useEffect(() => {
        if (user) {
            api.list().then((data) => {
                setElections(data)
            })
        }
    }, [])

    if ((isLoading || !user) && !elections) {
        return <Loading />
    }

    return (
        <>
            <Heading>Volby</Heading>

            <div>
                <Link to={'/elections/create'}>Přidat nové volby</Link>
            </div>

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
        </>
    )
}

export default Election
