import Header from '../../Components/header/Header';
import './MyProfile.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useForm from "../../Hooks/useForm";
import validate from '../../Others/ProfileFormValidation';
import axios from 'axios';


function MyProfile() {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(profileSubmit, validate);

    let userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const email = `${'"' + userDetails.email + '"'}`;

    function profileSubmit() {

        axios.get('https://todo-react-91a88-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo=' + email).then((res) => {
            let data = Object.entries(res.data);
            let userData = localStorage.getItem('userDetails');
            let parsedData = JSON.parse(userData);
            // User Id
            console.log(parsedData['_id']);
            console.log(userData[0][1]);


            // Update based on the ID
            axios.put('https://todo-react-91a88-default-rtdb.firebaseio.com/users/' + parsedData['_id'] + '.json', {
                name: values.name,
                profile_picture: values.image,
                email: userDetails.email,
                _id : parsedData['_id']
            }).then((res) => {
                alert('Data is updated successfully.');
                
                let updatedUserDetails = {
                    name: values.name,
                    profile_picture: values.image,
                    email: userDetails.email,
                    _id : parsedData['_id']
                };
                localStorage.setItem('userDetails',JSON.stringify(updatedUserDetails));
                // getData();
                window.location.reload();
            }).catch((error) => {
                  
            });
        }).catch((error) => {
              
        })


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
                    errors.name && <h3 className='error'>{errors.name}</h3>
                }

                <Form.Group className="mb-3" controlId="formGroupImage" >
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" type="text" placeholder="Image URL" onChange={handleChange} value={values.image} required />
                </Form.Group>

                {
                    errors.image && <h3 className='error'>{errors.image}</h3>
                }

                <Button onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default MyProfile;