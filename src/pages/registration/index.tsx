import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import * as Yup from 'yup'
import FormWrapper from '../../components/form'
import api from '../../utils/api/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    useTitle('Registrace')
    const navigate = useNavigate()

    const inputs = [
        {
            label: 'Jméno',
            name: 'name',
            type: 'text',
        },
        {
            label: 'Email',
            name: 'email',
            type: 'email',
        },
        {
            label: 'Heslo',
            name: 'password',
            type: 'password',
        },
        {
            label: 'Potvrzení hesla',
            name: 'passwordConfirmation',
            type: 'password',
        },
    ]

    const initialValues = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Toto pole je povinné'),
        email: Yup.string()
            .email('Špatně zadaný email')
            .required('Toto pole je povinné'),
        password: Yup.string()
            .required('Toto pole je povinné')
            .min(8, 'Minimální délka je 8 znáků.'),
        passwordConfirmation: Yup.string()
            .required('Toto pole je povinné')
            .oneOf([Yup.ref('password')], 'Hesla se musí schodovat'),
    })

    const handleSubmit = async (form: {
        name: string
        email: string
        password: string
        passwordConfirmation: string
    }) => {
        api.register(
            form.name,
            form.email,
            form.password,
            form.passwordConfirmation
        ).then(() => {
            navigate('/')
        })
    }

    return (
        <>
            <Heading>Registrace</Heading>

            <FormWrapper
                inputs={inputs}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default Login
