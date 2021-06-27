import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Badge,
    Accordion
} from 'react-bootstrap';
import {
    Link
} from 'react-router-dom';
import MainScreen from "../../components/MainLayout/MainLayout"
import axios from 'axios';

const MyNotes = () => {

    const [notes, setNotes] = useState([])

    const deleteHandler=(id)=>{
        if(window.confirm("Are you sure?")){

        }
    }

    const fetchNotes=async ()=>{
        const {data}=await axios.get(`/api/notes`);
        setNotes(data);
    }

    useEffect(()=>{
        fetchNotes();
    },[])

    return <MainScreen title="Welcome Back User...">
        <Link to="/createnote" >
            <Button style={{marginLeft:10,marginBottom:6}} size="lg" color="primary" >
                Create Note
            </Button>
        </Link>
        {   notes.length>0 &&
            notes.map((note)=>(
                <Accordion key={note._id}>
                    <Card style={{margin:10}} >
                        <Card.Header style={{display:"flex"}} >
                            <span 
                            style={{
                                color:"black",
                                textDecoration:"none",
                                flex:1,
                                cursor:"pointer",
                                alignSelf:"center",
                                fontSize:22,
                            }}
                            >
                                {/* event key is an identifier to denote what we want to trigger with this accordian.toggle */}
                                <Accordion.Toggle as={Card.Text} variant='link' eventKey="0" >
                                    {note.title}
                                </Accordion.Toggle>
                            </span>
                            <div>
                            <Link to={`/note/${note._id}`} >
                            <Button>
                                Edit
                            </Button>
                            </Link>
                            <Button 
                            variant="danger" 
                            className="mx-2" 
                            onClick={()=>deleteHandler(note._id)}
                            >
                                Delete
                            </Button>
                            </div>
                        </Card.Header>

                        <Accordion.Collapse eventKey="0" >
                            <Card.Body>
                                <h4>
                                    <Badge variant="success" >
                                        Category - {note.category}
                                    </Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {note.content}
                                    </p>
                                    <footer className="blockquote-footer">
                                        Create On : Date
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Accordion.Collapse>
                    
                    </Card>
                </Accordion>
            ))
        }
        
    </MainScreen>
}

export default MyNotes
