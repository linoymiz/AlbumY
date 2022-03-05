import mongoose from 'mongoose'
const {Schema} = mongoose
import {PictureSchema} from './pictureModel.js'


const AlbumSchema = new Schema({
    name: {type: String, required: true},
    creationDate: {type: String, default: (new Date()).toLocaleDateString('en-GB')},
    numOfPics: {type: Number, default: 0},
    pictures: [PictureSchema]
})

export const Album = mongoose.model('Album', AlbumSchema)