import React, {
    useState
} from 'react'
import {
    styled
} from '@mui/material/styles';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import sendDataToServer from '../utilities/httpReqMethods';

function CreateImg(props) {
    // const url = props.url + '/add'
    const [selectedImg, setImg] = useState({
        albumId: '',
        imgSrcURL: ''
    })
    const Input = styled('input')({
        display: 'none',
    });
    const btnStyle = {color: "#f2e677"}

    return <div className = "container">
        <form action='/albums/add' method='post' enctype="multipart/form-data">
        <label htmlFor = "icon-button-file" >
        <Input accept = "image/*"
            name = "GalleryImg"
            id = "icon-button-file"
            type = "file"
    /> 
    <IconButton style={btnStyle}
    aria-label = "upload picture"
    component = "span" >
        <PhotoCamera />
    </IconButton> 
    <Button type='submit' style={btnStyle} >Upload</Button> 
    </label> 
    <input type = 'hidden'
        name = "albumId"
        value = {props.albumId}
    />
    </form> 
    </div>
}

export default CreateImg