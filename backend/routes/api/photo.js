const express = require('express');
const asyncHandler = require('express-async-handler');

const { Photo, User, Comment } = require('../../db/models');


const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { userId, thumbSrc, src } = req.body;
  const photo = await Photo.addAPhoto({ userId, thumbSrc, src });
  return res.json({
    photo,
  });
}));

router.get('/', asyncHandler(async (req, res) => {
  const photos = await Photo.findAll({
    include: User,
    limit: 20,
  });

  return res.json({
    photos,
  });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.scope('main').findByPk(id, {
    include: User
  });
  return res.json({
    photo,
  });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Comment.destroy({
    where: {
      photoId: id
    }
  })
  await Photo.destroy({
    where: {id}
  })
  const message = 'Photo Deleted';
  return res.json({
    message
  });
}));

router.post('/:id/comment', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { comment, userId } = req.body
  const newComment = await Comment.addAComment({
    comment,
    userId,
    photoId: id,
  })
  return res.json({
    comment: newComment
  });
}))

module.exports = router
