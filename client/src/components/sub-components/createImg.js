import React
// ,{ useEffect, useState}
     from 'react'
import {
    styled
} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function CreateImg(props) {
    // const [data, setData] = useState({albumId: '', isLoaded: false})
    // const [selectedImg, setImg] = useState({
    //     albumId: '',
    //     imgSrcURL: ''
    // })
    // const albumID = props.albumId
    const Input = styled('input')({
        display: 'none',
    });
    const btnStyle = {color: "rgb(89 13 13 / 47%)"}

    // useEffect(()=>{ //when page is up and prps changed
    //     console.log('load ', data.albumId);
    //       setData({ albumId: props.albumId, isLoaded: true})
    //       console.log('load ftr set ', data.albumId);

    //       return ()=>{
    //         setData({albumId: '', isLoaded: false})
    //         console.log('load fter return ', data.albumId);

    //       }
    // },[props.albumId])

    return (
    <div className = "container album-dtl">
    {console.log('type of album id:', typeof props.albumId )}
    {console.log('the album id:', props.albumId )}
        <form action='/albums/add' method='post' encType="multipart/form-data">
        <label htmlFor="icon-button-file">
        <Input accept="image/*"
            name="GalleryImg"
            id="icon-button-file"
            type="file"
        /> 
        <IconButton style={btnStyle}
                    aria-label="upload picture"
                    component="span" >
            <PhotoCamera />
        </IconButton> 
        <Button type='submit' style={btnStyle}>Upload</Button> 
        </label> 
        <input type='hidden'
           name="albumId"
           value={props.albumId}/>
        </form> 
        {/* } */}
   </div>
 )

}

export default CreateImg