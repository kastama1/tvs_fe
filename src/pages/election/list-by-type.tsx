import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import ElectionList from '../../page-section/election/election-list'
import ElectionsByType from '../../utils/models/election-by-type.model'
import { Link } from 'react-router-dom'
import Loading from '../../page-section/loading'

const ElectionListByType = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth' })

    const [electionsByType, setElectionsByType] = useState<ElectionsByType[]>(
        []
    )

    useEffect(() => {
        if (user) {
            api.listByType().then((data) => {
                setElectionsByType(data)
            })
        }
    }, [user])

    if ((isLoading || !user) && electionsByType.length === 0) {
        return <Loading />
    }

    return (
        <>
            <Heading>Volby</Heading>

            <div>
                <Link to={'/elections/create'}>Přidat nové volby</Link>
            </div>

            {electionsByType && (
                <ElectionList electionsByType={electionsByType} />
            )}
        </>
    )
}

export default ElectionListByType
