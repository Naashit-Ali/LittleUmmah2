import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import styles from './Ranking.module.scss';

export default function Ranking(props) {

  const history = useHistory();

  const handleHomeButtonClick = () => {
    // End the session and navigate to the home screen
    // Add your session end logic here
    history.push('/');
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
      className={ styles.container }
    >
      <Grid
        item
        container
        justify="flex-end"
        alignItems="center"
        xs={12}
        style={{ minHeight: "10vh" }}
        className={ styles.header }
      >
        <div style={{ textAlign: "right" }}>{ props.nickname }</div>
      </Grid>
      <Grid
        item
        container
        xs={12}
        alignItems="center"
        justify="center"
        direction="column"
        style={{ minHeight: "90vh" }}
        className={ styles.main }
      >
        <button className={styles.homeButton} onClick={handleHomeButtonClick}>Home</button>
        <Rank rank={ props.rank }/>
        <div className={ styles.score }>{ props.score }</div>
      </Grid>
    </Grid>
  )
}

const Rank = (props) => {

  let finalRank;

  if (props.rank === 1) {
    finalRank = <div>1st place</div>
  } else if (props.rank === 2) {
    finalRank = <div>2nd place</div>
  } else if (props.rank === 3) {
    finalRank = <div>3rd place</div>
  } else {
    finalRank=<div>{`${props.rank}th place`}</div>
  }

  return (
    <>{ finalRank }</>
  )
}
