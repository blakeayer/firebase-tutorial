import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../store/auth-context' 

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/button';
import Alert from 'react-bootstrap/alert'

const SignInForm = (props) => {
    const { login } = useAuth();
    const history = useHistory();

    const [error, setError] = useState("")
    
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const submitFormHandler = async (event) => {
        event.preventDefault();
        try {
            setError("");
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/")
        } catch (error) {
            if (error.message) {return setError(error.message);}
            setError("Unable to log in.")
        }
    };

    return (
            
            <Card className='mb-3 mt-3' style={{ width: '20rem', margin: 'auto', }}>  
                <Card.Body>
                    <Card.Title style={{textAlign: 'center'}}>Sign In</Card.Title>
                    <Form className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="example@email.com" ref={emailRef}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
                        </Form.Group>
        
                        <Button 
                            className="w-100" 
                            variant="primary" 
                            type="submit" 
                            onClick={submitFormHandler}
                        >
                            Submit
                        </Button>
                    </Form>
                    
                    {error && <Alert variant="danger" style={{textAlign: 'center'}}>{error}</Alert>}

                    <Card.Text 
                        className='mb-1 mt-3' 
                        style={{textAlign: 'center'}}
                    >
                        Don't have an account?
                        <Nav.Link 
                            href='#signin' 
                            className='pt-0' 
                            onClick={props.notRegistered}
                        >
                            Register
                        </Nav.Link>
                    </Card.Text>

                </Card.Body>

            </Card>
                    
    );
};

export default SignInForm;