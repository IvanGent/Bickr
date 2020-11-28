const express = require('express');
const asyncHandler = require('express-async-handler');

const { Comment, User } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async(req, res) => {
  const photoId = req.params.id;
  const comments = await Comment.findAll({
    where: { photoId },
    include: User
  });
  return res.json({
    comments
  });
}));

module.exports = router;
