import './index.scss'
import React from 'react'
import ElectionModel from '../../../utils/models/election.model'
import { Form, Formik } from 'formik'
import ElectionVotingRadioInput from '../election-voting-radio-input'

interface electionVotingFormProps {
    election: ElectionModel
    initialValues: { electionParty: number }
    handleSubmit: ((values: any) => void) | ((values: any) => Promise<any>)
}
const ElectionVotingForm: React.FC<electionVotingFormProps> = ({
    election,
    initialValues,
    handleSubmit,
}) => {
    const now = new Date()

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
                <Form className="election-voting-form">
                    <div id="electionPartiesGroup">
                        <h3>Politické strany</h3>
                    </div>
                    {election.electionParties.map((electionParty) => {
                        return (
                            <div key={electionParty.id}>
                                <div
                                    role="group"
                                    aria-labelledby="electionPartiesGroup"
                                >
                                    <ElectionVotingRadioInput
                                        electionParty={electionParty}
                                        groupName="electionParty"
                                        value={values.electionParty}
                                        initialValue={
                                            initialValues.electionParty
                                        }
                                    />
                                </div>
                            </div>
                        )
                    })}

                    {new Date(election.startFrom) <= now &&
                        now < new Date(election.endTo) && (
                            <button
                                type="submit"
                                disabled={
                                    initialValues.electionParty ==
                                    values.electionParty
                                }
                            >
                                {'Odeslat'}
                            </button>
                        )}
                </Form>
            )}
        </Formik>
    )
}

export default ElectionVotingForm
