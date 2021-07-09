import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainLayout/MainLayout";
import {Card,Button,Form} from 'react-bootstrap';
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading";
import axios from "axios";
import { updateNoteAction } from "../../actions/noteActions";

const SingleNote = ({match,history}) => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    
    const noteUpdate = useSelector((state)=>state.noteUpdate);

    const {loading,error} = noteUpdate;

    useEffect(() => {
        
        const fetching = async ()=>{
            const {data}=await axios.get(`/api/notes/${match.params.id}`);
            setTitle(data.title);
            setCategory(data.category);
            setContent(data.content);
            setDate(data.updatedAt);
        };

        fetching();
    }, [match.params.id,date]);

    const resetHandler = ()=>{
        setTitle("");
        setCategory("");
        setContent("");
    }
    
    const updateHandler = e=>{
        e.preventDefault();
        dispatch(updateNoteAction(match.params.id,title,content,category));

        if(!title || !content || !category) return;

        resetHandler();
        history.push("/mynotes");
    }

    return (
        <MainScreen title="Edit Note" >
            <Card>
                <Card.Header>Edit your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler} >
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="title" >
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control
                            type="title"
                            placeholder="Enter the title"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>
                                Content
                            </Form.Label>
                            <Form.Control
                            as="textarea"
                            placeholder="Enter the content"
                            value={content}
                            onChange={(e)=>setContent(e.target.value)}
                            />
                        </Form.Group>
                        {
                            content && (
                                <Card>
                                    <Card.Header>Note Preview</Card.Header>
                                    <Card.Body>
                                        <ReactMarkdown>{content}</ReactMarkdown>
                                    </Card.Body>
                                </Card>
                            )
                        }
                         <Form.Group controlId="content">
                            <Form.Label>
                                Category
                            </Form.Label>
                            <Form.Control
                            type="content"
                            placeholder="Enter the category"
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={40} /> }
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        <Button className="mx-2" variant="danger">
                            Delete
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Updated On - {date.substring(0,10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default SingleNote;