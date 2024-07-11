import './index.scss'
import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import ElectionModel from '../../../utils/models/election.model'
import { useNavigate } from 'react-router-dom'
import apiCandidate from '../../../utils/api/candidate'
import apiElectionParty from '../../../utils/api/electionParty'
import CandidateModel from '../../../utils/models/candidate.model'
import ElectionPartyModel from '../../../utils/models/election-party.model'
import ElectionAssignRadioInput from '../election-assign-radio-input'

interface electionAssignFormProps {
    election: ElectionModel
    initialValues: { options: string[]; subOptions: string[] }
    handleSubmit: ((values: any) => void) | ((values: any) => Promise<any>)
}
const ElectionAssignForm: React.FC<electionAssignFormProps> = ({
    election,
    initialValues,
    handleSubmit,
}) => {
    const navigate = useNavigate()

    const [candidates, setCandidates] = useState<CandidateModel[] | null>(null)
    const [electionParties, setElectionParties] = useState<
        ElectionPartyModel[] | null
    >(null)

    useEffect(() => {
        if (election?.votable === 'candidates') {
            apiCandidate.list().then((data) => {
                setCandidates(data)
            })
        } else if (election?.votable === 'election_parties') {
            apiCandidate.list().then((data) => {
                setCandidates(data)
            })

            apiElectionParty.list().then((data) => {
                setElectionParties(data)
            })
        } else {
            navigate('/')
        }
    }, [])

    let options:
        | {
              value: number
              text: string
              subOptions:
                  | {
                        value: number
                        text: string
                        disabledValue: number | undefined
                    }[]
                  | null
          }[]
        | null = null
    if (election.votable === 'candidates') {
        options = candidates
            ? candidates.map(({ id, name }) => ({
                  value: id,
                  text: name,
                  subOptions: null,
              }))
            : []
    } else if (election.votable === 'election_parties') {
        options = electionParties
            ? electionParties.map(({ id, name }) => ({
                  value: id,
                  text: name,
                  subOptions: candidates
                      ? candidates
                            .filter(
                                (candidate) =>
                                    candidate.electionParty?.id === id
                            )
                            .map(({ id, name, electionParty }) => ({
                                value: id,
                                text: name,
                                disabledValue: electionParty?.id,
                            }))
                      : [],
              }))
            : []
    } else {
        navigate(-1)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
                <Form className="election-voting-form">
                    {options &&
                        options.map((option, index) => {
                            return (
                                <ElectionAssignRadioInput
                                    option={option}
                                    values={values}
                                    initialValues={initialValues}
                                    election={election}
                                    key={index}
                                />
                            )
                        })}

                    <button type="submit">{'Odeslat'}</button>
                </Form>
            )}
        </Formik>
    )
}

export default ElectionAssignForm
