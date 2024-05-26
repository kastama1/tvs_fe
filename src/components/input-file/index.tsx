import React, { useEffect, useState } from 'react'
import './index.scss'
import FileWithPreview from '../../utils/models/file-with-preview.model'
import File from '../../utils/models/file.model'
import api from '../../utils/api/file'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface inputProps {
    name: string
    type: string
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void
    multiple?: boolean
    files?: File[]
}
const FileInput: React.FC<inputProps> = ({
    name,
    type,
    setFieldValue,
    multiple,
    files,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([])
    const [uploadedFiles, setUploadedFiles] = useState<File[]>(files ?? [])

    useEffect(() => {
        setUploadedFiles(files ?? [])
    }, [files])

    const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            for (let i = 0; i < e.target.files.length; i++) {
                let file = e.target.files[i]

                if (file.type.startsWith('image/')) {
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                }

                setSelectedFiles((files) => [...files, file as FileWithPreview])
            }
        }
    }

    const handleDeleteSelectedFile = (file: FileWithPreview) => {
        setSelectedFiles(
            selectedFiles.filter((selectedFile) => selectedFile !== file)
        )
    }

    const handleDeleteUplodedFile = async (file: File) => {
        const response = await api.destroy(file.id)

        if (response) {
            setUploadedFiles(
                uploadedFiles.filter(
                    (uploadedFile) => uploadedFile.id !== file.id
                )
            )
        }
    }

    useEffect(() => {
        setFieldValue(name, selectedFiles)
    }, [selectedFiles, name, setFieldValue])

    return (
        <div className="file-input-container">
            {uploadedFiles.length > 0 && (
                <div className="file-preview">
                    <span>Nahrané obrázky</span>
                    <div className="file-input-preview">
                        {uploadedFiles.map((image, index) => {
                            return (
                                <div key={index}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={() =>
                                            handleDeleteUplodedFile(image)
                                        }
                                    />
                                    <img src={image.url} alt={image.name} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            <input
                className="file-input"
                id={name}
                name={name}
                type={type}
                multiple={multiple}
                onChange={handleSelectFiles}
            />

            {selectedFiles.length > 0 && (
                <div className="file-preview">
                    <span>Nové obrázky</span>
                    <div className="file-input-preview">
                        {selectedFiles
                            .filter((file) => file.preview)
                            .map((image, index) => {
                                return (
                                    <div key={index}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            onClick={() =>
                                                handleDeleteSelectedFile(image)
                                            }
                                        />
                                        <img
                                            src={image.preview}
                                            alt={image.name}
                                        />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FileInput
