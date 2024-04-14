import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import useAuth from '../../../hooks/useAuth'
import * as Yup from 'yup'
import FormWrapper from '../../../components/form'
import Loading from '../../../page-section/loading'
import api from '../../../utils/api/candidate'
import apiElectionParties from '../../../utils/api/electionParty'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ElectionPartyModel from '../../../utils/models/election-party.model'

const CandidateCreate = () => {
    useTitle('Politické strany')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })
    const navigate = useNavigate()
    const [queryParameters] = useSearchParams()

    const [electionParties, setElectionParties] = useState<
        ElectionPartyModel[]
    >([])

    useEffect(() => {
        apiElectionParties.list().then((data) => {
            setElectionParties(data)
        })
    }, [])

    const mapOptions = (parties: ElectionPartyModel[]) => {
        const options: { value: string; text: string }[] = []
        options.push({ value: '', text: 'Bez politické strany' })

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
            label: 'Název',
            name: 'name',
            type: 'text',
        },
        {
            label: 'Kampaň',
            name: 'campaign',
            type: 'texteditor',
        },
        {
            label: 'Politické strany',
            name: 'election_party_id',
            type: 'select',
            options: mapOptions(electionParties),
        },
        {
            label: 'Obrázek',
            name: 'images',
            type: 'files',
        },
    ]

    const initialValues = {
        name: '',
        campaign: '',
        election_party_id: queryParameters.get('election-party') ?? '',
        images: [],
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Toto pole je povinné'),
        campaign: Yup.string().required('Toto pole je povinné'),
        election_party_id: Yup.string(),
        images: Yup.array().max(5, 'Toto pole může mít maximálně 5 prvků'),
    })

    const handleSubmit = async (data: any) => {
        api.store(data)

        navigate('/administration/candidates')
    }

    if (isLoading || !user) {
        return <Loading />
    }

    return (
        <>
            <Heading>Vytvořit nového kandidáta</Heading>

            <FormWrapper
                inputs={inputs}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                submitText={'Vytvořit nového kandidáta'}
            />
        </>
    )
}

export default CandidateCreate
