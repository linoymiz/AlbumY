import React from 'react'
import AlbumPics from './albumPics'
import IconButton from '@mui/material/IconButton';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export default function ShortAlbum(props){
    function handleClick(){
        const generatedPath = 'albums/' + props.albumId
        props.navToAlbum(generatedPath)
    }
    return <div className = "container rounded border-2 album">
        <h3>{props.albumName}</h3>
        <div className= "container">
            <div className="container inline-b" style={{width:'85%'}}>
                <AlbumPics pics={props.albumPics} albumId={props.albumId} short={true} />
            </div>
            <div className="container inline-b continue-box" style={{width: '15%'}}>
                <p id='continue' className="inline-b">...</p>
                <IconButton onClick={handleClick} className="inline-b" sx={{size: "large", color: "#bc8f8f"}}>
                    <DoubleArrowIcon />
                </IconButton>
            </div>
        </div>
    </div>

}