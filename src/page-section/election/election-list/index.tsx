import './index.scss'
import React from 'react'
import ElectionRow from '../election-row'
import ElectionsByType from '../../../utils/models/election-by-type.model'
import { ElectionTypeEnum } from '../../../utils/enums/ElectionTypeEnum'

interface electionListProps {
    electionsByType: ElectionsByType[]
}
const ElectionList: React.FC<electionListProps> = ({ electionsByType }) => {
    return (
        <div className="election-list">
            {electionsByType.map((type, index) => {
                return (
                    type.elections.length > 0 && (
                        <div className="election-type" key={index}>
                            <h2>{ElectionTypeEnum[type.type]}</h2>
                            {type.elections.map((election) => {
                                return (
                                    <ElectionRow
                                        election={election}
                                        key={election.id}
                                    />
                                )
                            })}
                        </div>
                    )
                )
            })}
        </div>
    )
}

export default ElectionList
