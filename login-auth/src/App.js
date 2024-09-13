import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Error from './components/Error';
import Headers from './components/Headers';

function App() {
  return (
    <>
    <Headers />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='*' element={<Error/>} />
    </Routes>
    </>
  );
}

export default App;
