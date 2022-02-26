import React from 'react'
import {getCurrentYear as currYear} from '../utilities/date'


function Footer(){
    return <footer id='footer' class="text-center text-lg-start bg-light text-muted">
          <div class="text-center p-4" style={{backgroundColor:'rgba(216, 191, 216, 0.5)'}}>
    © {currYear()} Copyright Linoy Rotenberg
  </div>
    </footer>
}

export default Footer