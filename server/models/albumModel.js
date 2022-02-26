import mongoose from 'mongoose'
const {Schema} = mongoose
import {PictureSchema} from './pictureModel.js'


const AlbumSchema = new Schema({
    name: String,
    creationDate: String,
    numOfPics: Number,
    pictures: [PictureSchema]
})

export const Album = mongoose.model('Album', AlbumSchema)