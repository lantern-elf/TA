const UsersCard = ({ id, name, email, role }) => {
    return (
        <>
            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex gap-2">
                        <span>ID-{id}</span>
                        <span>{name}</span>
                        <span className="d-none d-sm-block">{email}</span>
                        <span className="text-capitalize">{role}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default UsersCard