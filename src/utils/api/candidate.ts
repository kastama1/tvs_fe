import axios from '../axios'
import { toast } from 'react-toastify'
import FileWithPreview from '../models/file-with-preview.model'

const list = async () => {
    const result = await axios.get(`/api/candidates`).catch((error) => {
        toast.error('Něco se pokazilo')
    })

    return result?.data.data
}

const show = async (id: string) => {
    const result = await axios.get(`/api/candidates/${id}`).catch((error) => {
        toast.error('Něco se pokazilo')
    })

    return result?.data.data
}

const store = (data: any) => {
    axios
        .post(`/api/candidates`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
            toast.success('Kandidát byl přidán úspěšně.')
        })
        .catch((error) => {
            console.log(error)
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
    formData.append('election_party_id', data['election_party_id'])

    data.images.map((image: FileWithPreview) => {
        formData.append('images[]', image)
    })

    axios
        .post(`/api/candidates/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
            toast.success('Kandidát byl úspěšně upraven.')
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 422) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Něco se pokazilo')
            }
        })
}

export default { list, show, store, update }
