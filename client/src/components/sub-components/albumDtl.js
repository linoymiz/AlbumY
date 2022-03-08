import React from 'react'

function AlbumDtl(props){
    return <div className='album-dtl'>
        <h2>{props.album.albumRef.name}</h2>
    <ul>
        <li><span>{props.album.albumRef.numOfPics} <span>Pictures</span></span></li>
        <li><span>Created: <span>{props.album.albumRef.creationDate}</span></span></li>
    </ul>
    </div>
}

export default AlbumDtl