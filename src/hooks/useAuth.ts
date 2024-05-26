import useSWR from 'swr'
import { axios, getErrorMessage } from '../utils/axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface HookProps {
    middleware: any
    role?: any
}

const useAuth = (props: HookProps) => {
    const { middleware, role } = props

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
                mutate()
                navigate('/')
            })
            .catch((error) => {
                getErrorMessage(error)
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/api/logout')

            toast.success('Odhlášení proběhlo úspěšně.')

            mutate(undefined)
        }

        navigate('/login')
    }

    useEffect(() => {
        if (user || error) {
            setIsLoading(false)
        }

        if (!isLoading && middleware && role) {
            if (middleware === 'auth' && !user && error) logout()
            if (user && role !== user.role) navigate('/')
        }
    }, [user, error, isLoading, logout])

    return {
        user,
        isLoading,
        csrf,
        login,
        logout,
    }
}

export default useAuth
