import React, {useState, useEffect} from "react";
import axios from 'axios'
import "../styles/Tasks.css"

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [title, setTitle] = useState("");
    const [count, setCount] = useState(tasks.length);
    const [completedStatus, setCompletedStatus] = useState("");
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then((response) => {
            console.log(response.data);
            setTasks(response.data);
            setCount(tasks.length);
        })
        .catch((error) => {
            setErrorMessage(error.message);
        })
    }, [])

    const handleAddTask = (event) => {
        event.preventDefault();
        if(title.length>0){
            let data = {
                id: tasks.length + 1,
                title: title,
                completed: completedStatus,
                
            }
            setTasks([...tasks, data]);
            setCount(tasks.length + 1);
            setTitle("");
        }
    }

    
 
    return(
        <>
            
            <h3>User Tasks</h3>
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
            <h3>Add Task</h3>
            <form onSubmit={(e) => handleAddTask(e)}>
                <label>Task Id: </label>
                <input type="text" disabled value={tasks.length + 1}/>
                <br />
                <label>Title: </label>
                <input onChange={(e) => setTitle(e.target.value)} className="title"></input>
                <div className="dropdown">
                <label>Completed: </label>
                <select onChange={(e) => setCompletedStatus(e.target.value)}>
                    <option value="">-Select-</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                </div>
                <button type="submit">Add</button>
            </form>

        </>
    )
}

export default Tasks;