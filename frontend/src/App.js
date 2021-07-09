import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import LandingPage from './screens/LandingScreen/landingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import {
  BrowserRouter,
  Switch,
  Route,  
} from 'react-router-dom';
import CreateNote from './screens/SingleNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';

function App() {
  return (
    <BrowserRouter>
      <Header/>

      {/* switch looks for only first matching router */}
      {/* once it finds it then doesn't look anymore */}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/createNote" component={CreateNote} />
          <Route path="/note/:id" component={SingleNote} />
          <Route path="/mynotes" component={()=><MyNotes/>} />
        </Switch>
      <Footer/>
    </BrowserRouter>  
  );
}

export default App;
