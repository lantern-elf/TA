import { useEffect, useState } from "react"

const Test = () => {
    const endpoint = "http://localhost:3001/users"
    const [users, setUsers] = useState([])

    const fetchusers = async() => {
        const response = await fetch(endpoint)
        const data = await response.json()
        setUsers(data)
        console.log(users)
    }

    useEffect(() => {
        fetchusers()
    }, [])

    return(
        <>
            <h1>List Data</h1>
            {users.data && users.data.map((user) => {
                return(
                    <div key={user.id}>
                        <p>{user.name}</p>
                    </div>
                )
            })}
        </>
    )
}

export default Test