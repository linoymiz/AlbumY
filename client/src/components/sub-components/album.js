import React, { useEffect, useState } from 'react'
import AlbumDtl from './albumDtl'
import AlbumPics from './albumPics'

function Album(props){
    const [data, setData] = useState({album:{albumId: '', albumRef: {}, pictures:[]}, isFetched: false})
    const currentUrl = window.location.pathname
    const urlParams = currentUrl.split('/')
    const userId = urlParams[2]
    const albumId = urlParams[3]

    useEffect(() => {async function fetchItems(){
        try{           
            const urlToFetch = `http://localhost:4000/AlbumY/${userId}/${albumId}`
            console.log(urlToFetch);
            // setData({album: data.album, isFetched: true})
            await fetch(urlToFetch)
            .then(response => {
                if(response.status !== 200)
                    throw new Error('something went wrong, didn\'t manage to get the album')
                else
                    return response.json()
            })
            .then(fetchedAlbum => {
                console.log('FETCHED ALBUM',fetchedAlbum)        
                setData({album: {albumId: fetchedAlbum._id, albumRef: fetchedAlbum, pictures: fetchedAlbum.pictures }, isFetched: true})
            })
            .catch(error => {
                console.log('Was not able to fetch the data.. ', error)
                setData({album:data.album, isFetched: false})
            })
        }
        catch(e){
            console.log(e)
            setData({album: data.album, isFetched: false})
        }
    } 
        fetchItems()
    }, [data.isFetched])
    
    return <div>
        {data.isFetched &&
            <article className='container'>
            <AlbumDtl album = {data.album}/>
            <AlbumPics pics= {data.album.pictures} albumId={data.album.albumId}
                        userId= {userId} short={false}/>   
            </article>
        }
    </div>
}

export default Album