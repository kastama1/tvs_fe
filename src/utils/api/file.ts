import { axios, getErrorMessage } from '../axios'
import { toast } from 'react-toastify'

const destroy = (id: number) => {
    return axios
        .delete(`/api/files/${id}`)
        .then((response) => {
            toast.success('Soubor byl úspěšně smazán.')

            return true
        })
        .catch((error) => {
            getErrorMessage(error)
        })
}

export default { destroy }
