import React from 'react'
import { Field } from 'formik'

interface selectProps {
    name: string
    type: string
    options: { value: string; text: string }[]
}
const Select: React.FC<selectProps> = ({ name, type, options }) => {
    return (
        <Field id={name} name={name} as="select">
            {options &&
                options.map(({ value, text }, index) => {
                    return (
                        <option value={value} key={index}>
                            {text}
                        </option>
                    )
                })}
        </Field>
    )
}

export default Select
