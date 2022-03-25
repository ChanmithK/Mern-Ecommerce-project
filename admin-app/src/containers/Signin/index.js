import React, { useEffect, useState } from "react";
import Layout from '../../components/Layout'
import { Container, Form, Row, Col,Button } from 'react-bootstrap'
import {login} from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { Navigate } from "react-router";


const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {
       e.preventDefault();
       const user = {
           email, password
       } 
       dispatch(login(user));
    }

    if(auth.authenticate){
        return <Navigate to = {'/'} />
    }

    return(
        <Layout>
            <Container>
                <Row style={{marginTop: "50px"}}>
                    <Col md={{span: 6, offset:3}}>
                    <Form onSubmit={userLogin}>
                        <Input
                            label = "Email"
                            placeholder = "Enter a email..."
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label = "Password"
                            placeholder = "Enter a password..."
                            value={password}
                            type="password"
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

export default Signin
