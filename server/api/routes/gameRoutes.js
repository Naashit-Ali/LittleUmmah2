const gameBuilder = require('../controllers/gameController');
const express = require('express');
const router = express.Router();

router.get('/', gameBuilder.listAllGames);

router.post('/', gameBuilder.createAGame);

router.get('/:gameId', gameBuilder.readAGame);

router.put('/:gameId', gameBuilder.updateAGame);

router.delete('/:gameId', gameBuilder.deleteAGame);

module.exports = router;
