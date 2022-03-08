import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Img(props){
    function handleClick(){
        props.deleteImg(props.img._id)
    }
    useEffect(()=>{
        console.log('props img',props.img.alt.split(' ')[1]);
    })

    return <div className="container img-box col-xs-2" >
        <div>
            <button className='delete' type='submit' hidden={!props.hideDelete} onClick={handleClick}><DeleteIcon /></button>
            {/* <IconButton aria-label="delete"> */}
                
            {/* </IconButton> */}
            <img src={props.img.alt.split(' ')[1]} className="single-img img-thumbnail" alt={props.img.alt}></img>           
        </div>
    </div>
}