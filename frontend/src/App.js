import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import LandingPage from './screens/landingPage/landingPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <LandingPage/>
      <Footer/>
    </div>
  );
}

export default App;
