import { axios, getErrorMessage } from '../axios'
import 'js-file-download'
import fileDownload from 'js-file-download'
import { toast } from 'react-toastify'

const download = (id: string) => {
    axios
        .get(`/api/votes/${id}/download`, {
            responseType: 'blob',
        })
        .then((response) => {
            fileDownload(response.data, 'Vote.zip')
            toast.success('Hlas byl stažen v pořádku')
        })
        .catch((error) => {
            getErrorMessage(error)
        })
}
export default {
    download,
}
