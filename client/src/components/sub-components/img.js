import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

export default function Img(props){
    const [isExpanded, setExpanded] = useState(false)
    const [imgInfo, setImgInfo] = useState({imgId: props.img._id, info: props.img.info})
    const imgAlt= props.img.alt.split(' ')[1]
    const imgSrc = `/uploads/${imgAlt}`
    const useStyles = makeStyles({
            textFStyle: {
          fontWeight: 'bold'
      }
    })
    const classes = useStyles()

    function handleDeleteImg(){
        props.deleteImg(props.img)
    }
    function handleZoomImg(){
      console.log('passing ', props.img);
      props.zoomImg(props.img)
    }
    function handleExpand(){
      setExpanded(true)
    }
    function handleChangeImgInfo(event){
      const {name, value} = event.target
      console.log('name is: ', name);
      setImgInfo(prevVal => {return {imgId: props.img._id, info: {...prevVal.info, [name]: value}}})
    }
    function handleSubmitImgInfo(event){
      event.preventDefault()
      props.editImg(imgInfo)
    }
    return (<Grid item sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
      <CardActions hidden={props.hide}>
            <IconButton className='delete' sx={{position:"relative", right:"0"}} onClick={handleDeleteImg}>
                <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleZoomImg} ><ZoomInIcon /></IconButton>
        </CardActions>
      <CardMedia
        component="img"
        height="140"
        image={imgSrc}
        alt={imgAlt}
      />
      <Box component="form" hidden={props.hide}>
        <CardContent  >
        <TextField 
        InputProps={{
            classes: {
              input: classes.textFStyle,
            },
          }}
          className={classes.textFStyle}
          label = {isExpanded && 'edit'}
          id="standard-basic" 
          variant="standard" 
          placeholder="Title"
          name="title"
          value={imgInfo.info.title}
          onChange={handleChangeImgInfo} 
          onClick = {handleExpand} />        
        <TextField
          id="outlined-multiline-static"
          multiline
          variant="standard"
          maxRows={isExpanded ? 4 : 1}
          placeholder="Write about this photo..."
          name="content"
          value={imgInfo.info.content}
          onChange={handleChangeImgInfo}
        />
        <Box>
          <Button type="submit" hidden={!isExpanded} onClick={handleSubmitImgInfo}>
              Submit
          </Button>
          {/* <Button onClick = ()=>set>
            Close
          </Button> */}
        </Box>

      </CardContent>
        </Box>
    </Card>
    </Grid>)
}