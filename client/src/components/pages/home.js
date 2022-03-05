import React, { useState, useEffect } from 'react'
import CreateAlbum from '../sub-components/createAlbum';
import ShowAlbums from '../sub-components/showAlbums';

function Home(){
    const url = 'http://localhost:4000/albums'
    const [albums, setAlbum] = useState([])   
    
    useEffect(() => {async function fetchItems(){
        const data = await fetch(url)
        const fetchedAlbum = await data.json()
        setAlbum(fetchedAlbum)
        console.log(fetchedAlbum);
    } 
        fetchItems()
    }, [url])

    return <div>
      <ShowAlbums albums={albums} />
      <CreateAlbum />
    </div>
}

export default Home