import React from 'react'
import { Field } from 'formik'

interface inputProps {
    name: string
    type: string
}
const Input: React.FC<inputProps> = ({ name, type }) => {
    return <Field id={name} name={name} type={type} />
}

export default Input
