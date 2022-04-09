import React from 'react'
import AlbumPics from './albumPics'
import { Button } from '@mui/material';

export default function ShortAlbum(props){
    function handleClick(){
        const generatedPath = `/AlbumY/${props.userId}/${props.albumId}`
        props.navToAlbum(generatedPath)
    }
    return <div className = "container rounded border-2 album" style={{backgroundColor: 'white'}}>
        <h3>{props.albumName}</h3>
        <div className= "container">
            <div className="container inline-b" style={{width:'85%'}}>
            {console.log('shortAlbum pics: ', props.albumPics)}
                <AlbumPics picsIds={props.albumPicsIds} albumId={props.albumId} short={true} />
            </div>
            <div className="container inline-b continue-box" style={{width: '15%'}}>
                <Button size="small" onClick={handleClick}>
                <p id='continue' className="inline-b">Show More</p>
                </Button>
            </div>
        </div>
    </div>

}