import { useTitle } from '../../../hooks/useTitle'
import Heading from '../../../components/heading'
import useAuth from '../../../hooks/useAuth'
import * as Yup from 'yup'
import FormWrapper from '../../../components/form'
import Loading from '../../../page-section/loading'
import { useEffect, useState } from 'react'
import apiCandidate from '../../../utils/api/candidate'
import apiElection from '../../../utils/api/election'
import { useParams } from 'react-router-dom'
import ElectionModel from '../../../utils/models/election.model'
import CandidateModel from '../../../utils/models/candidate.model'

const ElectionAssignCandidates = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'admin' })
    const { id } = useParams()

    const [election, setElection] = useState<ElectionModel | null>(null)

    const [candidates, setCandidates] = useState<CandidateModel[]>([])

    useEffect(() => {
        if (user && id) {
            apiElection.show(id).then((data) => {
                setElection(data)
            })

            apiCandidate.list().then((data) => {
                setCandidates(data)
            })
        }
    }, [user, id])

    const mapOptions = (candidates: CandidateModel[]) => {
        const options: { value: string; text: string }[] = []
        candidates.forEach(({ id, name }) => {
            const option = {
                value: id.toString(),
                text: name,
            }
            options.push(option)
        })
        return options
    }

    const inputs = [
        {
            label: 'Kandidáti',
            name: 'candidates',
            type: 'checkbox',
            options: mapOptions(candidates),
        },
    ]

    if (isLoading || !user || !election) {
        return <Loading />
    }

    const initialValues = {
        candidates: election.candidates.map((election) =>
            election.id.toString()
        ),
    }

    const validationSchema = Yup.object().shape({})

    const handleSubmit = async (data: any) => {
        if (election.id !== 0) {
            apiElection.assignCandidates(election.id, data)
        }
    }

    return (
        <>
            <Heading>Přidat kandidáty k volbám</Heading>

            <FormWrapper
                inputs={inputs}
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={handleSubmit}
                submitText={'Přidat kandidáty k volbám'}
            />
        </>
    )
}

export default ElectionAssignCandidates
