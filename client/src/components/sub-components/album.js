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
        setData({album: data.album, isFetched: true})
        const dataFetched = await fetch(urlToFetch)
        const fetchedAlbum = await dataFetched.json()
        console.log('FETCHED ALBUM',fetchedAlbum)

        setData({album: {albumId: fetchedAlbum._id, albumRef: fetchedAlbum, pictures: fetchedAlbum.pictures }, isFetched: false})
        // setData(fetchedAlbum)
        // setIsFetched(true)
        }
        catch(e){
            console.log(e)
            setData({album: data.album, isFetched: false})
        }
    } 
        fetchItems()
    }, [url])
    
    return <article>
    <AlbumDtl album = {data.album}/>
    <AlbumPics pics= {data.album.pictures} albumId={data.album.albumId} short={false} url={url}/>   
    </article>
}

export default Album