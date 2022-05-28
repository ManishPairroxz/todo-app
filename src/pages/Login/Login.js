import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import validate from '../../Others/LoginFormValidaationRules';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Others/firebase';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Loader from "react-loader-spinner";
import { useState } from 'react';

function Login() {
    const [loading, setLoading] = useState(false)
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(login, validate);
    const history = useHistory();

    async function login() {
        setLoading(true);

        console.log('login');
        try {
            console.log('loader123')

            const result = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            ).then((res) => {
                console.log(res);
                
                setTimeout(() => {
                    setLoading(false);
                    redirectToTasks();
                }, 1000);

            }).catch((error) => {
                setLoading(false);
                console.log(error);
                console.log(error.toString().replace('FirebaseError: Firebase: ', ''))
                console.dir(error);
                alert(error.toString().replace('FirebaseError: Firebase: ', ''));
            })

            const email = `${'"' + values.email + '"'}`;
            axios.get('https://todo-react-91a88-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo=' + email).then((res) => {
                let data = Object.entries(res.data);
                console.log(data);

                localStorage.setItem('userDetails', JSON.stringify(data[0][1]));
            }).catch((errors) => {

            })

            localStorage.setItem('accessToken', result.user.accessToken);
            localStorage.setItem('userDetails', JSON.stringify(values));

            alert('Login is successfull.');
        } catch (error) {

        }
    }

    function redirectToTasks() {
        history.push('tasks');
    }


    return (

        <div>
            {!loading ? <Form className="form">
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

                <Button type='submit' variant="primary" onClick={handleSubmit}>Submit</Button>

                <div>
                    <Form.Label>New user? <Link to="/register">Register</Link> </Form.Label>

                </div>

            </Form> : <Loader
                type="Puff"

                className="center-laoder"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />}

        </div>
    );
}

export default Login;
