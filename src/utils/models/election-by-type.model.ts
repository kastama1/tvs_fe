import { ElectionTypeEnum } from '../enums/ElectionTypeEnum'
import ElectionModel from './election.model'

interface ElectionsByType {
    type: keyof typeof ElectionTypeEnum
    elections: ElectionModel[]
}

export default ElectionsByType
