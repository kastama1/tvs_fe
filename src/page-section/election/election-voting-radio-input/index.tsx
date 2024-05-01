import './index.scss'
import React from 'react'
import ElectionPartyModel from '../../../utils/models/election-party.model'
import { Field } from 'formik'

interface electionVotingRadioInputProps {
    electionParty: ElectionPartyModel
    groupName: string
    value: number | null
    initialValue: number
}
const ElectionVotingRadioInput: React.FC<electionVotingRadioInputProps> = ({
    electionParty,
    groupName,
    value,
    initialValue,
}) => {
    return (
        <div
            className={
                initialValue == electionParty.id
                    ? 'election-voting-radio vote'
                    : 'election-voting-radio'
            }
        >
            <label>
                <Field
                    type="radio"
                    name={groupName}
                    value={electionParty.id}
                    checked={value && value == electionParty.id}
                    disabled={initialValue == electionParty.id}
                />
                <span className="checkmark"></span>
                {electionParty.name}
            </label>
        </div>
    )
}

export default ElectionVotingRadioInput
