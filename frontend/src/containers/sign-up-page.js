import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Signup } from '../components/index.js';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId: props.userId
    };
  }

  render() {
      if(this.state.userId !== "-1") {
          return <Navigate to='/profile' />
      }
      else {
          return (
              <Signup updateFunc={this.props.updateFunc}/>
          );
      }
  }
}
  
export default SignUpPage;