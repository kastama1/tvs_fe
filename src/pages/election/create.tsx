import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import * as Yup from 'yup'
import FormWrapper from '../../components/form'
import { ElectionTypeEnum } from '../../utils/enums/ElectionTypeEnum'
import momentDefault from '../../utils/dateTimeZone'
import Loading from '../../page-section/loading'

const ElectionCreate = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth' })

    const mapOptions = () => {
        return Object.entries(ElectionTypeEnum).map(([value, text]) => ({
            text: text,
            value: value,
        }))
    }

    const inputs = [
        {
            label: 'Název',
            name: 'name',
            type: 'text',
        },
        {
            label: 'Typ',
            name: 'type',
            type: 'select',
            options: mapOptions(),
        },
        {
            label: 'Informace',
            name: 'info',
            type: 'texteditor',
        },
        {
            label: 'Zveřejnit od',
            name: 'publish_from',
            type: 'datetime-local',
        },
        {
            label: 'Záčátek voleb',
            name: 'start_from',
            type: 'datetime-local',
        },
        {
            label: 'Konec voleb',
            name: 'end_to',
            type: 'datetime-local',
        },
    ]

    const initialValues = {
        name: '',
        type: inputs?.[1]?.options?.[0].value ?? '',
        info: '',
        publish_from: momentDefault(),
        start_from: momentDefault(),
        end_to: momentDefault(),
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Toto pole je povinné'),
        type: Yup.string()
            .oneOf(Object.keys(ElectionTypeEnum))
            .required('Toto pole je povinné'),
        info: Yup.string(),
        publish_from: Yup.date()
            .min(new Date(Date.now()), 'Zveřějnění musí být déle než dnes')
            .required('Toto pole je povinné'),
        start_from: Yup.date()
            .min(
                Yup.ref('publish_from'),
                'Začátek voleb nemůže být po zveřějnění'
            )
            .required('Toto pole je povinné'),
        end_to: Yup.date()
            .min(
                Yup.ref('start_from'),
                'Konec voleb nemůže být po začátku voleb'
            )
            .required('Toto pole je povinné'),
    })

    const handleSubmit = async (data: any) => {
        api.store(data)
    }

    if (isLoading || !user) {
        return <Loading />
    }

    return (
        <>
            <Heading>Vytvořit nové volby</Heading>

            <FormWrapper
                inputs={inputs}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                submitText={'Vytvořit volby'}
            />
        </>
    )
}

export default ElectionCreate
