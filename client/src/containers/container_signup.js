import { Component } from 'react-native';
import { connect } from 'react-redux';
import signup from '../components/signup.js';
import authUser from '../actions/action_auth.js';
import clearError from '../actions/action_clearError.js';

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { authUser, clearError})(signup);