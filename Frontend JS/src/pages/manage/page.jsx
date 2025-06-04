import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import TasksCard from "../../components/tasksCard/TasksCard";

const Manage = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    const fetchData = async () => {
        try {
            const [resUsers, resTasks] = await Promise.all([
                fetch("http://localhost:3001/users"),
                fetch("http://localhost:3001/tasks")
            ]);

            if (!resUsers.ok || !resTasks.ok) {
                throw new Error("Failed to fetch users or tasks from the server.");
            }

            const [resultUsers, resultTasks] = await Promise.all([
                resUsers.json(),
                resTasks.json()
            ]);

            const userData = resultUsers[0]?.payload?.data;
            const taskData = resultTasks[0]?.payload?.data;

            if (userData && taskData) {
                setUsers(userData);
                setTasks(taskData);
            } else {
                console.error("Unexpected data shape:", {
                    users: resultUsers,
                    tasks: resultTasks
                });
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };
    
    useEffect(() => {    
        fetchData();
    }, []);    

    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try{
            const response = await fetch ("http://localhost:3001/users", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            })
            fetchData(); // Refresh the list after deletion
        }
        catch{
            console.error("Error deleting user:", error);
        }
    }

    return (
        <>
            <Navbar manage={true} />

            <div className="container-fluid mt-3">
                <div className="row">
                    {/* Left column - Users */}
                    <div className="col-md-6 border-end">
                        <h5 className="mb-3">Interns</h5>
                        <table class="table table-light table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th className="text-center" colSpan="3" scope="col">Action</th>
                                </tr>
                            </thead>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tbody key={user.id}>
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td className="text-capitalize">{user.role}</td>
                                            <td align="center"><button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger btn-sm">Delete</button></td>
                                            <td align="center"><button className="btn btn-warning btn-sm">Edit</button></td>
                                            <td align="center"><button onClick={() => navigate(`/user/${user.id}`)} className="btn btn-info btn-sm">View</button></td>
                                        </tr>
                                    </tbody>
                                ))
                            ) : (
                                <p>No tasks found.</p>
                            )
                            }
                        </table>
                    </div>

                    {/* Right column - Tasks */}
                    <div className="col-md-6">
                        <h5 className="mb-3">Tasks</h5>
                        <div className="d-grid gap-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',}}>
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <TasksCard
                                        key={task.id}
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
        </>
    );
};

export default Manage;
