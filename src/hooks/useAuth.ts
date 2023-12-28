import useSWR from 'swr'
import axios from '../utils/axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface HookProps {
    middleware: any
}

const useAuth = (props: HookProps) => {
    const { middleware } = props

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        axios.get('/api/user').then((res) => res.data)
    )

    const csrf = () => axios.get('/api/sanctum/csrf-cookie')

    const login = async (email: string, password: string) => {
        await csrf()

        axios
            .post('/api/login', { email, password })
            .then(() => {
                toast.success('Přihlášení proběhlo úspěšně.')
                navigate('/')
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

            await mutate(undefined)
        }

        navigate('/')
    }

    useEffect(() => {
        if (user) {
            setIsLoading(false)
        }

        if (middleware === 'auth' && !user && error) logout()
    }, [user, error, isLoading])

    return {
        user,
        isLoading,
        csrf,
        login,
        logout,
    }
}

export default useAuth
