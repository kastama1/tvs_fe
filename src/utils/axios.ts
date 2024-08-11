import Axios from 'axios'
import { toast } from 'react-toastify'

const getCookie = (key: string) => {
    const cookie = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
    const cookieValue = cookie ? cookie.pop() : ''
    return cookieValue ? cookieValue : ''
}

export const axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
    withCredentials: true,
})

const csrfAxios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
    withCredentials: true,
})

axios.interceptors.request.use(
    async (config) => {
        let xsrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'))

        if (!xsrfToken) {
            try {
                await csrfAxios.get('/api/sanctum/csrf-cookie')

                xsrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'))
            } catch (error) {
                console.error('Error fetching CSRF token', error)
                throw error
            }
        }

        if (xsrfToken) {
            config.headers['X-XSRF-TOKEN'] = xsrfToken
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const getErrorMessage = (error: any) => {
    console.error(error)
    if (error.response.status && error.response.status === 422) {
        toast.error(error.response.data.message)
    } else if (error.response.status && error.response.status === 403) {
        toast.error('Tato akce je neoprávněná')
    } else {
        toast.error('Něco se pokazilo')
    }
}

export default { axios, getErrorMessage }
