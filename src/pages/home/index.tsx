import { useTitle } from '../../hooks/useTitle'
import Heading from '../../components/heading'

const Home = () => {
    useTitle('Domovská stránka')

    return (
        <>
            <Heading>Domů</Heading>

            <div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin lacinia neque in nulla varius sagittis. Curabitur eget
                    condimentum urna, sed luctus nulla. Nulla sed dignissim
                    eros. Nullam porta libero non nunc bibendum, sit amet
                    vulputate erat porta. Donec eget malesuada libero. Nam sem
                    felis, tristique et leo ac, fringilla sodales dui. Donec
                    fermentum finibus tellus quis elementum. Cras et nibh nec
                    lectus pharetra cursus. Quisque nec tempor mauris. Aliquam
                    diam est, auctor sit amet egestas blandit, gravida non
                    tellus. Pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas. Aliquam dapibus
                    arcu vitae erat malesuada, vitae bibendum justo vulputate.
                </p>
                <p>
                    {' '}
                    Nulla egestas ullamcorper erat, in tristique odio lacinia
                    quis. Etiam sodales eros nec purus sagittis egestas. Aenean
                    suscipit leo id posuere semper. Donec arcu libero,
                    sollicitudin id velit ac, dictum venenatis purus.
                    Pellentesque id arcu lorem. Donec vestibulum ut arcu eget
                    euismod. Nunc non eros ut enim accumsan facilisis quis sed
                    leo.
                </p>
                <p>
                    {' '}
                    Proin at mi vel sapien convallis ullamcorper. Vivamus
                    sagittis turpis sem, a finibus ante porttitor eu. Nullam eu
                    rhoncus leo. In in libero accumsan velit tempor maximus.
                    Curabitur est nibh, convallis id vehicula ultrices, ultrices
                    id eros. Pellentesque faucibus sollicitudin est quis
                    molestie. Donec et efficitur arcu. Cras a libero venenatis,
                    volutpat nibh non, sodales sapien. Aliquam volutpat, tellus
                    a porttitor sollicitudin, diam lorem congue tellus, a mattis
                    ex dolor quis enim. Pellentesque in erat pretium ex maximus
                    consectetur. Etiam id fermentum elit, ac feugiat urna. Nam
                    laoreet vehicula lacus, ac malesuada nunc faucibus nec. In
                    eu eros laoreet, consectetur tortor a, gravida nibh.
                    Pellentesque vitae laoreet risus. Proin egestas, sem sed
                    facilisis viverra, nulla sapien mollis magna, eget
                    condimentum velit ante a ligula.
                </p>
                <p>
                    {' '}
                    Fusce varius lorem in justo sodales, ultricies porta nibh
                    tincidunt. Vestibulum mauris nisi, gravida eget nisi ac,
                    congue finibus nibh. Duis eget ligula in massa rhoncus
                    consequat vel quis metus. Sed in lectus euismod, blandit
                    arcu ut, efficitur mauris. Ut faucibus nibh eu sem lobortis,
                    fermentum finibus sem varius. Maecenas auctor nibh id enim
                    viverra, vel vulputate nulla pretium. Nullam ac posuere
                    felis. Cras malesuada cursus tortor, non pretium metus
                    egestas eget. Donec sollicitudin posuere diam.
                </p>
                <p>
                    {' '}
                    Fusce at nisi blandit justo volutpat mollis. Etiam sit amet
                    urna laoreet, sodales tortor a, vestibulum justo. Maecenas
                    vel orci cursus, sagittis enim at, facilisis est. Nullam non
                    eros tempus, cursus arcu vel, aliquam urna. Quisque sagittis
                    erat vitae ullamcorper vehicula. Vivamus blandit ac tortor
                    tempus molestie. Praesent at vehicula nunc. Vestibulum
                    interdum diam eu massa molestie, in ullamcorper augue
                    ullamcorper. Curabitur tempor, massa nec maximus
                    condimentum, ex nulla venenatis massa, ornare pretium dolor
                    mi vitae nisi. Ut sit amet pellentesque sapien, at euismod
                    turpis. Aliquam nec leo nisi. Etiam tincidunt urna auctor,
                    rhoncus magna volutpat, mollis turpis. Ut porta nibh a
                    blandit ultricies. Phasellus venenatis, eros et congue
                    auctor, est enim viverra nisi, in pharetra justo eros sed
                    enim.
                </p>
            </div>
        </>
    )
}

export default Home
