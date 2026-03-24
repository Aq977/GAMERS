
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import{BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Getproduct from './components/Getproduct';
import Addproduct from './components/Addproduct';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
    <div className="App">
     <div className='App-header'>
      <h1 className='text-info'>WELCOME TO GAMERS SITE</h1>
     </div>
     {/* linking routes */}
     <nav>
    <Link to="/signin" className='btn btn-outline-danger ms-2'>Sigin</Link>
    <Link to="/signup" className='btn btn-outline-danger ms-2'>Signup</Link>
    <Link to="/addproduct" className='btn btn-outline-danger ms-2'>Addproduct</Link>
    <Link to="/" className='btn btn-outline-danger ms-2'>Getproduct</Link>

     </nav>
     <Routes>
      <Route path='/signin'element={<Signin/>}/>
      <Route path='/signup'element={<Signup/>}/>
      <Route path='/addproduct'element={<Addproduct/>}/>
      <Route path='/'element={<Getproduct/>}/>
     </Routes>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
