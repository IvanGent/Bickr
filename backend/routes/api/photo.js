const express = require('express');
const asyncHandler = require('express-async-handler');

const { Photo } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { id, photoData } = req.body;
  console.log(id, photoData);
}))

module.exports = router
