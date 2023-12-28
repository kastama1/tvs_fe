import React from 'react'
import { Link } from 'react-router-dom'
import ElectionModel from '../../../utils/models/election.model'
import { ElectionTypeEnum } from '../../../utils/enums/ElectionTypeEnum'

interface electionTableRowProps {
    election: ElectionModel
}
const ElectionTableRow: React.FC<electionTableRowProps> = ({ election }) => {
    return (
        <tr>
            <td>{election.id}</td>
            <td>
                <Link to={`/elections/${election.id}`}>{election.name}</Link>
            </td>
            <td>{ElectionTypeEnum[election.type]}</td>
            <td>{new Date(election.publishFrom).toLocaleDateString()}</td>
            <td>{new Date(election.startFrom).toLocaleDateString()}</td>
            <td>{new Date(election.endTo).toLocaleDateString()}</td>
            <td>
                <div>
                    <Link to={`/elections/${election.id}`}>Zobrazit</Link>
                </div>
                <div>
                    <Link to={`/elections/${election.id}/edit`}>Upravit</Link>
                </div>
            </td>
        </tr>
    )
}

export default ElectionTableRow
