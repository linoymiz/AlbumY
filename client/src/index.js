import React from 'react';
import ReactDOM from 'react-dom';
import Albums from './components/pages/album'
import Album from './components/albumTest'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      {/* <Route path='/home' element={<Home />} /> */}
      <Route path='/albums' element={<Albums />} />
      <Route path='/album' element={<Album />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
