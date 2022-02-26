import React, { useEffect, useState } from 'react'
import AlbumDtl from './sub-components/albumDtl'
import AlbumPics from './sub-components/albumPics'
import CreateImg from './sub-components/createImg'

function Album(props){
    const url = props.url
    const [album, setAlbum] = useState({})
    
    
    useEffect(() => {async function fetchItems(){
        const data = await fetch(url)
        const fetchedAlbum = await data.json()
        setAlbum(fetchedAlbum)
        console.log(fetchedAlbum);
    } 
        fetchItems()
    }, [url])
    
    return <article>
    <AlbumDtl album = {album}/>
    <AlbumPics pics= {album.pictures}/>   
    <CreateImg albumId = {album._id} url= {url}/>
    </article>
}

export default Album