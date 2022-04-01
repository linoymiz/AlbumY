import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageListItem from '@mui/material/ImageListItem';

export default function Img(props){
    const imgAlt= props.img.alt.split(' ')[1]
    const imgSrc = `/uploads/${imgAlt}`

    function handleClick(){
        props.deleteImg(props.img)
    }
    return (<ImageListItem>
          <IconButton className='delete' hidden={!props.hideDelete} onClick={handleClick}><DeleteIcon /></IconButton>
            {console.log('inside single image comp. img src: ', imgSrc)}
            <img 
            style={{objectFit: "cover", filter: "none", borderRadius: "8px"}}
                src={imgSrc}
                srcSet={imgSrc}
                alt={imgAlt}
                loading="lazy" />
        </ImageListItem>
        )
}