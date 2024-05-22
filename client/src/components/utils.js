// src/api/QuizInfo.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../Constant';

const QuizInfo = {
  getQuiz(id) {
    return axios.get(`${BASE_URL}/quizzes/${id}`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
  },

  getAllQuizzes() {
    return axios.get(`${BASE_URL}/quizzes`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
  }
}

export default QuizInfo;
