import CandidateModel from './candidate.model'
import File from './file.model'

interface ElectionParty {
    id: number
    name: string
    campaign: string
    images: File[]
    candidates: CandidateModel[] | null
    createdAt: string
    updatedAt: string
}

export default ElectionParty
