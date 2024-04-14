import axios from '../axios'
import { toast } from 'react-toastify'

const destroy = (id: number) => {
    return axios
        .delete(`/api/files/${id}`)
        .then((response) => {
            toast.success('Soubor byl úspěšně smazán.')

            return true
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 422) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Něco se pokazilo')
            }

            return false
        })
}

export default { destroy }
