import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import validate from '../../Others/RegisterFormValidation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Others/firebase';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const history = useHistory();

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(register, validate);

    async function register() {
          
         
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );    
            
              

            axios.post('https://todo-react-91a88-default-rtdb.firebaseio.com/users.json', {
                name : values.name,
                email : values.email,
                profile_picture : '',
                _id : Math.floor(Math.random() * 10000)
            }).then((res)   =>  {
                   
            }).catch((error)    =>  {
                 alert(error.errors.message);
            });

            const userDetails = {
                name : values.name,
                email : values.email,
                profile_picture : '',
                _id : Math.floor(Math.random() * 10000)
            }
            localStorage.setItem('accessToken', result.user.accessToken);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));

            alert('Signup is successfull.');

            redirectToTasks();

        } catch (error) {

        }
    }

    function redirectToTasks() {
        history.push('tasks');
    }

    return (
        <div>
            <Form className="form">
                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter name" onChange={handleChange} value={values.name} />
                </Form.Group>

                {
                    errors.name && <h3 className='error'>Name is required.</h3>
                }

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Email" onChange={handleChange} value={values.email} required />
                </Form.Group>

                {
                    errors.email && <h3 className='error'>{errors.email}</h3>
                }
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter password" onChange={handleChange} value={values.password} required />
                </Form.Group>

                {
                    errors.password && <h3 className='error'>{errors.password}</h3>
                }
                <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} value={values.confirmPassword} required />
                </Form.Group>

                {
                    errors.confirmPassword && <h3 className='error'>{errors.confirmPassword}</h3>
                }

                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                <div>
                    <Form.Label>Already a user <Link to="/login">Login</Link> </Form.Label>

                </div>
            </Form>
        </div>
    );
}

export default Register;