import './index.scss'
import React from 'react'
import ElectionModel from '../../../utils/models/election.model'
import { Link } from 'react-router-dom'

interface electionVotingFormProps {
    election: ElectionModel
}
const ElectionVotingForm: React.FC<electionVotingFormProps> = ({
    election,
}) => {
    return (
        <div className={'election-voting-box'}>
            <div>
                <h3>Politické strany</h3>
            </div>
            {election.electionParties.map((electionParty) => {
                return (
                    <div
                        className={'election-voting-election-party'}
                        key={electionParty.id}
                    >
                        <Link to={`/election-parties/${electionParty.id}`}>
                            {electionParty.name}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default ElectionVotingForm
