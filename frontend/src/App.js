import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import LandingPage from './screens/landingPage/landingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import {
  BrowserRouter,
  Switch,
  Route,  
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        <Route path="/mynotes" component={()=><MyNotes/>} />
        </Switch>
      <Footer/>
    </BrowserRouter>  
  );
}

export default App;
