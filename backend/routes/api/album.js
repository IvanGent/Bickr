const express = require('express');
const asyncHandler = require('express-async-handler');
// const { contained } = require('sequelize/types/lib/operators');

const { Album, AlbumPhoto, Photo } = require('../../db/models');
// const photo = require('../../db/models/photo');

const router = express.Router();

router.get('/:id', asyncHandler(async(req, res) => {
    const albumId = req.params.id;
    const options = {
        include: [{
            model: AlbumPhoto,
        }]
    }
    const album = await Album.findByPk(albumId, options);
    console.log('THIS IS THE ALBUM',album);
    return res.json({
        album
    })
}))

router.get('/user/:id', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const albums = await Album.findAll({
        include: [{
            model: AlbumPhoto,
            // as: 'AlbumPhotos',
            include: [{
                model: Photo
            }],
        }],
        where: { userId: id}
    })
    console.log(albums);
    // const allAlbums = await albums;
    return res.json({
        albums
    })
}))

router.post('/', asyncHandler(async(req, res) => {
    const { name, userId } = req.body;
    const album = Album.createAlbum({ name, userId });
    const createdAlbum = await album

    return res.json({
        createdAlbum
    });
}));

router.delete('/', asyncHandler(async(req, res) => {
    const { albumId } = req.body;
    const mess = Album.deleteAlbum({albumId})
    const message = await mess;
    return res.json({
        message
    });
}));

router.post('/photo', asyncHandler(async(req, res) => {
    const { albumId, photos } = req.body;
    console.log(photos)
    photos.forEach(id => {
        AlbumPhoto.addPhoto({
            albumId,
            photoId: id
        });
    })
    return res.json({
        message: 'Photos added'
    })
}));

router.delete('/photo', asyncHandler(async(req, res) => {
    const { albumId, photoId } = req.body;
    const mess = AlbumPhoto.removePhoto({ albumId, photoId })
    const message = await mess;
    return res.json({
        message
    });
}));


module.exports = router;