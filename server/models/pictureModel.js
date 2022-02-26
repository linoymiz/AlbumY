import mongoose from 'mongoose'
const {Schema} = mongoose

export const PictureSchema = new Schema({
    src: String,
    alt: String
})
export const Picture = mongoose.model('Picture', PictureSchema)


