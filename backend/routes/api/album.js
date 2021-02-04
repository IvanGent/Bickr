const express = require('express');
const asyncHandler = require('express-async-handler');

const { Album, AlbumPhoto } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async(req, res) => {
    const albumId = req.params.id;
    const album = Album.findByPk(albumId);
    return res.json({
        album
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
    const { albumId, photoId} = req.body;
    const mess = AlbumPhoto.addPhoto({ albumId, photoId});
    const message = await mess;
    return res.json({
        message
    });
}));


module.exports = router;