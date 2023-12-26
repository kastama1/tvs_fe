import { ElectionTypeEnum } from '../enums/ElectionTypeEnum'

interface Election {
    id: number
    name: string
    type: keyof typeof ElectionTypeEnum
    info: string
    publishFrom: string
    startFrom: string
    endTo: string
    createdAt: string
    updatedAt: string
}

export default Election
