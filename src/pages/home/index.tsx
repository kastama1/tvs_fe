import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'

const Home = () => {
    useTitle('Domovská stránka')

    return (
        <>
            <Heading>Domů</Heading>
        </>
    )
}

export default Home
