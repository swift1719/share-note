import MainScreen from "../../components/MainLayout/MainLayout"
import {Form,Row,Col,Button} from 'react-bootstrap';
import {Link,useHistory} from 'react-router-dom';
import { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { register } from "../../actions/userActions";

const RegisterScreen = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
        "http://www.newdesignfile.com/postpic/2013/01/generic-user-icon-windows_321380.png"
    );
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [picMessage,setPicMessage] = useState(null);
    const [message,setMessage] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const { loading, error, userInfo} = userRegister;

    useEffect(()=>{
        if(userInfo){
            history.push("/mynotes");
        }
    },[history,userInfo]);

    const submitHandler = async (e)=>{
        e.preventDefault();
        
        if(password!==confirmPassword){
            setMessage("Password do not match");
        }else{
            dispatch(register(name,email,password,pic));
        }
    }

    return (
        <MainScreen title="REGISTER" >
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading/>}
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type="name"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={password}
                        placeholder="Password"
                        autoComplete="true"
                        onChange={(e)=>setPassword(e.target.value)}
                        />  
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={confirmPassword}
                        autoComplete="true"
                        placeholder="Confirm password"
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />  
                    </Form.Group>
                    {
                        picMessage && (
                            <ErrorMessage variant="danger">
                                {picMessage}
                            </ErrorMessage>
                        )
                    }
                    <Form.Group controlId="pic" >
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.File
                        id="custom-file"
                        type="image/png"
                        label="Upload Profile Picture"
                        custom
                        onChange={(e)=>postDetails(e.target.files[0])}
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
                        Already a Customer ? <Link to="/login">Login Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default RegisterScreen
