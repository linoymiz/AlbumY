import React from 'react'

function AlbumDtl(props){
    return <div className='container album-dtl padding'>
        <h2>{props.album.albumRef.name}</h2>
    <p>{props.album.albumRef.numOfPics} <span>Pictures</span></p>
    <p>&emsp;|&emsp;</p>
    <p>Created: <span>{props.album.albumRef.creationDate}</span></p>
    </div>
}

export default AlbumDtl