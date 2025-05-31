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
            {
                isAdmin && (
                    <main style={{ height: '92vh' }}>
                        <p>You are {user?.name}</p>
                        <p>Your ID is {user?.id}</p>
                        <p>Your role: {user?.role}</p>
                    </main>
                )
            }
        </>
    )
}

export default Home;
