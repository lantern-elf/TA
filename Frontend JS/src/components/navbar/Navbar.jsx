import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({home=false, tasks=false, manage=false, test=false}) => {
    const navigate = useNavigate()
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("/login");
      };
    return(
        <nav className="navbar navbar-expand-lg bg-light sticky-top" style={{ height: '8vh' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Internflow 
                    {
                        user?.role === 'admin' && (
                            <small className="text-muted"> admin</small>
                        )
                    }
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${home ? 'active' : ``}`} href="" onClick={() => navigate('/home')}>Home</a>
                        </li>
                        {
                            user?.role === 'intern' && (
                                <>
                                    <li className="nav-item">
                                    <a className={`nav-link ${tasks ? 'active' : ``}`} href="" onClick={() => navigate('/tasks')}>Tasks</a>
                                    </li>
                                </>
                            )
                        }
                        {
                            user?.role === 'admin' && (
                                <>
                                    <li className="nav-item">
                                        <a className={`nav-link ${manage ? 'active' : ``}`} href="" onClick={() => navigate('/manage')}>Manage</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${test ? 'active' : ``}`} href="" onClick={() => navigate('/test')}>Test</a>
                                    </li>
                                </>
                            )
                        }
                        <li className="nav-item">
                            <a className="nav-link pe-auto" href="" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar