interface Vote {
    id: number
    value: number
    isPreferVote: boolean
    votes: Vote[]
}

export default Vote
