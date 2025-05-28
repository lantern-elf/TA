import { Helmet } from "react-helmet"
import Navbar from "../../components/navbar/Navbar"
import { useAuth } from "../../context/AuthContext";

const Home = () => {
    const { user } = useAuth();
    return(
        <>
            <Helmet>
                <title>Home | Internflow</title>
            </Helmet>
            <Navbar home={true} />
            <main style={{height: '92vh'}}>
                <p>You are {user?.name}</p>
                <p>Your ID is {user?.id}</p>
                <p>Your role: {user?.role}</p>
            </main>
        </>
    )
}

export default Home