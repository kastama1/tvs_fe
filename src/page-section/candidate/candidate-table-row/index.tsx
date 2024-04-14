import React from 'react'
import { Link } from 'react-router-dom'
import CandidateModel from '../../../utils/models/candidate.model'

interface candidateTableRowProps {
    candidate: CandidateModel
}
const CandidateTableRow: React.FC<candidateTableRowProps> = ({ candidate }) => {
    return (
        <tr>
            <td>{candidate.id}</td>
            <td>
                <Link to={`/candidates/${candidate.id}`}>{candidate.name}</Link>
            </td>
            <td>
                {candidate.electionParty ? (
                    <Link
                        to={`/election-parties/${candidate.electionParty.id}`}
                    >
                        {candidate.electionParty.name}
                    </Link>
                ) : (
                    'Bez politické strany'
                )}
            </td>
            <td>
                <div>
                    <Link to={`/candidates/${candidate.id}`}>Zobrazit</Link>
                </div>
                <div>
                    <Link to={`/candidates/${candidate.id}/edit`}>Upravit</Link>
                </div>
            </td>
        </tr>
    )
}

export default CandidateTableRow
