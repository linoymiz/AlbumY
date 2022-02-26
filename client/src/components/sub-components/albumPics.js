import React from 'react'
// import DeleteIcon from '@mui/icons-material/Delete';

function AlbumPics(props){
    return <div className="container">

      <div style={{padding: '20px 0px'}}>
          <div className="row row-cols-6">
          {props.pics?.map(pic =>
          <div className="container img-box col-xs-2">
          {/* <div className="container center">
                <DeleteIcon id='trash-icon' />
          </div> */}
          {console.log(pic.src)}
            <img src={pic.src} className=" single-img img-thumbnail" alt={pic.alt}></img>
            
          </div>
          )}
            
          </div>
        </div>
  </div>
}
export default AlbumPics