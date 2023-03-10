import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './Components/Home/Home';
import Navbars from './Components/Navbar/Navbars';
import Auth from './Components/Auth/Auth';
import PostDetails from './Components/Posts/PostDetails/PostDetails';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbars />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Home />} />
          <Route path='/posts/search' element={<Home />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route
            path='/auth'
            element={!user ? <Auth /> : <Navigate to='/posts' />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
