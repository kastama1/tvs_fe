import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import api from '../../utils/api/electionParty'
import useAuth from '../../hooks/useAuth'
import * as Yup from 'yup'
import FormWrapper from '../../components/form'
import Loading from '../../page-section/loading'
import { useNavigate } from 'react-router-dom'

const ElectionPartyCreate = () => {
    useTitle('Politické strany')
    const { user, isLoading } = useAuth({ middleware: 'auth' })
    const navigate = useNavigate()

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
        },
    ]

    const initialValues = {
        name: '',
        campaign: '',
        images: [],
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Toto pole je povinné'),
        campaign: Yup.string(),
        images: Yup.array().max(5, 'Toto pole může mít maximálně 5 prvků'),
    })

    const handleSubmit = async (data: any) => {
        api.store(data)

        navigate('/election-parties')
    }

    if (isLoading || !user) {
        return <Loading />
    }

    return (
        <>
            <Heading>Vytvořit novou politickou stranu</Heading>

            <FormWrapper
                inputs={inputs}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                submitText={'Vytvořit politickou stranu'}
            />
        </>
    )
}

export default ElectionPartyCreate
