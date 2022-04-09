import React
,{useState}
// ,{ useEffect, useState}
     from 'react'
import {
    styled
} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

function CreateImg(props) {   
    const [fileInput, setFile] = useState("")
    const pathToPost = `http://localhost:4000/AlbumY/${props.userId}/${props.albumId}/add`
    console.log('pathToPost: ', pathToPost);
    const Input = styled('input')({
        display: 'none',
    });
    const btnStyle = {color: "primary"}
    
    function handleChange(e){
        console.log('file picked: ', e.target.files[0]);
        setFile(e.target.files[0])
    }
    async function handleSubmit(e){
        try{
            e.preventDefault()
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

            var bodyFormData = new FormData()
            bodyFormData.append('GalleryImg', fileInput); 
            console.log('before posting the img...');
            axios.post(pathToPost, bodyFormData)
           .then(response => {
                console.log('Succeeded posting new image')
                window.location.reload(false)
          })
          .catch(err => console.log('Was unable to make a post request for new image', err))
        }
        catch(err){
            console.log('Was unable to make a post request for new image', err)
        }
      }
    
    return (
    <div className = "container album-dtl">
        <form 
        onSubmit={handleSubmit}
        // action={pathToPost} method="post"
        encType="multipart/form-data">
        <label htmlFor="icon-button-file">
        <Input accept="image/*"
            name="GalleryImg"
            id="icon-button-file"
            type="file"
            onChange={handleChange}
        /> 
        <IconButton style={btnStyle}
                    aria-label="upload picture"
                    component="span" >
            <PhotoCamera />
        </IconButton> 
        <Button type='submit' style={btnStyle} >
            Upload
        </Button> 
        </label> 
        </form> 
        {/* } */}
   </div>
 )

}

export default CreateImg