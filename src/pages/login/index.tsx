import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import * as Yup from 'yup'
import FormWrapper from '../../components/form'
import useAuth from '../../hooks/useAuth'

const Login = () => {
    useTitle('Přihlášení')
    const { login } = useAuth({ middleware: 'guest' })

    const inputs = [
        {
            label: 'E-mail',
            name: 'email',
            type: 'text',
        },
        {
            label: 'Heslo',
            name: 'password',
            type: 'password',
        },
    ]

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Špatně zadaný email')
            .required('Toto pole je povinné'),
        password: Yup.string().required('Toto pole je povinné'),
    })

    const handleSubmit = async (form: { email: string; password: string }) => {
        await login(form.email, form.password)
    }

    return (
        <>
            <Heading>Přihlášení</Heading>

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
