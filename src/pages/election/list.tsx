import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'
import { useEffect, useState } from 'react'
import api from '../../utils/api/election'
import useAuth from '../../hooks/useAuth'
import ElectionModel from '../../utils/models/election.model'
import Loading from '../../page-section/loading'
import { ElectionTypeEnum } from '../../utils/enums/ElectionTypeEnum'
import ElectionBox from '../../page-section/election/election-box'

const Election = () => {
    useTitle('Volby')
    const { user, isLoading } = useAuth({ middleware: 'auth', role: 'voter' })

    const [elections, setElections] = useState<ElectionModel[]>([])

    useEffect(() => {
        if (user) {
            api.list().then((data) => {
                setElections(data)
            })
        }
    }, [user])

    if (isLoading || !user) {
        return <Loading />
    }

    return (
        <>
            <Heading>Volby</Heading>

            {elections.length > 0 && (
                <>
                    {Object.keys(ElectionTypeEnum).map(
                        (electionType, index) => {
                            const electionsOfType = elections.filter(
                                (election) => election.type === electionType
                            )

                            if (electionsOfType.length > 0) {
                                return (
                                    <ElectionBox
                                        electionsOfType={electionsOfType}
                                        electionType={electionType}
                                        key={index}
                                    />
                                )
                            }
                        }
                    )}
                </>
            )}
        </>
    )
}

export default Election
