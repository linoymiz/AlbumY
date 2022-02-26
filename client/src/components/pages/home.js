import React, { useState } from 'react'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from '@mui/material/Button';

function Home(){
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const [albumName, setAlbumName] = useState('')
    function updateName(e){
        const inputName = e.target.value
        setAlbumName(inputName)
    }
    function onCreate(e){

    //     fetch('http://localhost:4000/albums', {
    //          method: 'post',
    //          headers: {'Content-Type': 'application/json'},
    //          body: JSON.stringify({
    //            bookname:bookname,
    //            author:author,
       
    //          })
    //        }).then(response=>response.json()).then(data=>{
    //             window.alert(data)
    //             //Do anything else like Toast etc.
    //    })
       
       }

    return <div className='container home-add-btn'>
    <Button onClick={handleClick}>
        <AddCircleOutlineRoundedIcon className='' sx={{fontSize: '100px', color: '#DAA520'}} />
    </Button>
    <h6 className='container' style={{color: '#DAA520', position: 'absolute'}}>Click here to add a new album to your collection</h6>
    {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <Fade in={isOpen}>
          <Box>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal> */}
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>Create A New Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Album Title: </label>
            <Form.Control type="text" placeholder="type here your album name" onChange={updateName} value={albumName}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
}

export default Home