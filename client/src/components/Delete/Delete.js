import React, { Component } from 'react';
import styles from './Delete.module.scss';

class Delete extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    // Here, you can add the logic to handle the account deletion
    // For example, you could make an API call to delete the account

    console.log('Delete account for:', username);

    // After deleting the account, you might want to redirect the user
    // this.props.history.push('/somepath');
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Little Ummah</h1>
        </div>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <h2>Delete Account</h2>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Username"
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.deleteButton}>Delete Account</button>
        </form>
      </div>
    );
  }
}

export default Delete;
