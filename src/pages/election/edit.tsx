import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import Election from '../../utils/models/election.model'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import FormWrapper from '../../components/form'
import { ElectionTypeEnum } from '../../utils/enums/ElectionTypeEnum'
import momentDefault from '../../utils/dateTimeZone'

const ElectionEdit = () => {
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
        name: election.name,
        type: election.type,
        info: election.info,
        publish_from: momentDefault(election.publishFrom),
        start_from: momentDefault(election.startFrom),
        end_to: momentDefault(election.endTo),
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
        api.update(election.id, data)
    }

    return (
        <>
            <Heading>Upravit volby</Heading>

            <FormWrapper
                inputs={inputs}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                submitText={'Upravit volby'}
            />
        </>
    )
}

export default ElectionEdit
