import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../../utils/api/candidate'
import useAuth from '../../../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import FormWrapper from '../../../components/form'
import Loading from '../../../page-section/loading'
import CandidateModel from '../../../utils/models/candidate.model'
import ElectionPartyModel from '../../../utils/models/election-party.model'
import apiElectionParties from '../../../utils/api/electionParty'

const CandidateEdit = () => {
    useTitle('Politické strany')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })
    const { id } = useParams()
    const navigate = useNavigate()

    const [candidate, setCandidate] = useState<CandidateModel | null>(null)
    const [electionParties, setElectionParties] = useState<
        ElectionPartyModel[]
    >([])

    useEffect(() => {
        apiElectionParties.list().then((data) => {
            setElectionParties(data)
        })
    }, [])

    useEffect(() => {
        if (user && id) {
            api.show(id).then((data) => {
                setCandidate(data)
            })
        }
    }, [user, id])

    const mapOptions = (parties: ElectionPartyModel[]) => {
        const options: { value: string; text: string }[] = []
        options.push({ value: '', text: 'Bez politické strany' })

        parties.forEach(({ id, name }) => {
            const option = {
                value: id.toString(),
                text: name,
            }
            options.push(option)
        })
        return options
    }

    if (isLoading || !user || !candidate) {
        return <Loading />
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
            initialFiles: candidate.images,
        },
    ]

    const initialValues = {
        name: candidate.name,
        campaign: candidate.campaign,
        election_party_id: candidate.electionParty
            ? candidate.electionParty.id
            : '',
        images: [],
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Toto pole je povinné'),
        campaign: Yup.string().required('Toto pole je povinné'),
        election_party_id: Yup.string(),
        images: Yup.array().max(5, 'Toto pole může mít maximálně 5 prvků'),
    })

    const handleSubmit = async (data: any) => {
        api.update(candidate.id, data)

        navigate('/administration/candidates')
    }

    return (
        <>
            <Heading>Upravit kandidáta</Heading>

            <FormWrapper
                inputs={inputs}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                submitText={'Upravit politickou stranu'}
            />
        </>
    )
}

export default CandidateEdit
