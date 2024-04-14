import React from 'react'
import ElectionParty from '../../../utils/models/election-party.model'
import { Link } from 'react-router-dom'

interface electionPartyTableRowProps {
    electionParty: ElectionParty
}
const ElectionPartyTableRow: React.FC<electionPartyTableRowProps> = ({
    electionParty,
}) => {
    return (
        <tr>
            <td>{electionParty.id}</td>
            <td>
                <Link to={`/election-parties/${electionParty.id}`}>
                    {electionParty.name}
                </Link>
            </td>
            <td>{electionParty.candidates?.length}</td>
            <td>
                <div>
                    <Link to={`/election-parties/${electionParty.id}`}>
                        Zobrazit
                    </Link>
                </div>
                <div>
                    <Link to={`/election-parties/${electionParty.id}/edit`}>
                        Upravit
                    </Link>
                </div>
            </td>
        </tr>
    )
}

export default ElectionPartyTableRow
