import React, { useEffect } from 'react'
// import DeleteIcon from '@mui/icons-material/Delete';

function AlbumPics(props){
  useEffect(()=>{
    const imgSize = {imgWidth: getComputedStyle(document.documentElement).getPropertyValue('--img-width'),
                    imgHeight: getComputedStyle(document.documentElement).getPropertyValue('--img-height')}
  },[])

  function setShort(){
    document.documentElement.style.setProperty('--img-width', '100px')
    document.documentElement.style.setProperty('--img-height', '100px')
  }
  const isShortAlbum = props.short

    return <div className="container">
      <div style={{padding: '20px 0px'}}>
          <div className="row row-cols-6">
          {props.pics?.map(pic =>
            <div className="container img-box col-xs-2" style={ isShortAlbum && setShort()} >
            <img src={pic.alt.split(' ')[1]} className="single-img img-thumbnail" alt={pic.alt}></img>           
            </div>
          )}
            
          </div>
        </div>
  </div>
}
export default AlbumPics