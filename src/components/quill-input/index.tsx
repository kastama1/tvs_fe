import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { Field } from 'formik'

interface quillInputProps {
    name: string
}
const QuillInput: React.FC<quillInputProps> = ({ name }) => {
    return (
        <Field name={name}>
            {({
                field,
            }: {
                field: {
                    value: string
                    name: string
                    onChange: (name: string) => void
                }
            }) => {
                return (
                    <ReactQuill
                        theme="snow"
                        value={field.value}
                        // @ts-ignore
                        onChange={field.onChange(field.name)}
                    />
                )
            }}
        </Field>
    )
}

export default QuillInput
