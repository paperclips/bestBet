import { Component } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map';

import userMoves from '../actions/action_userMoves';

function mapStateToProps({ user, socket, establishments }) {
  return { user, socket, establishments };
}

export default connect(mapStateToProps, { userMoves })(Map);