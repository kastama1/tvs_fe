import { FileTypeEnum } from '../enums/FileTypeEnum'

interface File {
    id: number
    name: string
    path: string
    url: string
    type: keyof typeof FileTypeEnum
}

export default File
