import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import Election from '../../utils/models/election.model'
import { Link, useParams } from 'react-router-dom'
import parse from 'html-react-parser'

const ElectionShow = () => {
    useTitle('Volby')
    useAuth({ middleware: 'auth' })
    const { id } = useParams()

    const [election, setElection] = useState<Election>({
        id: 0,
        name: '',
        type: 'presidential_election',
        info: '',
        publishFrom: '',
        startFrom: '',
        endTo: '',
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        api.show(id).then((data) => {
            setElection(data)
        })
    }, [])

    return (
        <>
            <Heading>{election.name}</Heading>
            <div>
                <Link to={`/elections/${election.id}/edit`}>Upravit</Link>
            </div>
            <div></div>
            <div>{parse(election.info)}</div>
        </>
    )
}

export default ElectionShow
