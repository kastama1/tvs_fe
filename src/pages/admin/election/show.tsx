import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/election'
import useAuth from '../../../hooks/useAuth'
import { Link, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import ElectionModel from '../../../utils/models/election.model'
import Loading from '../../../page-section/loading'

const ElectionShow = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })
    const { id } = useParams()

    const [election, setElection] = useState<ElectionModel>({
        id: 0,
        name: '',
        type: 'presidential_election',
        info: '',
        electionParties: [],
        publishFrom: '',
        startFrom: '',
        endTo: '',
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        if (user && id) {
            api.show(id).then((data) => {
                setElection(data)
            })
        }
    }, [user, id])

    if ((isLoading || !user) && election.id) {
        return <Loading />
    }

    return (
        <>
            <Heading>{election.name}</Heading>
            <div>
                <Link to={`/administration/elections/${election.id}/edit`}>
                    Upravit
                </Link>
            </div>
            <div>
                <Link
                    to={`/administration/elections/${election.id}/assign-election-parties`}
                >
                    Přidat politické strany
                </Link>
            </div>
            <div>{parse(election.info)}</div>
        </>
    )
}

export default ElectionShow
