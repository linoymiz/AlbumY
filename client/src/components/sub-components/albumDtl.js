import React from 'react'

function AlbumDtl(props){
    return <div>
        <h2>{props.album.name}</h2>
    <ul>
        <li><span>{props.album.numOfPics} <span>Pictures</span></span></li>
        <li><span>Created: <span>{props.album.creationDate}</span></span></li>
    </ul>
    </div>
}

export default AlbumDtl