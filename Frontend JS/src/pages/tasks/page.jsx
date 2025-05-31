import Navbar from "../../components/navbar/Navbar";
import TasksCard from "../../components/tasksCard/tasksCard";

const Tasks = () => {
    return (
        <>
            <Navbar tasks={true} />
            <h2 className="p-2">Finish your tasks!</h2>
            <div className="p-2 d-grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
                <TasksCard />
                <TasksCard />
                <TasksCard />
                <TasksCard />
                <TasksCard />
                <TasksCard />
                <TasksCard />
                <TasksCard />
            </div>
        </>
    )
}

export default Tasks;
