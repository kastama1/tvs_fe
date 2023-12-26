import axios from '../axios'
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
            if (error.response.status === 422) {
                toast.error('Účet s tímto emailem již existuje.')
            } else {
                toast.error('Něco se pokazilo')
            }
        })
}

export default { register }
