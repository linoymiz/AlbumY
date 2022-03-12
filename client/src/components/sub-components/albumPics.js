import React from 'react'
import Img from './img'
import axios from 'axios'
import CreateImg from './createImg'

function AlbumPics(props){

  // useEffect(()=>{
  //   const imgSize = {imgWidth: getComputedStyle(document.documentElement).getPropertyValue('--img-width'),
  //                   imgHeight: getComputedStyle(document.documentElement).getPropertyValue('--img-height')}
  // },[])
  const isShortAlbum = props.short
  // console.log('albumPics', props.pics);
  // console.log('albumId', props.albumId);
  // console.log('album', props.album);

  function setImgSize(){
    switch (isShortAlbum){
      case true:
        document.documentElement.style.setProperty('--img-width', '100px')
        document.documentElement.style.setProperty('--img-height', '100px')
      break;
      case false:
        document.documentElement.style.setProperty('--img-width', '250px')
        document.documentElement.style.setProperty('--img-height', '250px')
        break;
        default:
          console.log('invalid value to img size switch')
          break;
    }
  }

  async function handleDeleteImg(imgID){
      try{
        axios.delete('/albums/delete', {data: {albumId: props.albumId, imgId: imgID}})
        console.log('Deleted image successfully.');
      }
      catch(e){
        console.log('Could not delete the relevant image\n',e);
      }
  }
  setImgSize() // change the img dimensions conditionally
  

    return <div className="container">
      <div style={{padding: '20px 0px'}}>
          <div className="row row-cols-6">
          {props.pics?.map((pic, index) =>
            <Img key={index} img={pic} hideDelete={!isShortAlbum} deleteImg={handleDeleteImg}/>
          )}
            
          </div>
        </div>
        <CreateImg albumId={props.albumId} url={props.url}/>

  </div>
}
export default AlbumPics