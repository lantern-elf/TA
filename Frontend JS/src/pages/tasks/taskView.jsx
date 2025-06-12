import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TasksCard from "../../components/tasksCard/tasksCard";

const TaskView = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [ userAssign, setUserAssign ] = useState(null)
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

    const fetchTask = async () => {
        try {
            const response = await fetch(`http://localhost:3001/task/${id}`);
            const result = await response.json();
            if (result) {
                setTask(result[0].payload.data);
                setUserAssign(result[0].payload.data?.assigned_users)
                console.log(result)
                console.log(userAssign)
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    if (!task) return <p>Loading data...</p>;

    return(
        <>  
            <Navbar manage={true} />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Task Detail</h4>
                            </div>
                            <div className="card-body">
                                <p><strong>Title: </strong>{task.title}</p>
                                <p><strong>Description: </strong>{task.description}</p>
                                <p><strong>Status: </strong>{formatStatus(task.status)}</p>
                                <p><strong>Due Date: </strong>{new Date(task.due_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Asigned Users</h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-light table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th colSpan="2" className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userAssign.length > 0 ? (
                                            userAssign.map((user) => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td className="text-capitalize">{user.role}</td>
                                                    <td align="center"><button onClick={() => navigate(`/user/${user.id}`)} className="btn btn-info btn-sm">View</button></td>
                                                    {/* <td align="center"><button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger btn-sm">Delete</button></td> */}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="6">No users found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskView