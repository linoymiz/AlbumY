import React, { useEffect, useState } from 'react'
import AlbumDtl from './albumDtl'
import AlbumPics from './albumPics'
import CreateImg from './createImg'

function Album(props){
    const url = props.url
    const [album, setAlbum] = useState({})
    console.log('in albumm');
    
    useEffect(() => {async function fetchItems(){
        const currentUrl = window.location.pathname
        const albumId = currentUrl.split('/')[2]
        const urlToFetch = 'http://localhost:4000/albums/' + albumId
        const data = await fetch(urlToFetch)
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