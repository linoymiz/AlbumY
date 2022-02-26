import React from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

function Nav(){
    return (<nav className="page-content navbar navbar-expand-lg navbar-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
            <Link to='/home' className='nav-link'><HomeIcon /> <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
          <Link to='/albums' className="nav-link">Albums</Link>
        </li>
        <li className="nav-item">
          <Link to='/album' className="nav-link">Album</Link>
        </li>
      </ul>
    </div>
  </nav>)
}

export default Nav