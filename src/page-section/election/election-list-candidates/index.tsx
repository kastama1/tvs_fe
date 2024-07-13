import './index.scss'
import React from 'react'
import CandidateModel from '../../../utils/models/candidate.model'
import TextTruncate from 'react-text-truncate'
import { Link } from 'react-router-dom'

interface electionListCandidates {
    candidates: CandidateModel[]
}
const ElectionListCandidates: React.FC<electionListCandidates> = ({
    candidates,
}) => {
    return (
        <div className="candidates-container">
            {candidates.map((candidate) => {
                const link = `/candidates/${candidate.id}`
                return (
                    <div className="candidate-container" key={candidate.id}>
                        {candidate.images.length > 0 && (
                            <div>
                                <Link to={link}>
                                    <img
                                        src={candidate.images[0].url}
                                        alt={candidate.name}
                                    />
                                </Link>
                            </div>
                        )}
                        <div>
                            <Link to={link}>
                                <h3>{candidate.name}</h3>
                            </Link>
                            <TextTruncate
                                line={5}
                                element="p"
                                truncateText="..."
                                text={candidate.campaign}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ElectionListCandidates
