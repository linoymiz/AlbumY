import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
import {User} from '../models/userModel.js'
import {Album} from '../models/albumModel.js'
import {Picture} from '../models/pictureModel.js'
import multer from 'multer'
import fs, {unlink} from 'fs'
import bcrypt from 'bcrypt'
import { callbackify } from 'util'
const saltRounds = 10;

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
router.get('/:userId/:albumId', function (req, res) {
    console.log('album to search: ', req.params.albumId);
    Album.findById(req.params.albumId, function (err, album) {
        console.log('finding...');
        if (album) {
            res.send(album)
        } else {
            console.log('Not Found');
            res.send('Album does not exist')
        }
    })
})
//get all the albums in the collection
router.get('/:userId', function (req, res) {
    const userId = req.params.userId
    User.aggregate( [
        {
          $lookup:
            {
              from: "albums",
              localField: "albumsids",
              foreignField: "_id",
              as: "albums_docs"
            }
       }
     ]).then(result => {
            Album.find({ '_id': { $in: (result[0].albumsIds)} }, function(err, userAlbums){
                if(err) console.log('err while trying to get all albums')
                else{
                    res.status(200).send(userAlbums)
                    console.log('succeeded getting all the albums')
                }
            })
            }
         )
       .catch(err => {console.log('error while trying to get albums of user', err)})
})
router.post('/register', function(req, res, err){
    const {fName, lName, email, password} = req.body
    User.findOne({ email: userEmail }).then(function(err, user){
        if(err){
            console.log('something is wrong in seraching user by email');
        }
        else{
                  
            if(!user){ // user does not exists
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    if(err){
                        console.log('could not able to hash password', err)
                    }
                    else{
                        User.create({firstName: fName, lastName: lName, email: email, password: hash}, function(err, user){
                            if(err){
                                console.log('Could not register user', err);
                            }
                            else{
                                console.log('Successfully added user');
                                res.status(200).send(user)
                            }
                        })
                    }
                })
            }
            else {
                res.send('user already exists')
            }
        }
    })
})
        
router.post('/sign', function(req, res, err){
    const {email: userEmail, password: passwordInput} = req.body.user
    User.findOne({ email: userEmail }, function(err, user){
        if(err){
            console.log('something is wrong in seraching user by email');
        }
        else{       
            console.log('USER is: ', user);
            if(user){
                bcrypt.compare(passwordInput, user.password, function(err, result) {
                    if(err){
                        console.log('could not able to make a comparation using \'bcrypt\'');
                    }
                    else{
                        if(result === true){
                            console.log('User successfully signed in');
                            res.status(200).send(user._id)
                        }
                        else{
                            console.log('Invalid password');
                            res.end()
                        }
                    }
                })
            }
            else{
                console.log('user does not exists with the current mail address\nif you meant to register as a new user please click on the \'Register\' button')
            }
        }
    })
})
router.post('/:userId/create', function(req, res, err){
    const userId = req.params.userId
    const albumName = req.body.newAlbumName

    Album.create({name: albumName, ownerId: userId}, function(err, newAlbum){
        if(err){
            // res.status(400)
            console.log('Could not create a new album due to invalid name')
        }
        else{
            console.log('Successfully created a new album', newAlbum);
            User.findByIdAndUpdate(userId, { "$push": {"albumsIds": newAlbum._id}},
                function(err, user){
                    if(err){
                        console.log('error while adding the new album into user', err);
                    }
                    else
                    console.log('Successfully added the new album to user', user);
                    // res.status(200).send()
                    res.redirect('back')
                })
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
            const img = req.body.img
            const imgId = img._id
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
                unlink(img.src, (err) => {
                    if(err) console.log('error from deleting img', err)
                    else console.log('successfully deleted img from the uploads folder!\nimg src: ', img.src);
                })
                try{
                res.end()
                }
                catch(e){
                    console.log('error from delete: ', e.message);
                }
            } else {
                console.log('Please select a valid image')
            }
        } else {
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
