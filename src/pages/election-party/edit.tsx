import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/electionParty'
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import FormWrapper from '../../components/form'
import ElectionPartyModel from '../../utils/models/election-party.model'
import Loading from '../../page-section/loading'

const ElectionPartyEdit = () => {
    useTitle('Politické strany')
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    const { id } = useParams()

    const [electionParty, setElectionParty] = useState<ElectionPartyModel>({
        id: 0,
        name: '',
        campaign: '',
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        if (user) {
            api.show(id).then((data) => {
                setElectionParty(data)
            })
        }
    }, [])

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
    ]

    const initialValues = {
        name: electionParty.name,
        campaign: electionParty.campaign,
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Toto pole je povinné'),
        campaign: Yup.string(),
    })

    const handleSubmit = async (data: any) => {
        api.update(electionParty.id, data)
    }

    if ((isLoading || !user) && !electionParty) {
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
