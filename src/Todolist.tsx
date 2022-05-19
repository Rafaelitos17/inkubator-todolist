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
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

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
        setError(null)
        if(e.key === "Enter"){
            if(title.trim() !== '') {
                props.addTask(title);
                setTitle('')
            }
            else {
                setError("This text required")
            }
        }
    }

    function addTask () {
        if(title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('')
        } else {
            setError("This text required")
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeTitleHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
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
                    <li key={t.id} className={t.isDone? "is-done": ""}>
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
            <button className={props.filter === "all" ? "active-filter": ""} onClick={onClickFilterAllHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter": ""} onClick={onClickFilterActiveHandler}>Active</button>
            <button className={props.filter === "completed" ? "active-filter": ""} onClick={onClickFilterCompletedHandler}>Completed</button>
        </div>
    </div>
}
