import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../store/auth-context'; 

import Container from 'react-bootstrap/container';
import Button from 'react-bootstrap/button';
import Alert from 'react-bootstrap/alert';

import SignInForm from '../components/forms/SignInForm';
import RegistrationForm from '../components/forms/RegistrationForm';


const AuthPage = () => {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const [hasAccount, setHasAccount] = useState(true);
    const [error, setError] = useState("");

    const notRegisteredHandler = (event) => {
        event.preventDefault();
        setHasAccount(false);
    };

    const alreadyRegisteredHandler = (event) => {
        event.preventDefault();
        setHasAccount(true);
    };

    const logoutHandler = async (event) => {
        event.preventDefault();
        setError("");
        
        try {
            await logout();
            history.push("/");
        } catch {
            setError("Failed to log out.")
        }

    };

    return (
        <Container 
            className="d-flex align-items-center justify-content-center"
            style={{minHeight: "50vh"}}
        >
            {currentUser && (
                <Button variant="primary" type="submit" onClick={logoutHandler}>Log Out</Button>
            )}

            {error && <Alert variant="danger" style={{textAlign: 'center'}}>{error}</Alert>}

            {!currentUser && hasAccount && (
                <SignInForm notRegistered={notRegisteredHandler}/>
            )}

            {!currentUser && !hasAccount && (
                <RegistrationForm alreadyRegistered={alreadyRegisteredHandler}/>
            )}

        </Container>
    );
};

export default AuthPage;