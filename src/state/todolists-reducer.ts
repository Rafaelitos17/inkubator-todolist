import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state,]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter
            }
        }
        return [...state]
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todolistId1: string):RemoveTodolistActionType=> {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId1
    }
}
export const addTodolistAC = (newTodolistTitle: string):AddTodolistActionType=> {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
    }
}
export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string):ChangeTodolistTitleActionType=> {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        title: newTodolistTitle
    }
}
export const changeTodolistFilterAC = (todolistId2: string, newFilter: FilterValuesType):ChangeTodolistFilterActionType=> {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        filter: newFilter
    }
}