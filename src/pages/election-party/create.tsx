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
    ]

    const initialValues = {
        name: '',
        campaign: '',
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Toto pole je povinné'),
        campaign: Yup.string(),
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
