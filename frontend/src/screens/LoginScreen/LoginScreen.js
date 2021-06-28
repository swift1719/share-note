import MainScreen from "../../components/MainLayout/MainLayout"
import {Form,
    Button,
    Row,
    Col,
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './LoginScreen.css';
import { useEffect, useState } from "react";
import {useDispatch,useSelector} from 'react-redux';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { login } from "../../actions/userActions";

const LoginScreen = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const dispatch = useDispatch(); 

    // to access redux app state
    const userLogin = useSelector(state => state.userLogin)

    const {loading, error, userInfo} = userLogin;

    // if user already logged in then direct him to landing page
    useEffect(()=>{
        if(userInfo){
            history.push('/mynotes')
        }
    },[history,userInfo])

    const submitHandler =  async (e) =>{
        e.preventDefault();
        dispatch(login(email,password));
    }

    return (
        <MainScreen title="LOGIN" >
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading/>}
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
