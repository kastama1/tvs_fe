import React from 'react'
import './index.scss'
import { Formik, Form, ErrorMessage } from 'formik'
import Input from '../input'
import Select from '../select'
import QuillInput from '../quill-input'

interface formProps {
    inputs: {
        label: string
        name: string
        type: string
        options?: {
            value: string
            text: string
        }[]
    }[]
    initialValues: {}
    validationSchema?: any | (() => any)
    handleSubmit: ((values: any) => void) | ((values: any) => Promise<any>)
    submitText?: string
}
const FormWrapper: React.FC<formProps> = ({
    inputs,
    initialValues,
    validationSchema,
    handleSubmit,
    submitText,
}) => {
    const renderField = (
        name: string,
        type: string,
        options?: { value: string; text: string }[]
    ) => {
        switch (type) {
            case 'select':
                return options ? (
                    <Select name={name} type={type} options={options} />
                ) : null
            case 'texteditor':
                return <QuillInput name={name} />
            default:
                return <Input name={name} type={type} />
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className="form">
                {inputs.map(({ label, name, type, options }, index) => {
                    return (
                        <div className="input-container" key={index}>
                            <label>{label}</label>
                            {renderField(name, type, options)}
                            <div className="error-message">
                                <ErrorMessage name={name} />
                            </div>
                        </div>
                    )
                })}
                <button type="submit">
                    {submitText ? submitText : 'Odeslat'}
                </button>
            </Form>
        </Formik>
    )
}

export default FormWrapper
