import './index.scss'
import React, { useRef, useState } from 'react'
import { ElectionTypeEnum } from '../../../utils/enums/ElectionTypeEnum'
import { Link } from 'react-router-dom'
import ElectionModel from '../../../utils/models/election.model'

interface electionBoxProps {
    electionsOfType: ElectionModel[]
    electionType: string
}
const ElectionBox: React.FC<electionBoxProps> = ({
    electionType,
    electionsOfType,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const nodeRef = useRef(null)

    return (
        <div className="election-container">
            <h3>
                {
                    ElectionTypeEnum[
                        electionType as keyof typeof ElectionTypeEnum
                    ]
                }
            </h3>

            <ul ref={nodeRef}>
                {electionsOfType.map((election) => {
                    return (
                        <li key={election.id}>
                            <Link to={`/elections/${election.id}`}>
                                {election.name +
                                    ' (' +
                                    new Date(
                                        election.startFrom
                                    ).toLocaleDateString() +
                                    ' - ' +
                                    new Date(
                                        election.endTo
                                    ).toLocaleDateString() +
                                    ')'}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ElectionBox
