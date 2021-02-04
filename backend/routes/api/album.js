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
    const { name, userId } = req.body
    const album = Album.createAlbum({ name, userId });
    return res.json({
        album
    });
}));

// router.delete('/', asyncHandler())


module.exports = router;