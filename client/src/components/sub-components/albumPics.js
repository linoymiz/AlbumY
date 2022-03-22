import React from 'react'
import Img from './img'
import axios from 'axios'
import CreateImg from './createImg'
import ImageList from '@mui/material/ImageList';

function AlbumPics(props){
  const LIMIT_PICS = 5
  // useEffect(()=>{
  //   const imgSize = {imgWidth: getComputedStyle(document.documentElement).getPropertyValue('--img-width'),
  //                   imgHeight: getComputedStyle(document.documentElement).getPropertyValue('--img-height')}
  // },[])
  const isShortAlbum = props.short
  // console.log('albumPics', props.pics);
  // console.log('albumId', props.albumId);
  // console.log('album', props.album);

  // function setImgSize(){
  //   switch (isShortAlbum){
  //     case true:
  //       document.documentElement.style.setProperty('--img-width', '100px')
  //       document.documentElement.style.setProperty('--img-height', '100px')
  //     break;
  //     case false:
  //       document.documentElement.style.setProperty('--img-width', '250px')
  //       document.documentElement.style.setProperty('--img-height', '250px')
  //       break;
  //       default:
  //         console.log('invalid value to img size switch')
  //         break;
  //   }
  // }

  async function handleDeleteImg(reqImg){
      try{
        axios.delete('/albums/delete', {data: {albumId: props.albumId, img: reqImg}})
        .then(() => window.location.reload(false))
        .catch(e => console.log('something went wrong, delete was not complete well.'))
      }
      catch(e){
        console.log('Could not delete the relevant image\n',e);
      }
  }
  // setImgSize() // change the img dimensions conditionally
  
  return <div className="container">
  {console.log('inside albumPics comp. pictures:', props.pics)}
            {!props.short && <CreateImg albumId={props.albumId} url={props.url}/>}
            <div style={{padding: '20px 0px'}}>
            <ImageList sx={{ width: "auto", height: "auto" }} variant ="woven" cols={5} gap={8}>
  {props.pics?.map((pic, index) => {
    if(!props.short ){
    return (<Img key={pic.alt} img={pic} hideDelete={!isShortAlbum} deleteImg={handleDeleteImg}/>)
    }
    else if(props.short && index < LIMIT_PICS){
      return (<Img img={pic} hideDelete={!isShortAlbum} deleteImg={handleDeleteImg}/>)
    }
    else if(props.short && props.pics.length > LIMIT_PICS && index === LIMIT_PICS)
      return null
  })}
  </ImageList>
  </div>
</div>
}
export default AlbumPics