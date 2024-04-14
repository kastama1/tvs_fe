import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import useAuth from '../../../hooks/useAuth'
import * as Yup from 'yup'
import FormWrapper from '../../../components/form'
import Loading from '../../../page-section/loading'
import { useEffect, useState } from 'react'
import apiElectionParty from '../../../utils/api/electionParty'
import apiElection from '../../../utils/api/election'
import ElectionPartyModel from '../../../utils/models/election-party.model'
import { useParams } from 'react-router-dom'
import ElectionModel from '../../../utils/models/election.model'

const ElectionAssignElectionParties = () => {
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

    const [electionParties, setElectionParties] = useState<
        ElectionPartyModel[]
    >([])

    const mapOptions = (parties: ElectionPartyModel[]) => {
        const options: { value: string; text: string }[] = []
        parties.map(({ id, name }) => {
            const option = {
                value: id.toString(),
                text: name,
            }
            options.push(option)
        })
        return options
    }

    const inputs = [
        {
            label: 'Politické strany',
            name: 'election_parties',
            type: 'checkbox',
            options: mapOptions(electionParties),
        },
    ]

    const initialValues = {
        election_parties: election.electionParties.map((election) =>
            election.id.toString()
        ),
    }

    const validationSchema = Yup.object().shape({})

    useEffect(() => {
        if (user && id) {
            apiElection.show(id).then((data) => {
                setElection(data)
            })

            apiElectionParty.list().then((data) => {
                setElectionParties(data)
            })
        }
    }, [user, id])

    const handleSubmit = async (data: any) => {
        if (election.id !== 0) {
            apiElection.assignElectionParties(election.id, data)
        }
    }

    if (isLoading || !user) {
        return <Loading />
    }

    return (
        <>
            <Heading>Přidat politické strany k volbám</Heading>

            <FormWrapper
                inputs={inputs}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                submitText={'Přidat politické strany k volbám'}
            />
        </>
    )
}

export default ElectionAssignElectionParties
