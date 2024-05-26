import './index.scss'
import React from 'react'
import { Form, Formik } from 'formik'
import ElectionVotingRadioInput from '../election-voting-radio-input'
import ElectionModel from '../../../utils/models/election.model'
import { useNavigate } from 'react-router-dom'

interface electionVotingFormProps {
    election: ElectionModel
    initialValues: { vote: string | null; prefer_votes: string[] }
    handleSubmit: ((values: any) => void) | ((values: any) => Promise<any>)
}
const ElectionVotingForm: React.FC<electionVotingFormProps> = ({
    election,
    initialValues,
    handleSubmit,
}) => {
    const navigate = useNavigate()

    let headline: string | null = null
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
        headline = 'Kandidáti'
        options = election.candidates.map(({ id, name }) => ({
            value: id,
            text: name,
            subOptions: null,
        }))
    } else if (election.votable === 'election_parties') {
        headline = 'Politické strany'
        options = election.electionParties.map(({ id, name }) => ({
            value: id,
            text: name,
            subOptions: election.candidates
                .filter((candidate) => candidate.electionParty?.id === id)
                .map(({ id, name, electionParty }) => ({
                    value: id,
                    text: name,
                    disabledValue: electionParty?.id,
                })),
        }))
    } else {
        navigate(-1)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
                <Form className="election-voting-form">
                    <div id="electionPartiesGroup">
                        <h3>{headline}</h3>
                    </div>
                    {options &&
                        options.map((option, index) => {
                            return (
                                <ElectionVotingRadioInput
                                    option={option}
                                    values={values}
                                    initialValues={initialValues}
                                    election={election}
                                    key={index}
                                />
                            )
                        })}

                    {election.active && (
                        <button type="submit">{'Odeslat'}</button>
                    )}
                </Form>
            )}
        </Formik>
    )
}

export default ElectionVotingForm
