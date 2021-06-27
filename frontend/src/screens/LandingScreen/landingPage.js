import { 
    Container,
    Row,
    Button
} from 'react-bootstrap';
import './landingPage.css'

const LandingPage = () => {

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");
    //     if(userInfo){
    //         history.pushState("/mynotes");
    //     }
    // }, [history])

    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className="title" >
                                Welcome to Share Note!!!
                            </h1>
                            <p className="subtitle" >
                                Get and share notes
                            </p>
                        </div>
                        <div className="buttonContainer" >
                            <a href="/login" >
                                <Button size="lg" className="landingButton" >
                                    Login
                                </Button>
                            </a>
                            <a href="/register">
                                <Button size="lg" className="landingButton" variant="outline-primary" >
                                    Signup
                                </Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage
