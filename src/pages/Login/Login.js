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

function Login() {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(login, validate);
    const history = useHistory();

    async function login() {
          
         
        try {
              

            const result = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            ).then((res) => {
                console.log(res);
            }).catch((error) => {
                console.log(error);
                console.log(error.toString().replace('FirebaseError: Firebase: ',''))
                console.dir(error);
                alert(error.toString().replace('FirebaseError: Firebase: ',''));
            })

            auth.beforeAuthStateChanged((user) => {
                console.log(user)
            })

            auth.

            console.log(auth.currentUser)

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
            </Form>
        </div>
    );
}

export default Login;
