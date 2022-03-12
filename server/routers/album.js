import express from 'express'
const router = express.Router()
import {Album} from '../models/albumModel.js'
import {Picture} from '../models/pictureModel.js'
import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = './uploads'
        fs.mkdirSync(path, { recursive: true })
        return cb(null, path)
    },
    filename: function (req, file, cb) {
        const suffix = createASuffix(file)
        cb(null, file.fieldname + '-' + suffix)
    }
})
const upload = multer({ storage: storage})

function getAlbumSize(album) {
    return (album.pictures.length)
}

function createASuffix(file){
    //the unique suffix
    const now = new Date()
    const nowFormat = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + '-' + now.getTime()
    const uniqueSuffix = nowFormat + '-' + Math.round(Math.random() * 1E9)

    //the file type
    const fileMimeType = file.mimetype.split('/')
    const fileType = fileMimeType[1]

    return uniqueSuffix + '.' + fileType
}

    function generateRelevantNo(pics,size){
        if (size == 0) return 1;
        else{
            const lastNum = pics[size-1].alt.split('#')[1].split(' ')[0]
            return parseInt(lastNum) + 1;
        }
    }
router.get('/:albumId', function (req, res) {
    console.log('album to search: ', req.params.albumId);
    Album.findById(req.params.albumId, function (err, album) {
        console.log('finding...');
        if (album) {
            console.log('the album is', album);
            res.send(album)
        } else {
            console.log('Not Found');
            res.send('Album does not exist')
        }
    })
})
//get all the albums in the collection
router.get('/', function (req, res) {
    Album.find(function (err, albums) {
        if (albums) {
            res.end(JSON.stringify(albums))
        } else {
            res.send('The collection is empty')
        }

    })
})
router.post('/create', function(req, res, err){
    const albumName = req.body.newAlbumName;

    Album.create({name: albumName}, function(err){
        if(err){
            // res.status(400)
            alert('Could not create a new album due to invalid name')
        }
        else{
            console.log('Successfully created a new album');
            res.redirect('/')
        }

    })
})
router.post('/add', upload.single('GalleryImg'), function (req, res, next) {
    const albumId = req.body.albumId
    const {path, filename }= req.file
    const url = '/albums/' + albumId
    console.log('in add route:\n albumId: ' + albumId + '\npath: '+ path + '\n fileName: '+ filename);
    
    Album.findById(albumId,
        function (err, album) {
        if (album) {
            const albumString = JSON.stringify(album)
            console.log('album JSON', albumString);
            const albumSize = getAlbumSize(album) + 1
            console.log('album new size is: '+ albumSize);
            // const imgSrc = req.body.srcInput
            if (path !== null) {
                //the image src is valid
                const newImg = new Picture({
                    src: path.replace('\\', '/'),
                    alt: 'pic#' + generateRelevantNo(album.pictures, albumSize - 1) + ' ' + filename      
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
                res.redirect(url)
            } else {
                res.end('Please select a valid image')
            }
        } else {
            res.end('the final err: ' + err +'\nAlbum does not exist')
        }
    })
})
router.delete('/delete', function(req, res){
    // console.log('image id: ' + req.body.imgId + '\nalbum id: ' + req.body.albumId);
    const albumId = req.body.albumId
    const url = '/albums/' + albumId
    Album.findOne({
        _id: albumId
    }, function (err, album) {
        if (album) {
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
                req.method = 'GET'
                try{
                res.redirect(url)
                console.log('redirected delte successfully');
                }
                catch(e){
                    console.log('error from redirecting delete: ', e.message);
                }
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
        // [0]   {fieldname: 'input',
        // [0]   originalname: '20180808_115651 - Copy (2).jpg',
        // [0]   encoding: '7bit',
        // [0]   mimetype: 'image/jpeg',
        // [0]   destination: 'uploads',
        // [0]   filename: 'input-1645768067781-114320185',
        // [0]   path: 'uploads\\input-1645768067781-114320185',
        // [0]   size: 536628}
