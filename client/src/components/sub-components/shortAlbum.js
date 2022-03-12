import React from 'react'
import AlbumPics from './albumPics'

export default function ShortAlbum(props){
    function handleClick(){
        const generatedPath = 'albums/' + props.albumId
        props.navToAlbum(generatedPath)
    }
    return <div className = 'container rounded border-2 album' onClick={handleClick}>
        <h3>{props.albumName}</h3>
        <div className= 'container'>
            <AlbumPics pics={props.albumPics} albumId={props.albumId} short={true} />
            <p>...</p>
        </div>
    </div>

}