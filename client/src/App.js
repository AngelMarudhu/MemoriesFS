import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './Components/Home/Home';
import Navbars from './Components/Navbar/Navbars';
import Auth from './Components/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbars />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
