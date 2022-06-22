import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId1: string,
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

type ChangeTaskActionType = {
    type: 'CHANGE-TASK-STATUS',
    isDone: boolean,
    todolistId: string,
    taskId: string
}

type ChangeTaskTitleActionType= {
    type: "CHANGE-TASK-TITLE",
    taskId: string,
    todolistId: string,
    title: string

}


export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            const tasks = state[action.todolistId1]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId1] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTasks = [{id: v1(), title: action.title, isDone: false}, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = state[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = state[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = [];
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId1: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todolistId1,
        taskId
    }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        isDone,
        todolistId,
        taskId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
        todolistId
    }
}