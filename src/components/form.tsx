import React, { useState } from "react"
import { Button, Card } from "react-bootstrap"
import Form from 'react-bootstrap/Form'
import "./form.css"



interface IntTask {
    name: string,
    done: boolean
}

const FormTasks = () => {

    const [task, setTask] = useState<string>("")
    const [tasks, setTasks] = useState<IntTask[]>([])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addTask(task)
        setTask("")
    }

    const addTask = (name: string) => {
        const newTasks: IntTask[] = [...tasks, { name, done: false }]
        setTasks(newTasks)
    }

    const toggleDone = (i : number) => {
        const newTasksCopy : IntTask[] = [...tasks]
        newTasksCopy[i].done = !newTasksCopy[i].done
        setTasks(newTasksCopy)
    }

    const deleteTask = (i: number) => {
        const newTasksCopy : IntTask[] = [...tasks]
        newTasksCopy.splice(i, 1)
        setTasks(newTasksCopy)
    }

    return (
        <>


            <Form onSubmit={handleSubmit}  style={{ width: '28rem' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>To do task:</Form.Label>
                    <Form.Control type="text" onChange={e => setTask(e.target.value)} value={task} placeholder="Enter a task" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>

            {
                tasks.map((t: IntTask, i: number) => {
                    return (
                        
                        <Card style={{ width: '18rem' }} key={i} className={t.done ? "green" : "red" }>
                            <Card.Body>
                                <Card.Title>{t.name}</Card.Title>
                                <Card.Text>
                                    {t.done}
                                </Card.Text>
                                <Button variant={t.done ? "danger" : "success" } onClick={() => toggleDone(i)}>{!t.done ? "Tarea realizada" : "Deshacer tarea" }</Button>
                                <Button variant="dark" onClick={() => deleteTask(i) }>Remove</Button>
                            </Card.Body>
                        </Card>

                    )
                })
            }
        </>
    )
}

export default FormTasks