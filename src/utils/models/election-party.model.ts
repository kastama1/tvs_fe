import CandidateModel from './candidate.model'

interface ElectionParty {
    id: number
    name: string
    campaign: string
    candidates: CandidateModel[] | null
    createdAt: string
    updatedAt: string
}

export default ElectionParty
