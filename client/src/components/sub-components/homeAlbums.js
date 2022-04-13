import React, { useState, useEffect } from 'react'
import CreateAlbum from './createAlbum';
import ShowAlbums from './showAlbums';

export default function HomeAlbums(){
    const userId = window.location.pathname.split('/')[2]
    const url = `https://album-my.herokuapp.com/${userId}`
    const [albums, setAlbums] = useState([])   
    
    useEffect(() => {async function fetchItems(){
        const data = await fetch(url)
        await data.json()
        .then(fetchedAlbums => {
            setAlbums(fetchedAlbums)
            console.log('albums to show ', fetchedAlbums)
        })
        .catch(err => console.log('was not able to fetch user albums', err))
    } 
        fetchItems()
    }, [url])

    return <div className='container'>
      <ShowAlbums albums={albums} userId={userId} />
      <CreateAlbum />
    </div>
}