import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material'
import React, { useState } from 'react'


export default function ZoomImg(props){
    const {isOpen, selectedImg} = props.zoomProps
    const [open, setOpen] = useState(isOpen) 
    const imgAlt= selectedImg.alt.split(' ')[1]
    const imgSrc = `/uploads/${imgAlt}`
    console.log('props of zoomImg ', selectedImg.src);
    
    const style = {
        maxWidth: '100%',
        maxHeight: '100%'
    }

    function handleClose(){
        setOpen(false)
        props.closeZoom()
    }
    return (
      <Dialog open={open} onClose={handleClose} style={style}>
      <DialogTitle>
        {selectedImg.info.title}
      </DialogTitle>
      <DialogContent>
      <img  style={{ maxWidth: "100%", maxHeight: "calc(100vh - 64px)" }}
       alt={selectedImg.alt} 
       src={imgSrc} /></DialogContent> 
      <DialogContentText>{selectedImg.info.content}</DialogContentText> 
      </Dialog>
    )
  }