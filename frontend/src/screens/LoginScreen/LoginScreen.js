import MainScreen from "../../components/MainScreen/MainScreen"
import {Form,
    Button,
    Row,
    Col,
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './LoginScreen.css';
import { useState } from "react";
import axios from "axios";

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);

    const submitHandler =  async (e) =>{
        e.preventDefault();
        // console.log(email, password);
        try {
            // To make api request that takes json data
            // we need to provide some header 
            const config = {
                headers:{
                    "Content-type":"application/json"
                }
            }
            setLoading(true);

            const {data} = await axios.post(
                '/api/users/login',
                {
                    email,
                    password,
                },
                config
            );
            console.log(data);
            // localstorage can't store the object data
            // so we need to convert it into string data
            localStorage.setItem('userInfo',JSON.stringify(data))
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <MainScreen title="LOGIN" >
            <div className="loginContainer">
            <Form onSubmit={submitHandler} >
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete="true"
                />
            </Form.Group>

            <Form.Group   controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete="true"
                />
            </Form.Group>
            <div className="loginButton">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
            
        </Form>
        <Row className="py-3 mx-auto" >
            <Col>
                New Customer ? <Link to="/register">Register Here</Link>
            </Col>
        </Row>    
                
        </div>        
    </MainScreen>
        
    )
}

export default LoginScreen
