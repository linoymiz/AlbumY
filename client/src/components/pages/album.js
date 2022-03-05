import React from 'react'
import Album from '../sub-components/album'
import Footer from '../partials/footer'
import Header from '../partials/header'

function AlbumPage(props){    
    return (<div className="page-container">
    <div className='page-content'>
    <Header />
    <Album url='http://localhost:4000/albums/61e2b36f329a87660cb46b79' />     
    </div>   
     <Footer />
    </div>)
}
export default AlbumPage