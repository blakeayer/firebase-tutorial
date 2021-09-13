import React, { useState } from 'react';
import { useAuth } from '../store/auth-context';
import { storage, firestore } from '../config/firebase'

import ProgressBar from '../components/ui/ProgressBar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';
import Alert from 'react-bootstrap/alert'

const Storage = () => {
    const { currentUser } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const usersCollection = firestore.collection('users');

    const imgChangeHandler = (event) => {
        let selected = event.target.files[0];
        const types = ['image/png', 'image/jpeg'];

        if (selected && types.includes(selected.type)) {
            setImage(selected);
            setError('');
        } else {
            setImage(null);
            setError('Please select an image file (png or jpeg).');
        }
    };

    const passUrl = (url) => {
        setImageURL(url)
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        try {
            setError("");
            setIsLoading(true);
            await usersCollection
                .doc(currentUser.uid)
                .set({
                    url: imageURL,
                }, {merge: true}
                );
            setSuccess("Profile photo uploaded!");
            setIsLoading(false);
        } catch {
            setError("Unable to upload profile photo.")
        }

    };

    return (

        <Card className='mb-3 mt-3' style={{ width: '20rem', margin: 'auto', }}>
            <Card.Body>
                <Card.Title style={{textAlign: 'center'}}>Profile Photo</Card.Title>

                {currentUser && 
                    <Form className="mb-3">

                        <Form.Group className="mb-3" controlId="formStorage">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control type="file" onChange={imgChangeHandler} />
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
                        { image && <div>{image.name}</div>}
                        { image && <ProgressBar image={image} setImage={setImage} passUrl={passUrl} />}
                    </Form>
                }
                
                {error && <Alert variant="danger" style={{textAlign: 'center'}}>{error}</Alert>}
                {success && <Alert variant="success" style={{textAlign: 'center'}}>{success}</Alert>}

            </Card.Body>
        </Card>
    );
};

export default Storage;