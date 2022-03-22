import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ImageListItem from '@mui/material/ImageListItem';

export default function Img(props){
    const src = `${props.img.alt.split(' ')[1]}`
    function handleClick(){
        props.deleteImg(props.img)
    }
    return (<ImageListItem>
          <button className='delete' hidden={!props.hideDelete} onClick={handleClick}><DeleteIcon /></button>
            {console.log('inside single image comp. img src: ', src)}
            <img 
            style={{objectFit: "cover", filter: "none", borderRadius: "8px"}}
                src={src}
                srcSet={src}
                alt={props.img.alt}
                loading="lazy" />
        </ImageListItem>
        )
}