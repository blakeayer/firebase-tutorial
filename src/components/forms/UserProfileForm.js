import React, { useState, useRef } from 'react';

import { useAuth } from '../../store/auth-context';
import { firestore } from '../../config/firebase';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';
import Alert from 'react-bootstrap/alert'

const UserProfileForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const { currentUser } = useAuth();
    const usersCollection = firestore.collection('users');

    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const submitFormHandler = async (event) => {
        event.preventDefault();

        try {
            setError("");
            setIsLoading(true);
            await usersCollection
                .doc(currentUser.uid)
                .set({
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                }, {merge: true});
            setSuccess("User info updated!");
            setIsLoading(false);
        } catch {
            setError("Unable to update user info.")
        }

    };

    return (
        <Card className='mb-3 mt-3' style={{ width: '20rem', margin: 'auto', }}>
            <Card.Body>
                <Card.Title style={{textAlign: 'center'}}>User Info</Card.Title>
                
                <Form className="mb-3">
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" ref={firstNameRef}/>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" ref={lastNameRef}/>
                    </Form.Group>

                    <Button 
                            className="w-100" 
                            variant="primary" 
                            type="submit" 
                            onClick={submitFormHandler}
                            disabled={isLoading}
                        >
                            Submit
                    </Button>
                    
                </Form>

                {error && <Alert variant="danger" style={{textAlign: 'center'}}>{error}</Alert>}
                {success && <Alert variant="success" style={{textAlign: 'center'}}>{success}</Alert>}

            </Card.Body>
        </Card>
    );
};

export default UserProfileForm;