const { Router } = require('express');

const lancesModel = require('../model/Lances');

const router = Router();

router.get('/', async(req, res) => {
  const lances = await lancesModel.getAll();
  res.status(200).json(lances);
})

module.exports = router;
