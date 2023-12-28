import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import ElectionList from '../../page-section/election/election-list'
import ElectionsByType from '../../utils/models/election-by-type.model'
import { Link } from 'react-router-dom'

const ElectionListByType = () => {
    useTitle('Volby')
    useAuth({ middleware: 'auth' })

    const [electionsByType, setElectionsByType] = useState<ElectionsByType[]>(
        []
    )

    useEffect(() => {
        api.listByType().then((data) => {
            setElectionsByType(data)
        })
    }, [])

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
