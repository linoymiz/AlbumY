import React from 'react'
import { useNavigate } from 'react-router-dom'
import ShortAlbum from './shortAlbum'

export default function ShowAlbums(props){
    const navigate = useNavigate()
    const handlClick = (path) => {navigate(path);}

    return <div className='container'>
        {props.albums?.map(album =>
                <ShortAlbum 
                    key={album._id} albumId={album._id} userId={props.userId}
                    navToAlbum={handlClick} 
                    albumName={album.name} albumPics={album.pictures} />            
        )}
    </div>
}