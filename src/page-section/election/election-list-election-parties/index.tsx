import './index.scss'
import React from 'react'
import TextTruncate from 'react-text-truncate'
import { Link } from 'react-router-dom'
import ElectionPartyModel from '../../../utils/models/election-party.model'
import CandidateModel from '../../../utils/models/candidate.model'
import ElectionListCandidates from '../election-list-candidates'

interface electionListElectionParties {
    electionParties: ElectionPartyModel[]
    candidates: CandidateModel[]
}
const ElectionListElectionParties: React.FC<electionListElectionParties> = ({
    electionParties,
    candidates,
}) => {
    return (
        <div className="election-parties-container">
            {electionParties.map((electionParty) => {
                const link = `/election-parties/${electionParty.id}`
                return (
                    <div
                        className="election-party-candidates-container"
                        key={electionParty.id}
                    >
                        <div className="election-party-container">
                            {electionParty.images.length > 0 && (
                                <div>
                                    <Link to={link}>
                                        <img
                                            src={electionParty.images[0].url}
                                            alt={electionParty.name}
                                        />
                                    </Link>
                                </div>
                            )}
                            <div>
                                <Link to={link}>
                                    <h3>{electionParty.name}</h3>
                                </Link>
                                <TextTruncate
                                    line={5}
                                    element="p"
                                    truncateText="..."
                                    text={electionParty.campaign}
                                />
                            </div>
                        </div>
                        <div>
                            <h4>Kandidáti politické strany</h4>
                            <ElectionListCandidates
                                candidates={candidates.filter(
                                    (candidate) =>
                                        candidate.electionParty?.id ===
                                        electionParty.id
                                )}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ElectionListElectionParties
