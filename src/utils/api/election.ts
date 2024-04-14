import axios from '../axios'
import { toast } from 'react-toastify'

const list = async () => {
    const result = await axios.get(`/api/elections`).catch((error) => {
        toast.error('Něco se pokazilo')
    })

    return result?.data.data
}

const listByType = async () => {
    const result = await axios
        .get(`/api/elections/list-by-type`)
        .catch((error) => {
            toast.error('Něco se pokazilo')
        })

    return result?.data.data
}

const show = async (id: string) => {
    const result = await axios.get(`/api/elections/${id}`).catch((error) => {
        toast.error('Něco se pokazilo')
    })

    return result?.data.data
}

const store = (data: any) => {
    axios
        .post(`/api/elections`, data)
        .then((response) => {
            toast.success('Volby byly přidány úspěšně.')
        })
        .catch((error) => {
            if (error.response.status === 422) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Něco se pokazilo')
            }
        })
}

const update = (id: number, data: any) => {
    axios
        .put(`/api/elections/${id}`, data)
        .then((response) => {
            toast.success('Volby byly úspěšně upraveny.')
        })
        .catch((error) => {
            if (error.response.status === 422) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Něco se pokazilo')
            }
        })
}

const assignElectionParties = (id: number, data: any) => {
    axios
        .put(`/api/elections/${id}/assign-election-parties`, data)
        .then((response) => {
            toast.success('Politické strany byly úspěšně zapsány k volbám.')
        })
        .catch((error) => {
            if (error.response.status === 422) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Něco se pokazilo')
            }
        })
}

export default { list, listByType, show, store, update, assignElectionParties }
