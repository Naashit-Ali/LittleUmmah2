import { Component } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../Constant';

let socket;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: `${BASE_URL}/`
      
    };
  socket = io(this.state.endpoint);
  }

  render() {
    return null
  }
}

export { Header, socket };
