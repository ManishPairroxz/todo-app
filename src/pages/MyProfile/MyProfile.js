import Header from '../../Components/header/Header';
import './MyProfile.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useForm from "../../Hooks/useForm";
import validate from '../../Others/ProfileFormValidation';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';


function MyProfile() {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(profileSubmit, validate);

    const history = useHistory();
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log(userDetails);
    console.log(userDetails.email);

    const email = `${'"' + userDetails.email + '"'}`;

    function profileSubmit() {
        console.log('profileSUbmitted');


        console.log(email);

        axios.get('https://todo-react-91a88-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo=' + email).then((res) => {
            let data = Object.entries(res.data);

            console.log(data);

            // User Id
            console.log(data[0]);

            let userId = data[0][0];
            console.log(userId);

            // Update based on the ID
            axios.put('https://todo-react-91a88-default-rtdb.firebaseio.com/users/' + userId + '.json', {
                name: values.name,
                profile_picture: values.image,
                email: userDetails.email
            }).then((res) => {
                console.log(res);

                alert('Data is updated successfully.');
                
                let updatedUserDetails = {
                    name: values.name,
                    profile_picture: values.image,
                    email: userDetails.email
                };

                console.log(updatedUserDetails);

                localStorage.setItem('userDetails',JSON.stringify(updatedUserDetails));
                // getData();
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        })



        // axios.put('https://todo-react-91a88-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo=' + email, {
        //     name : values.name,
        //     profile_picture : values.profile_picture
        // }).then((res) => {
        //     console.log(res);
        // }).catch((error)    =>  {
        //     console.log(error);
        // })


    }
    return (
        <div>
            <Header />
            <Form className="profile-form">
                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter name" onChange={handleChange} value={values.name} required />
                </Form.Group>

                {
                    errors.name && <h3>{errors.name}</h3>
                }

                <Form.Group className="mb-3" controlId="formGroupImage" >
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" type="text" placeholder="Image URL" onChange={handleChange} value={values.image} required />
                </Form.Group>

                {
                    errors.image && <h3>{errors.image}</h3>
                }

                <Button onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default MyProfile;