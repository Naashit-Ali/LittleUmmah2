import React, { Component } from 'react';
import styles from './Delete.module.scss';
import JoinGame from '../Player/JoinGame/JoinGame';

class Delete extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loading: false,
      success: false,
      error: null,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDeleteAccount = async () => {
    const { username, password } = this.state;
  
    if (typeof username !== 'string' || username.trim() === '' || 
        typeof password !== 'string' || password.trim() === '') {
      this.setState({ error: 'Username and password must be valid non-empty strings.' });
      return;
    }
  
    this.setState({ loading: true, error: null });
  
    try {
      const response = await fetch(`https://littleummahbackend.matzsolutions.com/api/v1/users/deleteAccount?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        this.setState({ loading: false, success: true });
        setTimeout(() => {
          this.props.history.push('/'); // Redirect to login page
        }, 2000);
      } else {
        const data = await response.json();
        this.setState({ loading: false, error: data.message || 'An error occurred while deleting your account.' });
      }
    } catch (error) {
      this.setState({ loading: false, error: 'An error occurred while deleting your account. Please try again.' });
    }
  };
  

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleDeleteAccount();
  };

  render() {
    const { username, password, loading, success, error } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Little Ummah</h1>
        </div>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <h2>Delete Account</h2>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>Account deleted successfully.</p>}
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
          <button type="submit" className={styles.deleteButton} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Account'}
          </button>
        </form>
      </div>
    );
  }
}

export default Delete;
