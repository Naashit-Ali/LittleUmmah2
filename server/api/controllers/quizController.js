const mongoose = require('mongoose');
const Quiz = mongoose.model('Quiz');

exports.listAllQuizzes = (req, res) => {
  const{ userID } = req.user;
  Quiz.find({ UserID:userID}, (err, quizzes) => {
    if (err) res.send(err);
    res.json(quizzes);
  })
};

exports.createAQuiz = (req, res) => {
  const{userID} = req.user
  const newQuiz = new Quiz({...req.body, UserID:userID});

  newQuiz.save((err, quiz) => {
    if (err) res.send(err);
    res.json(quiz);
  });
};

exports.readAQuiz = (req, res) => {
  Quiz.findById(req.params.quizId, (err, quiz) => {
    if (err) res.send(err);
    res.json(quiz);
  });
};

exports.updateAQuiz = (req, res) => {
  Quiz.findOneAndUpdate(
    { _id: req.params.quizId, UserID: req.user.userID },
    req.body,
    { new: true },
    (err, quiz) => {
      if (err) res.send(err);
      res.json(quiz);
    }
  );
};

exports.deleteAQuiz = (req, res) => {
  Quiz.deleteOne({ _id: req.params.quizId, UserID: req.user.userID }, (err) => {
    if (err) res.send(err);
    res.json({
      message: 'Quiz successfully deleted',
      _id: req.params.quizId
    });
  });
};
