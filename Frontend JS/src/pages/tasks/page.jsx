import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import TasksCard from "../../components/tasksCard/tasksCard"; 
import { useAuth } from "../../context/AuthContext";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth()

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`http://localhost:3001/tasks/user/${user.id}`);
                const result = await res.json();

                if (result[0]?.payload.data) {
                    setTasks(result[0]?.payload.data);
                } else {
                    console.error("Failed to fetch tasks:", data.message);
                }
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };

        fetchTasks();
    }, []);

    return (
        <>
            <Navbar tasks={true} />
            <h2 className="p-2">Finish your tasks!</h2>
            <div className="p-2 d-grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
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
        </>
    );
};

export default Tasks;
