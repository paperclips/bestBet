import { Component } from 'react-native';
import { connect } from 'react-redux';
import signup from '../components/signup.js';
import signupUser from '../actions/action_signup';

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { signupUser })(signup);