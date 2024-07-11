import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ElectionModel from '../../../utils/models/election.model'
import { ElectionTypeEnum } from '../../../utils/enums/ElectionTypeEnum'

interface electionTableRowProps {
    election: ElectionModel
}
const ElectionTableRow: React.FC<electionTableRowProps> = ({ election }) => {
    const navigate = useNavigate()

    let assignButton = null
    if (election.votable === 'candidates') {
        assignButton = (
            <Link to={`/administration/elections/${election.id}/assign`}>
                Přidat kandidáty
            </Link>
        )
    } else if (election.votable === 'election_parties') {
        assignButton = (
            <Link to={`/administration/elections/${election.id}/assign`}>
                Přidat politické strany
            </Link>
        )
    } else {
        navigate('/')
    }

    return (
        <tr>
            <td>{election.id}</td>
            <td>
                <Link to={`/administration/elections/${election.id}`}>
                    {election.name}
                </Link>
            </td>
            <td>{ElectionTypeEnum[election.type]}</td>
            <td>{new Date(election.publishFrom).toLocaleDateString()}</td>
            <td>{new Date(election.startFrom).toLocaleDateString()}</td>
            <td>{new Date(election.endTo).toLocaleDateString()}</td>
            <td>
                <div>
                    <Link to={`/administration/elections/${election.id}`}>
                        Zobrazit
                    </Link>
                </div>
                <div>
                    <Link to={`/administration/elections/${election.id}/edit`}>
                        Upravit
                    </Link>
                </div>
                <div>{assignButton}</div>
            </td>
        </tr>
    )
}

export default ElectionTableRow
