import { useAuth } from "../../context/AuthContext";

const TasksCard = ({ cardTitle='Card Title', cardDescription='This is the card description.', status='in_progress',  dueDate='' }) => {
    const { user } = useAuth()
    const formatStatus = (status) => {
        switch (status) {
            case 'in_progress':
                return <span className="badge bg-warning text-dark">In Progress</span>;
            case 'completed':
                return <span className="badge bg-success">Completed</span>;
            default:
                return <span className="badge bg-secondary">Unknown</span>;
        }
    };
    
    return (
        <>
            <div className="card mb-3 shadow-sm" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{cardTitle}</h5>
                    <p className="card-text text-muted">{cardDescription}</p>

                    <div className="mb-2">
                        {formatStatus(status)}
                    </div>

                    {dueDate && (
                        <p className="card-text">
                            <small className="text-muted">Due: {new Date(dueDate).toLocaleDateString()}</small>
                        </p>
                    )}

                    <div className="d-flex justify-content-between">
                        {/* <a href="#" className="card-link">Edit</a>
                        <a href="#" className="card-link text-danger">Delete</a> */}
                        <button className="text-muted p-1 card rounded border">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TasksCard