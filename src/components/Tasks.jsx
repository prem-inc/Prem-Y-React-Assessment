import React, {useState, useEffect} from "react";
import axios from 'axios'
import "../styles/Tasks.css"

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then((response) => {
            console.log(response.data);
            setTasks(response.data);
        })
        .catch((error) => {
            setErrorMessage(error.message);
        })
    }, [])

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        return(
                        <tr>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.completed ? "Yes" : "No"}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>

        </>
    )
}

export default Tasks;