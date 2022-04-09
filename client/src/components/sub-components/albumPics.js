import React, { useState, useEffect } from 'react'
import Img from './img'
import axios from 'axios'
import CreateImg from './createImg'
import Grid from '@mui/material/Grid';

function AlbumPics(props){
  const [pictures, setPics] = useState([])
  const LIMIT_PICS = 3
  const isShortAlbum = props.short
  const {userId, albumId} = props
  const url = `/AlbumY/${userId}/${albumId}/`

  useEffect(() => {async function fetchPictures(){
    const urlPics = url + 'pictures'
    await fetch(urlPics)
    .then(data => {
      data.json()
      .then(fetchedPics => {
        setPics(fetchedPics)
        console.log(fetchedPics)
      })
      .catch(err => console.log("Was not ablt to parse the album pictures data into JSON", err))
    })
    .catch(err => console.log('Was not able to make a fetch for the album\'s pictures',err))
    } 
    fetchPictures()
  }, [url])

  function handleDeleteImg(reqImg){
    const deleteUrl = url + 'delete'
    axios.delete(deleteUrl, {data: {img: reqImg}})
        .then(() => {
          console.log('deleted image!')
          window.location.reload(false)
        })
        .catch(e => console.log('something went wrong, delete was not complete well.'))
  }
  function handleEditImgInfo(reqImg){
    const patchUrl = url + 'edit'
    axios.patch(patchUrl, {img: reqImg})
    .then(() => {
      console.log('edited image!')
          window.location.reload(false)
        })
    .catch(e => console.log('something went wrong, edit was not complete well.'))
  }
  // setImgSize() // change the img dimensions conditionally
  
  return <div className="container">
  {console.log('inside albumPics', pictures)}
      {!props.short && <CreateImg albumId={albumId} userId={userId} url={props.url}/>}
      <div style={{padding: '20px 0px'}}>
      <Grid container sx={{ width: "auto", height: "auto" }} cols={LIMIT_PICS} gap={8}>
      {pictures?.map((pic, index) => {
        if(!props.short || (props.short && index < LIMIT_PICS)){
        return (
            <Img key={pic.alt} img={pic} hide={isShortAlbum} deleteImg={handleDeleteImg} editImg={handleEditImgInfo}/>)
        }
        else //if(props.short && props.pics.length > LIMIT_PICS && index === LIMIT_PICS)
          return null
      })}
    </Grid>
  </div>
</div>
}
export default AlbumPics