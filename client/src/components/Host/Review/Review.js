import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Review.module.scss';
import QuizInfo from '../../utils';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';

class Review extends Component {
  
  constructor() {
    super();
    this.state = {
      name: '',
      category: '',
      questions: [],
      isLoading: true,
      error: null,
      id: ''
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    const quizId = parsed.quizId;

    QuizInfo.getQuiz(quizId)
      .then((response) => {
        const { _id, name, category, questions } = response.data;
        this.setState({
          id: _id,
          name: name,
          category: category,
          questions: questions,
          isLoading: false
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
          isLoading: false
        });
      });
  }

  handleHomeButtonClick = () => {
    // End the session and navigate to the home screen
    // Add your session end logic here
    this.props.history.push('/');
  };


  render() {
    const { name, category, questions, isLoading, error } = this.state;

    if (isLoading) {
      return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
      return <div className={styles.error}>Error loading quiz data: {error.message}</div>;
    }

    // Pass additional props here
    const additionalProps = {
      quizName: name,
      totalNumberOfQuestions: questions.length,
      finalRankings: [], // Placeholder, replace with actual data if available
      pin: '', // Placeholder, replace with actual data if available
      quizId: this.state.id,
      answeredA: 0, // Placeholder, replace with actual data if available
      answeredB: 0, // Placeholder, replace with actual data if available
      answeredC: 0, // Placeholder, replace with actual data if available
      answeredD: 0, // Placeholder, replace with actual data if available
      correctAnswer: '', // Placeholder, replace with actual data if available
      question: '' // Placeholder, replace with actual data if available
    };

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="flex-start"
        style={{ minHeight: "100vh" }}
        className={styles.container}
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          style={{ minHeight: "10vh" }}
          className={styles.title}
        >
          <h1>QUIZ REVIEW</h1>
          <button className={styles.homeButton} onClick={this.handleHomeButtonClick}>Home</button>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          md={6}
          xs={12}
          style={{ minHeight: "90vh" }}
          className={styles.preview}
        >
          <h2>Quiz: {name}</h2>
          <h3>Category: {category}</h3>
          <p>__________________________________________</p>
          <ReviewQuestions questions={questions} {...additionalProps} />
        </Grid>
      </Grid>
    );
  }
}

const ReviewQuestions = (props) => {
  const { questions, quizName, totalNumberOfQuestions, finalRankings, pin, quizId, answeredA, answeredB, answeredC, answeredD, correctAnswer, question } = props;

  if (!questions || questions.length === 0) {
    return (<div className={styles.questions}>No questions available.</div>);
  }

  const questionList = questions.map((q, i) => (
    <div key={q._id} className={styles.questionBlock}>
      <div style={{ fontWeight: "bold" }}>Question {i + 1}</div>
      <p>{q.question}</p>
      <div className={styles.options}>
        {Array.isArray(q.answers) && q.answers.map((option, index) => (
          <div
            key={index}
            className={`${styles.option} ${option === q.correct ? styles.correct : ''}`}
          >
            {option}
          </div>
        ))}
      </div>
      <div className={styles.additionalInfo}>
        <p>a)  {q.answers.a}</p>
        <p>b) {q.answers.b}</p>
        <p>c) {q.answers.c}</p>
        <p>d) {q.answers.d}</p>
        <p style={{ fontWeight: "bold" }}>Correct Answer: {q.correct}</p>
        <p>-------------------------------------------</p>
      </div>
    </div>
  ));

  return (
    <div className={styles.questions}>
      {questionList}
    </div>
  );
};

export default withRouter(Review);
