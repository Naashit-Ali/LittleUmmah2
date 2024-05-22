const authMiddleware = require('../auth/middleware');
const quizBuilder = require('../controllers/quizController');
const express = require('express');
const router = express.Router();

// GET /quizzes
router.get('/',authMiddleware ,quizBuilder.listAllQuizzes);

// POST /quizzes
router.post('/', authMiddleware,quizBuilder.createAQuiz);

// GET /quizzes/:quizId
router.get('/:quizId',authMiddleware ,quizBuilder.readAQuiz);

// POST /quizzes/:quizId
router.put('/:quizId', authMiddleware ,quizBuilder.updateAQuiz);

// DELETE /quizzes/:quizId
router.delete('/:quizId', authMiddleware,quizBuilder.deleteAQuiz);

module.exports = router;
