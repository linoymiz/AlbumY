import React, {useState} from 'react'
import Button from '@mui/material/Button'
import Modal from 'react-bootstrap/Modal'
import AddCircleOvutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import Form from 'react-bootstrap/Form'

function CreateAlbum(){
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const addStyle = (element) => {
      return element === 'icon' ? {fontSize: '100px', color: '#e7d09cc7'} 
                               : {color: 'rgb(222 179 83)', position: 'absolute'}
    }

    return <div className='container home-add-btn'>
      <Button onClick={handleClick}>
        <AddCircleOvutlineRoundedIcon sx={addStyle('icon')} />
      </Button>
      <h6 className='container' style={addStyle('text')}>Click here to add a new album to your collection</h6>
    <Modal show={isOpen}>
         <Modal.Header>
          <Modal.Title>Create A New Album</Modal.Title>
        </Modal.Header>
        <form action='/albums/create' method='post'>
        <Modal.Body>
            <label>Album Title: </label>
            <Form.Control type="text" name='newAlbumName' placeholder="type here your album name" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <button type='submit'>
            Create
          </button>
        </Modal.Footer>
      </form> 
      </Modal>
    </div>
}
export default CreateAlbum