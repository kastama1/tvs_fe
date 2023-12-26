import useSWR from 'swr'
import axios from '../utils/axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface HookProps {
    middleware: any
}

const useAuth = (props: HookProps) => {
    const { middleware } = props

    const navigate = useNavigate()

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then((res) => res.data)
            .catch((error) => {})
    )

    const csrf = () => axios.get('/api/sanctum/csrf-cookie')

    const login = async (email: string, password: string) => {
        await csrf()

        axios
            .post('/api/login', { email, password })
            .then(() => {
                toast.success('Přihlášení proběhlo úspěšně.')
                mutate()
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    toast.error('Špatně zadaný email nebo heslo.')
                } else {
                    toast.error('Něco se pokazilo')
                }
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/api/logout')

            toast.success('Odhlášení proběhlo úspěšně.')

            await mutate()
        }

        navigate('/')
    }

    useEffect(() => {
        if (middleware === 'guest' && user) navigate('/')
        if (middleware === 'auth' && !user && error) logout()
    }, [user, error])

    return {
        user,
        csrf,
        login,
        logout,
    }
}

export default useAuth
