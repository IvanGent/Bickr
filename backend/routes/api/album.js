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


module.exports = router;