import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('')

    function onClickFilterAllHandler() {
        props.changeFilter("all")
    }

    function onClickFilterActiveHandler() {
        props.changeFilter("active")
    }

    function onClickFilterCompletedHandler() {
        props.changeFilter("completed")
    }

    function onChangeTitleHandler (e:ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    function onKeyDownHandler (e: KeyboardEvent<HTMLInputElement>) {
        if(e.key === "Enter"){
            props.addTask(title);
            setTitle('')
        }
    }

    function addTask () {
        props.addTask(title);
        setTitle('')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeTitleHandler}
                   onKeyDown={onKeyDownHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {
                function onClickRemoveHandler() {
                    props.removeTask(t.id)
                }
                function onChangeCheckBoxHandler(e: ChangeEvent<HTMLInputElement>) {
                    props.changeStatus(t.id, e.currentTarget.checked)
                }
                return (
                    <li key={t.id}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeCheckBoxHandler}
                        /> <span>{t.title}</span>
                        <button onClick={onClickRemoveHandler}>x</button>
                    </li>
                )
            })}

        </ul>
        <div>
            <button onClick={onClickFilterAllHandler}>All</button>
            <button onClick={onClickFilterActiveHandler}>Active</button>
            <button onClick={onClickFilterCompletedHandler}>Completed</button>
        </div>
    </div>
}
