import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all"| "completed"| "active"


function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Redux", isDone: false }
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function changeFilter(value:FilterValuesType) {
        setFilter(value)
    }

    function removeTask (id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask (title: string) {
        let task = {id: v1(), title: title, isDone: true};
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus (id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if(task) {
         task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let taskForTodolist = tasks;
    if(filter === "active") {
        taskForTodolist = tasks.filter((t) => t.isDone === false)
    }

    if(filter === "completed") {
        taskForTodolist = tasks.filter((t) => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
