import React, { useEffect, useState } from 'react'
import AlbumDtl from './albumDtl'
import AlbumPics from './albumPics'

function Album(props){
    const url = props.url
    const [data, setData] = useState({album:{albumId: '', albumRef: {}, pictures:[]}, isFetched: false})
    // const [isFetched, setIsFetched] = useState(false)
    
    useEffect(() => {async function fetchItems(){
        try{
            const currentUrl = window.location.pathname
        const albumId = currentUrl.split('/')[2]
        console.log('in fetch react:', albumId);
        const urlToFetch = 'http://localhost:4000/albums/' + albumId
        await fetch(urlToFetch)
        .then(response => {
            if(!response.ok)
                throw new Error('something went wrong, didn\'t manage to get the album')
            return response.json()
        })
        .then(fetchedAlbum => {
            console.log('FETCHED ALBUM',fetchedAlbum)        
            setData({album: {albumId: fetchedAlbum._id, albumRef: fetchedAlbum, pictures: fetchedAlbum.pictures }, isFetched: false})
        })
        .catch(error => console.log('Could not able to fetch the data ', error))
        }
        catch(e){
            console.log(e)
            setData({album: data.album, isFetched: false})
        }
    } 
        fetchItems()
    }, [url])
    
    return <article className='container album'>
    <AlbumDtl album = {data.album}/>
    <AlbumPics pics= {data.album.pictures} albumId={data.album.albumId} short={false} url={url}/>   
    </article>
}

export default Album