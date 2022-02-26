import React from 'react'
import Album from '../album'
import Footer from '../partials/footer'
import Header from '../partials/header'

function AlbumPage(){    
    return (<div className="page-container">
    <div className='page-content'>
    <Header />
    {/* <div className="container"> */}
    <Album key={1} url='http://localhost:4000/albums'/>     
    {/* </div> */}
    </div>   
     <Footer />

    </div>)
}
export default AlbumPage