const express = require('express');
const asyncHandler = require('express-async-handler');

const { Photo } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { userId, thumbSrc, src } = req.body;
  const photo = await Photo.addAPhoto({ userId, thumbSrc, src });
  return res.json({
    photo,
  });
}));

router.get('/', asyncHandler(async (req, res) => {
  const photos = await Photo.getPhotos();

  return await res.json({
    photos,
  });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findPhoto({id});
  return res.json({
    photo,
  });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const message = await Photo.removePhoto({id});
  return res.json({
    message
  });
}));

module.exports = router
