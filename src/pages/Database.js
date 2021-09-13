import React from 'react';
import { useAuth } from '../store/auth-context'; 

import UserProfileForm from '../components/forms/UserProfileForm';
import Container from 'react-bootstrap/container';



const Database = () => {

    const { currentUser } = useAuth();

    return (
        <Container>
        {currentUser && 
            <UserProfileForm />
        }
        {!currentUser && 
            <p>Please sign in.</p>
        }
        </Container>
    );
};

export default Database;