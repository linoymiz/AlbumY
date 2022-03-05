import React, {useState} from 'react'
import Button from '@mui/material/Button'
import Modal from 'react-bootstrap/Modal'
import AddCircleOvutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import Form from 'react-bootstrap/Form'

function CreateAlbum(){
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    return <div className='container home-add-btn'>
    <Button onClick={handleClick}>
        <AddCircleOvutlineRoundedIcon className='' sx={{fontSize: '100px', color: '#DAA520'}} />
    </Button>
    <h6 className='container' style={{color: '#DAA520', position: 'absolute'}}>Click here to add a new album to your collection</h6>
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
// return <h1>Linoy</h1>
// }
export default CreateAlbum