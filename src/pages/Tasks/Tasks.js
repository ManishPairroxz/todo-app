import { useEffect, useState } from 'react';
import Header from '../../Components/header/Header';
import './Tasks.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import validate from '../../Others/TasksFormValidations';
import useForm from '../../Hooks/useForm';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import moment from 'moment';
import Loader from "react-loader-spinner";

function Tasks() {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(taskSubmit, validate);
    const [date, setDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [loading, setLoading] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(false);


    useEffect(() => {
        setTimeout(() => {
            getTasks();
        }, 500);
    }, []);

    function getTasks() {

        let userDetails = JSON.parse(localStorage.getItem('userDetails'));
        console.log(userDetails);

        let userId = `${'"' + userDetails._id + '"'}`;
        console.log(userId);

        axios.get('https://todo-react-91a88-default-rtdb.firebaseio.com/tasks.json?orderBy="userId"&equalTo=' + userDetails._id).then((res) => {
            const result = Object.entries(res.data);
            const resultData = [];

            result.forEach((element) => {
                resultData.push(element[1]);
            });
            setTasks(resultData);
        }).catch((error) => {

        });
    }

    function handleDateChange(date, event) {

        const newEvent = {
            target: {
                name: 'startDate',
                value: date
            }
        }
        handleChange(newEvent);
        setStartDate(date);
        setDate(date);
    }

    function handleDeleteClose(event, option) {
        console.log(event)
        console.log(option);
        console.log(itemToDelete);

        if (option == 'yes') {
            setDeleteShow(false);
            // https://[PROJECT_ID].firebaseio.com/locations/{{id}}.json

            // Find the tasks
            axios.get('https://todo-react-91a88-default-rtdb.firebaseio.com/tasks.json?orderBy="_id"&equalTo=' + itemToDelete._id).then((res) => {
                console.log(res);

                let object = Object.entries(res['data']);
                console.log(object);
                console.log(object[0][0]);


                axios.delete('https://todo-react-91a88-default-rtdb.firebaseio.com/tasks/'+ object[0][0] + '.json').then((res) => {
                    console.log(res);
                    window.location.reload();
                }).catch((error)    =>  {
                    console.log(error);
                    alert(error.toString().replace('FirebaseError: Firebase: ', ''));

                });

            }).catch((error) => {
                console.log(error);
            })
        } else if (option == 'no')  {
            setDeleteShow(false);
        }
    }

    function handleDueDateChange(date, event) {
        const newEvent = {
            target: {
                name: 'dueDate',
                value: date
            }
        }
        handleChange(newEvent);
        setDueDate(date);
    }

    function handleEdit(event, item) {
        console.log(event);
    }

    function taskSubmit(e) {
        // e.preventDefault(); 
        let result = localStorage.getItem('userDetails');
        let userDetails = JSON.parse(result);
        console.log(userDetails);
        console.log(userDetails._id);
        setLoading(true);

        axios.post('https://todo-react-91a88-default-rtdb.firebaseio.com/tasks.json', {
            title: values.title,
            description: values.description,
            priority: values.priority,
            startDate: values.startDate,
            dueDate: values.dueDate,
            userId: userDetails._id,
            _id: Math.floor(Math.random() * 10000)
        }).then((res) => {
            setLoading(false);
            handleClose();
            alert('Task has been added successfully.');
            window.location.reload();
            getTasks();
        }).catch((error) => {
            setLoading(false);
            alert(error.errors.message);
        });
    }

    return (
        <div>
            <Header />

            {/* Body */}
            {
                <>
                    {
                        !loading ?
                            <><><Button variant="primary" onClick={() => setShow(true)}>+ Add a task</Button><Table responsive>
                                <thead>
                                    <tr>
                                        <th>Task Name</th>
                                        <th>Description</th>
                                        <th>Priority</th>
                                        <th>Date</th>
                                        <th>Due date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        tasks.map((element) => {
                                            return (
                                                <tr>
                                                    <td>{element.title}</td>
                                                    <td>{element.description}</td>
                                                    <td>{element.priority}</td>
                                                    <td>{moment(element.startDate).format('DD/MM/YYYY')}</td>
                                                    <td>{moment(element.dueDate).format('DD/MM/YYYY')}</td>
                                                    <td><button className='btn btn-primary edit-button' onClick={(event) => handleEdit(event, element)}>Edit</button></td>
                                                    <td><button className='btn btn-danger   edit-button' onClick={() => { setDeleteShow(true); setItemToDelete(element); }}>Delete</button></td>
                                                </tr>);

                                        })}
                                </tbody>
                            </Table>
                            </>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add a Task</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control name='title' type="text" placeholder="Enter Title" onChange={handleChange} value={values.title} required />
                                            </Form.Group>

                                            {errors.title && <h3 className='error'>{errors.title}</h3>}

                                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control name='description' as="textarea" type="text" placeholder="Description" onChange={handleChange} value={values.description} required />
                                            </Form.Group>

                                            {errors.description && <h3 className='error'>{errors.description}</h3>}

                                            <Form.Group className="mb-3" controlId="formBasicPriority">
                                                <Form.Select name='priority' aria-label="Priority" onChange={handleChange} value={values.priority} required>
                                                    <option disabled>Select Priority</option>
                                                    <option value="high">High</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="low">Low</option>
                                                </Form.Select>
                                            </Form.Group>

                                            {errors.priority && <h3 className='error'>{errors.priority}</h3>}

                                            <Form.Group className="mb-3" controlId="formBasicDatepicker">
                                                <Datepicker
                                                    selected={startDate}
                                                    onChange={(date, event) => handleDateChange(date, event)}
                                                    minDate={new Date()}
                                                    maxDate={new Date(moment(new Date()).add('5', 'months'))}
                                                    placeholderText="Date"
                                                    value={values.startDate}

                                                >
                                                </Datepicker>


                                            </Form.Group>

                                            {errors.startDate && <h3 className='error'>{errors.startDate}</h3>}

                                            <Form.Group className='mb-3' controlId="formBasicDueDatePicker">
                                                <Datepicker
                                                    selected={dueDate}
                                                    onChange={(date, event) => handleDueDateChange(date, event)}
                                                    minDate={date}
                                                    maxDate={new Date(moment(new Date()).add('5', 'months'))}
                                                    placeholderText="Due date"
                                                    value={values.dueDate}
                                                    name='dueDate'
                                                >
                                                </Datepicker>
                                            </Form.Group>

                                            {errors.dueDate && <h3 className='error'>{errors.dueDate}</h3>}

                                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                                Submit
                                            </Button>

                                        </Form>
                                    </Modal.Body>
                                </Modal>

                                {/* Delete confirmation modal */}
                                <Modal show={deleteShow} onHide={handleDeleteClose}>
                                    <Modal.Header deleteCloseButton>
                                        <Modal.Title>Delete a Task</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to delete this Task?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={(event) => handleDeleteClose(event, 'yes')}>
                                            Yes
                                        </Button>
                                        <Button variant="secondary" onClick={(event) => handleDeleteClose(event, 'no')}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                {/* Delete confirmation modal */}
                            </>
                            : <Loader
                                type="Puff"
                                className="center-laoder"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={3000} //3 secs
                            />
                    }
                </>
            }

        </div>
    )
}

export default Tasks;