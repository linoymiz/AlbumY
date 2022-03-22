import React from 'react';
import ReactDOM from 'react-dom';
import Album from './components/sub-components/album'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Register from './components/pages/register';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './components/pages/signIn';
import Home from './components/pages/home';

const theme = createTheme({
  palette: {
    primary:{
      main: "#c97b63"
    },
    secondary:{
      main: "#ffab91",
    },
  }
})

ReactDOM.render(
      <ThemeProvider theme={theme}>
  <Router>
    <Routes>
      {/* <Route path='/' element={<App />} /> */}
      <Route path='/AlbumY/register' element={<Register />} />
      <Route path='/AlbumY/sign-in' element={<SignIn />} />
      <Route path='/AlbumY/:userId' element={<Home />} />
      <Route path='/AlbumY/:userId/:albumId' element={<Album url='' />} />
    </Routes>
  </Router>
      </ThemeProvider>
  ,
  document.getElementById('root')
);

reportWebVitals();
