import express from 'express'
const router = express.Router()
import {Album} from '../models/albumModel.js'
import {Picture} from '../models/pictureModel.js'
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
        const now = new Date()
        const nowFormat = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + '-' + now.getTime()
        const uniqueSuffix = nowFormat + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage})
function getAlbumSize(album) {
    return album.pictures.length
}
router.get('/', function (req, res) {
    Album.findOne({
        name: 'My First Album'
    }, function (err, album) {
        if (album) {
            res.end(JSON.stringify(album))
        } else {
            res.send('Album does not exist')
        }
    })
})
router.post('/add', upload.single('GalleryImg'), function (req, res, next) {
    // const {albumId, path} = req.body
    // console.log('image source: ' + .substr(0, 20)+ '\nalbum id: ' + albumId);
    

    // upload(function (req, res,err){
    //     if(err){
    //         req.flash('error', err.message)
    //         res.redirect('/albums')
    //     }
    //     else{
    //         // console.log(req.body);
    //         console.log(req.files);
    //     }
    // })
    const albumId = req.body.albumId
    const {path, filename }= req.file
    // need to configurate it again- we get a file in that form:
        // {[0]   fieldname: 'input',
        // [0]   originalname: '20180808_115651 - Copy (2).jpg',
        // [0]   encoding: '7bit',
        // [0]   mimetype: 'image/jpeg',
        // [0]   destination: 'uploads',
        // [0]   filename: 'input-1645768067781-114320185',
        // [0]   path: 'uploads\\input-1645768067781-114320185',
        // [0]   size: 536628
        // [0] }

    Album.findById(albumId,
        function (err, album) {
        if (album) {
            const albumSize = getAlbumSize(album) + 1
            console.log('album new size is: '+ albumSize);
            // const imgSrc = req.body.srcInput
            if (path !== null) {
                //the image src is valid
                const newImg = new Picture({
                    src: path.replace('\\', '/'),
                    alt: 'pic#' + albumSize + ' ' + filename
                })
                newImg.save()
                album.pictures.push(newImg)
                Album.findOneAndUpdate(
                    {_id: albumId}, 
                    {numOfPics: albumSize},
                    function(err){
                        if(!err) {
                            album.save()
                        }
                        else res.end(err + '\ncould not able to update the size: ' + albumSize)
                    }
                )
               console.log('Updated the selected album succesfully');
                res.redirect('/albums')
            } else {
                res.end('Please select a valid image')
            }
        } else {
            res.end('the final err: ' + err +'\nAlbum does not exist')
        }
    })
})
router.post('/delete', function(req, res){
    console.log('image id: ' + req.body.imgId + '\nalbum id: ' + req.body.albumId);
    const albumId = req.body.albumId
    Album.findOne({
        _id: albumId
    }, function (err, album) {
        if (album) {
            console.log('got the album to update');
            const albumSize = getAlbumSize(album) - 1
            const imgId = req.body.imgId
            if (imgId) {
                // delete the image from the picture and from the album collections
                Picture.deleteOne({_id: imgId}).then(console.log('Deleted selected image: ' + imgId)).catch(function(err){ console.log(err)})
                album.pictures = album.pictures.filter(function(pic){
                    return pic._id != imgId
                })
                //update the number of pics inside the album
                Album.updateOne({
                    _id: albumId
                }, {
                    $set: { numOfPics: albumSize}
                }).then(console.log('updated size succesfully to ' + albumSize)
                ).catch(function(err){
                    console.log(err + '\ncould not able to update the size ' + albumSize)}
                )
                album.save()
                console.log('Updated the selected album succesfully');
                // res.redirect('/')
            } else {
                alert('Please select a valid image')
            }
        } else {
            console.log(err)
            console.log('Album does not exist')
        }
    }) 
})

export default router