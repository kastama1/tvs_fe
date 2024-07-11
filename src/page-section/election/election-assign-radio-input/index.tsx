import './index.scss'
import React from 'react'
import { Field } from 'formik'
import ElectionModel from '../../../utils/models/election.model'

interface electionAssignRadioInputProps {
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
    values: { options: string[]; subOptions: string[] }
    initialValues: { options: string[]; subOptions: string[] }

    election: ElectionModel
}
const ElectionAssignRadioInput: React.FC<electionAssignRadioInputProps> = ({
    option,
    values,
    initialValues,
    election,
}) => {
    const optionSubOptions = option.subOptions?.map((subOption) =>
        String(subOption.value)
    )
    const handleOptionClick = (value: number) => {
        if (values.options.includes(String(value))) {
            values.options = values.options.filter(
                (option) => option !== String(value)
            )

            if (optionSubOptions) {
                values.subOptions = values.subOptions.filter(
                    (subOption) => !optionSubOptions.includes(subOption)
                )
            }
        }
    }
    const handleSubOptionClick = (value: number) => {
        if (values.subOptions.includes(String(value))) {
            values.subOptions = values.subOptions.filter(
                (subOption) => subOption !== String(value)
            )
        }
    }

    return (
        <div
            id={String(option.value)}
            className={
                initialValues.options.includes(String(option.value))
                    ? 'assign-option vote'
                    : 'assign-option'
            }
        >
            <div
                className="radio-container"
                role="group"
                aria-labelledby="optionGroup"
            >
                <label onClick={() => handleOptionClick(option.value)}>
                    <Field
                        type="checkbox"
                        name="options"
                        value={option.value}
                        checked={values.options.includes(String(option.value))}
                    />
                    <span className="checkmark"></span>
                    {option.text}
                </label>
            </div>

            {option.subOptions && (
                <div className="sub-options">
                    <hr></hr>
                    <div>
                        <h4>Kandidáti</h4>
                    </div>

                    {option.subOptions.map((subOption, index) => {
                        const disable = !values.options.includes(
                            String(option.value)
                        )
                        return (
                            <div
                                className={
                                    initialValues.subOptions.includes(
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
                                            name="subOptions"
                                            value={subOption.value}
                                            checked={values.subOptions.includes(
                                                String(subOption.value)
                                            )}
                                            disabled={disable}
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

export default ElectionAssignRadioInput
