const express = require('express')
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');

const { User } = require('../../db/models');

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.findByPk(id);
  console.log(user);
  return res.json({user});
}))

module.exports = router;
