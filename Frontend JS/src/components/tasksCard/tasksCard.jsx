const TasksCard = ({ cardTitle='Card Title', cardDescription='This is the card description.' }) => {
    return (
        <>
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{cardTitle}</h5>
                    <p className="card-text">{cardDescription}</p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        </>
    )
}

export default TasksCard