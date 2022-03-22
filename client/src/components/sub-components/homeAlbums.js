import React, { useState, useEffect } from 'react'
import CreateAlbum from './createAlbum';
import ShowAlbums from './showAlbums';

export default function HomeAlbums(){
    const userId = window.location.pathname.split('/')[2]
    const url = `http://localhost:4000/AlbumY/${userId}`
    const [albums, setAlbums] = useState([])   
    
    useEffect(() => {async function fetchItems(){
        const data = await fetch(url)
        const fetchedAlbums = await data.json()
        setAlbums(fetchedAlbums)
        console.log(fetchedAlbums);
    } 
        fetchItems()
    }, [url])

    return <div className='container'>
      <ShowAlbums albums={albums} userId={userId} />
      <CreateAlbum />
    </div>
}