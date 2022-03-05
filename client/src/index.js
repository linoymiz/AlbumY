import React from 'react';
import ReactDOM from 'react-dom';
import Album from './components/sub-components/album'
import AlbumTest from './components/albumTest'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      {/* <Route path='/home' element={<Home />} /> */}
      <Route path='/albums/:albumId' element={<Album url='' />} />
      <Route path='/album' element={<AlbumTest />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
