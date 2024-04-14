import { axios, getErrorMessage } from '../axios'
import { toast } from 'react-toastify'

const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
) => {
    axios
        .post(`/api/register`, {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        })
        .then((response) => {
            toast.success('Registrace proběhla úspěšně.')
        })
        .catch((error) => {
            getErrorMessage(error)
        })
}

export default { register }
