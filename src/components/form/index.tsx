import React from 'react'
import './index.scss'
import { ErrorMessage, Form, Formik } from 'formik'
import Input from '../input'
import Select from '../select'
import QuillInput from '../quill-input'
import Checkbox from '../checkbox'
import FileInput from '../input-file'
import File from '../../utils/models/file.model'

interface formProps {
    inputs: {
        label: string
        name: string
        type: string
        options?: {
            value: string
            text: string
        }[]
        initialFiles?: File[]
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
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
        ) => void,
        options?: { value: string; text: string }[],
        initialFiles?: File[]
    ) => {
        switch (type) {
            case 'select':
                return options ? <Select name={name} options={options} /> : null
            case 'checkbox':
                return options ? (
                    <Checkbox name={name} options={options} />
                ) : null
            case 'radio':
                return options ? (
                    <Checkbox name={name} options={options} />
                ) : null
            case 'texteditor':
                return <QuillInput name={name} />
            case 'file':
                return (
                    <FileInput
                        name={name}
                        type={'file'}
                        setFieldValue={setFieldValue}
                        files={initialFiles}
                    />
                )
            case 'files':
                return (
                    <FileInput
                        name={name}
                        type={'file'}
                        setFieldValue={setFieldValue}
                        multiple={true}
                        files={initialFiles}
                    />
                )
            default:
                return <Input name={name} type={type} />
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {({ setFieldValue }) => (
                <Form className="form">
                    {inputs.map(
                        (
                            { label, name, type, options, initialFiles },
                            index
                        ) => {
                            return (
                                <div className="input-container" key={index}>
                                    <label>{label}</label>
                                    {renderField(
                                        name,
                                        type,
                                        setFieldValue,
                                        options,
                                        initialFiles
                                    )}
                                    <div className="error-message">
                                        <ErrorMessage name={name} />
                                    </div>
                                </div>
                            )
                        }
                    )}
                    <button type="submit">
                        {submitText ? submitText : 'Odeslat'}
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default FormWrapper
