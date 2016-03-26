import { Component } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map';

import userMoves from '../actions/action_userMoves';
import resetTraits from '../actions/action_resetTraits';
import updateUserZone from '../actions/action_updateZone';
import logOut from '../actions/action_logout.js';

function mapStateToProps({ user, socket, establishments}) {
  return { user, socket, establishments };
}

export default connect(mapStateToProps, { userMoves, resetTraits, updateUserZone, logOut })(Map);