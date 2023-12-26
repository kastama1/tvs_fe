import './index.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import Election from '../../../utils/models/election.model'
import { ElectionTypeEnum } from '../../../utils/enums/ElectionTypeEnum'

interface electionRowProps {
    election: Election
}
const ElectionRow: React.FC<electionRowProps> = ({ election }) => {
    return (
        <div className="election">
            <Link to={`/elections/${election.id}`}>{election.name}</Link>
            <div className="election-date">
                <span>Datum konání:</span>
                <span>{new Date(election.startFrom).toLocaleDateString()}</span>
                <span>-</span>
                <span>{new Date(election.endTo).toLocaleDateString()}</span>
            </div>
            <div>{ElectionTypeEnum[election.type]}</div>
            <hr />
        </div>
    )
}

export default ElectionRow
