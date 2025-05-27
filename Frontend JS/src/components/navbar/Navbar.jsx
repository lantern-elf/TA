import { useNavigate } from "react-router-dom"

const Navbar = ({home=false, login=false}) => {
    const navigate = useNavigate()
    return(
        <nav className="navbar navbar-expand-lg bg-light" style={{ height: '8vh' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Internflow</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left-aligned links */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${home ? 'active' : ``}`} href="#" onClick={() => navigate('/home')}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${login ? 'active' : ``}`} href="/login">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar