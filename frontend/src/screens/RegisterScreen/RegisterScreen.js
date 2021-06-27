import MainScreen from "../../components/MainLayout/MainLayout"
import {Form,Row,Col,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

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
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);


    const submitHandler = async (e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            setMessage("Passwords don't match!");
        }else{
            setMessage(null);
            try {
                const config ={
                    headers:{
                        "Content-type":"application/json",
                    }
                };
                setLoading(true);
                
                const {data} = await axios.post(
                    "/api/users",
                    {name,email,password,pic},
                    config
                );
                console.log(data);
                setLoading(false);
                localStorage.setItem("userInfo",JSON.stringify(data));

            } catch (error) {
                setError(error.response.data.message);
            }
        }
    };

    const postDetails = (picture) =>{
        
        if(!picture){
            return setPicMessage("Please Select a profile picture!");
        }

        setPicMessage(null);

        if(picture.type==='image/jpeg' || picture.type==='image/jpg' || picture.type==='image/png'){
            const data = new FormData();
            data.append('file',picture);
            data.append('upload_preset','shareNote');
            data.append('cloud_name','imgstoreap');
            fetch('https://api.cloudinary.com/v1_1/imgstoreap/image/upload',{
                method:'post',
                body:data,
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                setPic(res.url.toString());
            }).catch((err)=>{
                console.log(err);
            });
        }else{
            return setPicMessage("Please select an image file");
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
