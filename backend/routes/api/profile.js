const express = require('express')
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');

const { User, Photo } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  let oldUserObj = await User.getUser(id);
  const newEmail = oldUserObj.email.split('@')[0];
  const user = {
    id: oldUserObj.id,
    firstName: oldUserObj.firstName,
    lastName: oldUserObj.lastName,
    email: newEmail
  }
  return res.json({user});
}))

router.get('/photos/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = id;
  const photos = await Photo.profilePhotos(userId);
  return res.json({photos});
}))
module.exports = router;
