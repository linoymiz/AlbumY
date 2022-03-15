import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ImageListItem from '@mui/material/ImageListItem';

export default function Img(props){
    function handleClick(){
        props.deleteImg(props.img)
    }
    return (<ImageListItem 
    // sx={{width: "auto", height: "auto" }}
    >
          <button className='delete' hidden={!props.hideDelete} onClick={handleClick}><DeleteIcon /></button>
            <img 
            style={{objectFit: "cover", filter: "none", borderRadius: "8px"}}
                src={`${props.img.alt.split(' ')[1]}`}
                srcSet={`${props.img.alt.split(' ')[1]}`}
                alt={props.img.alt}
                loading="lazy" />
        </ImageListItem>
        )
}