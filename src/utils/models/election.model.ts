import { ElectionTypeEnum } from '../enums/ElectionTypeEnum'
import ElectionPartyModel from './election-party.model'

interface Election {
    id: number
    name: string
    type: keyof typeof ElectionTypeEnum
    info: string
    electionParties: ElectionPartyModel[]
    publishFrom: string
    startFrom: string
    endTo: string
    createdAt: string
    updatedAt: string
}

export default Election
