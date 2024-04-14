import axios from '../axios'
import { toast } from 'react-toastify'
import FileWithPreview from '../models/file-with-preview.model'

const list = async () => {
    const result = await axios.get(`/api/election-parties`).catch((error) => {
        toast.error('Něco se pokazilo')
    })

    return result?.data.data
}

const show = async (id: string) => {
    const result = await axios
        .get(`/api/election-parties/${id}`)
        .catch((error) => {
            toast.error('Něco se pokazilo')
        })

    return result?.data.data
}

const store = (data: any) => {
    axios
        .post(`/api/election-parties`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
            toast.success('Politická strana byla přidána úspěšně.')
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
    const formData = new FormData()

    formData.append('_method', 'PUT')
    formData.append('name', data['name'])
    formData.append('campaign', data['campaign'])

    data.images.map((image: FileWithPreview) => {
        formData.append('images[]', image)
    })

    axios
        .post(`/api/election-parties/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
            toast.success('Politická strana byla úspěšně upravena.')
        })
        .catch((error) => {
            if (error.response.status === 422) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Něco se pokazilo')
            }
        })
}

export default { list, show, store, update }
