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
    const url = props.url + '/add'
    const [selectedImg, setImg] = useState({
        albumId: '',
        imgSrcURL: ''
    })
    // function postImg(file){
    //     console.log('POST',file);
    //     axios.post(url, file)
    // }
    // async function sendPost(file){
    //     try{
    //         await postImg(file)
    //     }
    //     catch(err){
    //         console.log(err.message);
    //     }
    // }
    // function handleSubmit(e) {
    //     e.preventDefault()
    //     sendPost(selectedImg)
    // }

    // const convertToBase64 = (file) => {
    //     return new Promise((res, reject) => {
    //         const strToCut = 'data:' + file.type + ';base64,'
    //         const strLengthToCut = strToCut.length
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             //cut the file header
    //             const finalResult = (reader.result).substring(strLengthToCut)
    //             console.log('RESULT1: ', finalResult);
    //             res(finalResult)
    //         }
    //         reader.onerror = (err) => {
    //             reject(err)
    //         }

    //         reader.readAsDataURL(file); // first reading the selected
    //     })
    // }
    // async function handleChange(e) {
    //     //convert the img file into base64 string
    //     const file = e.target.files[0];
    //     console.log('FILE', file);
    //     const imgSrc = await convertToBase64(file)
    //     console.log('album id: ', props.albumId);
    //     setImg({
    //         ...selectedImg,
    //         albumId: props.albumId,
    //         imgSrcURL: imgSrc
    //     })

    // }
    const Input = styled('input')({
        display: 'none',
    });
    return <div className = "container">
        <form action='/albums/add' method='post' enctype="multipart/form-data">
         {/* onSubmit = {handleSubmit}  */}
        <label htmlFor = "icon-button-file" >
        <Input accept = "image/*"
            name = "GalleryImg"
            id = "icon-button-file"
            type = "file"
            // onChange = {handleChange}
    //  value={selectedImg}
    /> 
    <IconButton color = "primary"
    aria-label = "upload picture"
    component = "span" >
        <PhotoCamera />
    </IconButton> 
    <Button type = 'submit'>Upload </Button> 
    </label> 
    <input type = 'hidden'
        name = "albumId"
        value = {props.albumId}
    />
    </form> 
    </div>
}

export default CreateImg