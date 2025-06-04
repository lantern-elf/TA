import { Helmet } from "react-helmet"
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar"

const Home = () => {
    const { user } = useAuth();

    const isAdmin = user?.role === 'admin';

    return (
        <>
            <Helmet>
                <title>Home | Internflow</title>
            </Helmet>
            <Navbar home={true} />
        </>
    )
}

export default Home;
