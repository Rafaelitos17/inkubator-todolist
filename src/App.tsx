import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType

}

function App() {

    const todoListsId1 = v1();
    const todoListsId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListsId1, title: "What to learn", filter: "all"},
        {id: todoListsId2, title: "What to buy", filter: "all"},
    ])

    const [tasksObj, setTasksObj] = useState({
        [todoListsId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListsId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Pen", isDone: true},
            {id: v1(), title: "Pencil", isDone: false},
            {id: v1(), title: "Storybook", isDone: false},
        ],
    })

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: true};
        let tasks = tasksObj[todoListId]
        let newTasks = [task, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasksObj({...tasksObj})
    }

    function removeTodoList(todoListId: string) {
        let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    return (
        <div className="App">
            {todoLists.map((tl) => {
                let taskForTodolist = tasksObj[tl.id];
                if (tl.filter === "active") {
                    taskForTodolist = taskForTodolist.filter((t) => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    taskForTodolist = taskForTodolist.filter((t) => t.isDone === true)
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                />
            })
            }
        </div>
    );
}

export default App;
