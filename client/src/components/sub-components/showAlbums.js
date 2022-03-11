import React from 'react'
import { useNavigate } from 'react-router-dom'
import ShortAlbum from './shortAlbum'

export default function ShowAlbums(props){
    const navigate = useNavigate()
    const handlClick = (path) => {navigate(path);}

    return <div className='container'>
        {props.albums?.map(album =>
            <div>
                <ShortAlbum 
                    key={album._id} albumId={album._id} 
                    navToAlbum={handlClick} 
                    albumName={album.name} albumPics={album.pictures} />            
            </div>
        )}
    </div>
}