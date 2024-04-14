import { axios, getErrorMessage } from '../axios'
import { toast } from 'react-toastify'
import FileWithPreview from '../models/file-with-preview.model'

const list = async () => {
    const result = await axios.get(`/api/candidates`).catch((error) => {
        getErrorMessage(error)
    })

    return result?.data.data
}

const show = async (id: string) => {
    const result = await axios.get(`/api/candidates/${id}`).catch((error) => {
        getErrorMessage(error)
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
            getErrorMessage(error)
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
            getErrorMessage(error)
        })
}

export default { list, show, store, update }
