import './index.scss'
import React from 'react'
import { Field } from 'formik'
import ElectionModel from '../../../utils/models/election.model'

interface electionVotingRadioInputProps {
    option: {
        value: number
        text: string
        subOptions:
            | {
                  value: number
                  text: string
                  disabledValue: number | undefined
              }[]
            | null
    }
    values: { vote: string | null; prefer_votes: string[] }
    initialValues: { vote: string | null; prefer_votes: string[] }

    election: ElectionModel
}
const ElectionVotingRadioInput: React.FC<electionVotingRadioInputProps> = ({
    option,
    values,
    initialValues,
    election,
}) => {
    const preferVotes = election.preferVotes - values.prefer_votes.length

    const handleOptionClick = (value: number) => {
        if (String(value) !== values.vote) {
            values.prefer_votes = []
        }
    }

    const handleSubOptionClick = (value: number) => {
        if (values.prefer_votes.includes(String(value))) {
            values.prefer_votes = values.prefer_votes.filter(
                (prefer_votes) => prefer_votes !== String(value)
            )
        }
    }

    return (
        <div
            id={String(option.value)}
            className={
                initialValues.vote === String(option.value)
                    ? 'option vote'
                    : 'option'
            }
        >
            <div role="group" aria-labelledby="optionGroup">
                <label onClick={() => handleOptionClick(option.value)}>
                    <Field
                        type="radio"
                        name="vote"
                        value={option.value}
                        checked={values.vote === String(option.value)}
                    />
                    <span className="radiomark"></span>
                    {option.text}
                </label>
            </div>

            {option.subOptions && (
                <div className="sub-options">
                    <div>
                        <h4>
                            Kandidáti
                            {values.vote === String(option.value) &&
                                ` - preferenční hlasy (${preferVotes})`}
                        </h4>
                    </div>

                    {option.subOptions.map((subOption, index) => {
                        return (
                            <div
                                className={
                                    initialValues.prefer_votes.includes(
                                        String(subOption.value)
                                    )
                                        ? 'sub-option vote'
                                        : 'sub-option'
                                }
                                key={index}
                            >
                                <div
                                    role="group"
                                    aria-labelledby="subOptionsGroup"
                                >
                                    <label
                                        onClick={() =>
                                            handleSubOptionClick(
                                                subOption.value
                                            )
                                        }
                                    >
                                        <Field
                                            type="checkbox"
                                            name="prefer_votes"
                                            value={subOption.value}
                                            checked={values.prefer_votes.includes(
                                                String(subOption.value)
                                            )}
                                            disabled={
                                                String(
                                                    subOption.disabledValue
                                                ) !== values.vote ||
                                                (preferVotes === 0 &&
                                                    !values.prefer_votes.includes(
                                                        String(subOption.value)
                                                    ))
                                            }
                                        />
                                        <span className="checkmark"></span>
                                        {subOption.text}
                                    </label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ElectionVotingRadioInput
