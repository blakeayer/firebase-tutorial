import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/navbar';
import Nav from 'react-bootstrap/nav';
import Container from 'react-bootstrap/container';

const Header = () => {
    
    return (

        <Navbar expand='md' bg="dark" variant="dark">
            <Container>

                <Navbar.Brand as={NavLink} to='/'>Firebase Tutorial</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="ms-auto" as={NavLink} to='/auth'>&#123; auth &#125;</Nav.Link>
                        <Nav.Link className="ms-auto" as={NavLink} to='/database'>&#123; database &#125;</Nav.Link>
                        <Nav.Link className="ms-auto" as={NavLink} to='/firestore'>&#123; firestore &#125;</Nav.Link>
                        <Nav.Link className="ms-auto" as={NavLink} to='/storage'>&#123; storage &#125;</Nav.Link>
                        <Nav.Link className="ms-auto" as={NavLink} to='/messaging'>&#123; messaging &#125;</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    );

};

export default Header;
