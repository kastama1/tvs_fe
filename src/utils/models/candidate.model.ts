import ElectionPartyModel from './election-party.model'
import File from './file.model'

interface Candidate {
    id: number
    name: string
    campaign: string
    images: File[]
    electionParty: ElectionPartyModel | undefined
    createdAt: string
    updatedAt: string
}

export default Candidate
