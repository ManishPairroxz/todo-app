import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import  {   useHistory  }   from    'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom';

function Header(props) {
    const history = useHistory();
    const user = (localStorage.getItem('userDetails'));
    let parsedData = JSON.parse(user);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePicture, setProfilePicture]   =   useState('');

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            setProfilePicture(parsedData['profile_picture']);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    function logout()   {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userDetails');

        history.push('/register');
    }

    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand>Welcome {parsedData ? parsedData['name'] : ''}</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>

                            {
                                isLoggedIn ?
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <div>
                                                <img alt='profile-picture' className='profile-picture' src={profilePicture ? profilePicture : ''} />
                                            </div>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item> <Link   to="/myProfile" className='my-profile-button'>My Profile</Link> </Dropdown.Item>
                                            <Dropdown.Item  onClick={logout}>Logout</Dropdown.Item>
                                            {/* <Dropdown.Item>Something else</Dropdown.Item> */}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                        
                            : ''
                            }

                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;