import React from 'react'
import { Field } from 'formik'

interface selectProps {
    name: string
    options: { value: string; text: string }[]
}
const Select: React.FC<selectProps> = ({ name, options }) => {
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
