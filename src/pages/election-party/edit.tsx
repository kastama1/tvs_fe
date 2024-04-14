import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/electionParty'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import FormWrapper from '../../components/form'
import ElectionPartyModel from '../../utils/models/election-party.model'
import Loading from '../../page-section/loading'

const ElectionPartyEdit = () => {
    useTitle('Politické strany')
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    const { id } = useParams()
    const navigate = useNavigate()

    const [electionParty, setElectionParty] = useState<ElectionPartyModel>({
        id: 0,
        name: '',
        campaign: '',
        images: [],
        candidates: null,
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        if (user && id) {
            api.show(id).then((data) => {
                setElectionParty(data)
            })
        }
    }, [user, id])

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
            label: 'Obrázek',
            name: 'images',
            type: 'files',
            initialFiles: electionParty.images,
        },
    ]

    const initialValues = {
        name: electionParty.name,
        campaign: electionParty.campaign,
        images: [],
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Toto pole je povinné'),
        campaign: Yup.string(),
        images: Yup.array().max(5, 'Toto pole může mít maximálně 5 prvků'),
    })

    const handleSubmit = async (data: any) => {
        api.update(electionParty.id, data)

        navigate('/election-parties')
    }

    if ((isLoading || !user) && electionParty.id === 0) {
        return <Loading />
    }

    return (
        <>
            <Heading>Upravit politickou stranu</Heading>

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

export default ElectionPartyEdit
