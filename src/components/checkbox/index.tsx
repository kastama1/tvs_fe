import React from 'react'
import { Field } from 'formik'

interface checkboxProps {
    name: string
    options: { value: string | null; text: string }[]
}
const Checkbox: React.FC<checkboxProps> = ({ name, options }) => {
    return (
        <>
            <div
                className="checkbox-container"
                role="group"
                aria-labelledby="checkbox-group"
            >
                {options &&
                    options.map(({ value, text }, index) => {
                        return (
                            <label key={index}>
                                <Field
                                    type="checkbox"
                                    name={name}
                                    value={value}
                                />
                                {text}
                            </label>
                        )
                    })}
            </div>
        </>
    )
}

export default Checkbox
