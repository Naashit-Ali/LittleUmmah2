import React from 'react';
import AllQuizzes from './Quiz/AllQuizzes/AllQuizzes';
import ShowQuiz from './Quiz/ShowQuiz/ShowQuiz';
import Lobby from './Host/Lobby/Lobby';
import Start from './Host/Start/Start';
import Gameblock from './Host/Gameblock/Gameblock';
import JoinGame from './Player/JoinGame/JoinGame';
import QuizForm from './Quiz/NewQuiz/QuizForm/QuizForm';
import Playblock from './Player/Playblock/Playblock';
import Instructions from './Player/Instructions/Instructions';
import GetReady from './Player/GetReady/GetReady';
import { Header } from './Global/Header';
import { HashRouter, Switch, Route,  } from 'react-router-dom';
import Login from './Auth/Components/Login/Login';
import Register from './Auth/Components/Register/Register';
import Review from './Host/Review/Review';
import Privacy from './Privacy/Privacy';
import Delete from './Delete/Delete';

function App() {
  return (
    <div className="app">
      <Header />
      <HashRouter>
        <Switch>
          <Route exact path='/' component={ JoinGame }/>
\          <Route exact path='/game' component={ JoinGame }/>
          <Route exact path='/instructions' component={ Instructions }/>
          <Route exact path='/getready' component={ GetReady }/>
          <Route exact path='/lobby' component={ Lobby }/>
          <Route exact path='/start' component={ Start }/>
          <Route exact path='/gameblock' component={ Gameblock }/>
          <Route exact path='/playblock' component={ Playblock }/>
          <Route exact path='/quizzes' component={ AllQuizzes }/>
          <Route exact path='/quizzes/new' component={ QuizForm }/>
          <Route path='/quizzes/:quizId' component={ ShowQuiz }/>
          <Route path='/login' component={ Login }/> 
          <Route path='/register' component={ Register }/>
          <Route path='/review' component={ Review }/>
          <Route path="/privacy" component={Privacy} />
          <Route path="/delete" component={Delete} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
