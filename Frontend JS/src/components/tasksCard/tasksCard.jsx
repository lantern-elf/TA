import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TasksCard = ({ taskId, cardTitle='Card Title', cardDescription='This is the card description.', status='in_progress',  dueDate='', handleDelete }) => {
    const navigate  = useNavigate()
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

                    <div className="d-flex gap-3">
                        {user?.role === 'intern' && (
                            <button className="btn-sm btn btn-primary">Submit</button>
                        )}
                        {user?.role === 'admin' && (
                            <>
                                <button onClick={() => navigate(`/task/${taskId}`)} className="btn-sm btn btn-info">View</button>
                                <button onClick={() => handleDelete(taskId)} className="btn-sm btn text-danger">Delete</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TasksCard