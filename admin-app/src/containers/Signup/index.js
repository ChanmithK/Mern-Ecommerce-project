import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Row, Col,Button } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { Navigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { signup } from '../../actions';

const Signup = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    if(auth.authenticate){
        return <Navigate to = {'/'} />
    }

    if(user.loading){
        return <p>Loading...!</p>
    }

    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstName,lastName,email, password
        } 
        dispatch(signup(user));
    }


    return (
           <Layout>
            <Container>
                <Row style={{marginTop: "50px"}}>
                    <Col md={{span: 6, offset:3}}>
                    <Form onSubmit={userSignup}>
                        <Row>
                            <Col md={6}>
                              <Input
                                label="First Name"
                                placeholder="Enter First Name..."
                                value = {firstName}
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </Col>
                            <Col md={6}>
                            <Input
                                label="Last Name"
                                placeholder="Enter Last Name..."
                                value ={lastName}
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </Col> 
                        </Row>
                        
                        <Input
                            label="Email"
                            placeholder="Enter Email..."
                            value ={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter Password..."
                            type="password"
                            value ={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                       <br></br>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    </Col>
                </Row>
                
             </Container>
           </Layout>
    )
}

export default Signup