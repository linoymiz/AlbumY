import React from 'react'
import Img from './img'
import axios from 'axios'
import CreateImg from './createImg'
import { useNavigate } from 'react-router-dom'


function AlbumPics(props){
  const LIMIT_PICS = 4
  const navigate = useNavigate()
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
        .then(() => window.location.reload(false))
        .catch(e => console.log('something went wrong, delete was not complete well.'))
      }
      catch(e){
        console.log('Could not delete the relevant image\n',e);
      }
  }
  setImgSize() // change the img dimensions conditionally
  

    return <div className="container">
            {!props.short && <CreateImg albumId={props.albumId} url={props.url}/>}
            <div style={{padding: '20px 0px'}}>
              <div className="row row-cols-6">
                {props.pics?.map((pic, index) =>
                {
                  if(!props.short ){
                    console.log(!props.short);
                    console.log(index);
                    return <Img key={index} img={pic} hideDelete={!isShortAlbum} deleteImg={handleDeleteImg}/>
                  }
                  else if(props.short && index < LIMIT_PICS){
                    console.log(props.short);
                    console.log(index);
                   return <Img key={index} img={pic} hideDelete={!isShortAlbum} deleteImg={handleDeleteImg}/>
                  }
                  else if(props.short && props.pics.length > LIMIT_PICS && index === LIMIT_PICS)
                  return null
                }
                )}  
              </div>
            </div>
          </div>
}
export default AlbumPics