import { Helmet } from "react-helmet"
import Navbar from "../../components/navbar/Navbar"

const Home = () => {
    return(
        <>
            <Helmet>
                <title>Home | Internflow</title>
            </Helmet>
            <Navbar home={true} />
            <main style={{height: '92vh'}}>
                <div className="">Selamat Datang di Internflow</div>
            </main>
        </>
    )
}

export default Home