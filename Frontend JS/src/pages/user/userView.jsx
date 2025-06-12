import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import TasksCard from "../../components/tasksCard/tasksCard";

const API_URL = "http://localhost:3001/users";

const UserView = () => {
    const navigate = useNavigate() 
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const result = await response.json();
                if (result) {
                    setUser(result[0].payload.data[0]);
                    console.log(result);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`http://localhost:3001/tasks/user/${id}`);
                const taskResult = await res.json();

                if (taskResult[0]?.payload.data) {
                    setTasks(taskResult[0]?.payload.data);
                } else {
                    console.error("Failed to fetch tasks:", data.message);
                }
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };

        fetchTasks();
    }, []);

    if (!user) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar manage={true} />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0"> User Details</h4>
                            </div>
                            <div className="card-body">
                                <p className="mb-2"><strong>ID:</strong> {user.id}</p>
                                <p className="mb-2"><strong>Name:</strong> {user.name}</p>
                                <p className="mb-2"><strong>Role:</strong> 
                                    <span className={`text-capitalize badge ms-2 ${
                                        user.role === "admin"
                                            ? "bg-danger"
                                            : user.role === "editor"
                                            ? "bg-warning text-dark"
                                            : "bg-secondary"
                                    }`}>
                                        {user.role}
                                    </span>
                                </p >
                                <p className="mb-2"><strong>Created At:</strong> {user.created_at}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Asigned Tasks</h4>
                            </div>
                            <div className="card-body">
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <TasksCard
                                            key={task.id}
                                            taskId={task.id}
                                            cardTitle={task.title}
                                            cardDescription={task.description}
                                            status={task.status}
                                            dueDate={task.due_date}
                                        />
                                    ))
                                    ) : (
                                    <p>No tasks found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserView;
