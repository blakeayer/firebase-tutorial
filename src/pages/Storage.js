import React from 'react';
import { useAuth } from '../store/auth-context';

import StorageForm from '../components/forms/StorageForm';
import Container from 'react-bootstrap/Container'

const Storage = () => {
    const { currentUser } = useAuth();

    return (
        <Container>
            {currentUser && 
                <StorageForm />
            }
            {!currentUser && 
                <p>Please sign in.</p>
            }
        </Container>
    );
};

export default Storage;