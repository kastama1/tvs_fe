import { ElectionTypeEnum } from '../enums/ElectionTypeEnum'
import ElectionPartyModel from './election-party.model'
import CandidateModel from './candidate.model'
import { ElectionVotableTypeEnum } from '../enums/ElectionVotableTypeEnum'

interface Election {
    id: number
    name: string
    type: keyof typeof ElectionTypeEnum
    votable: keyof typeof ElectionVotableTypeEnum
    preferVotes: number
    info: string
    electionParties: ElectionPartyModel[]
    candidates: CandidateModel[]
    published: boolean
    active: boolean
    publishFrom: string
    startFrom: string
    endTo: string
    createdAt: string
    updatedAt: string
}

export default Election
