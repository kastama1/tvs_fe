import Axios from 'axios'
import { toast } from 'react-toastify'

export const axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
    withCredentials: true,
})

export const getErrorMessage = (error: any) => {
    if (error.response.status === 422) {
        toast.error(error.response.data.message)
    } else if (error.response.status === 403) {
        toast.error('Tato akce je neoprávněná')
    } else {
        toast.error('Něco se pokazilo')
    }
}

export default { axios, getErrorMessage }
