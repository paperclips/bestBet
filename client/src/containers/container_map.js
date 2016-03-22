import { Component } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map';

import userMoves from '../actions/action_userMoves';
import setTag from '../actions/action_set_tag';

function mapStateToProps({ user, socket, establishments }) {
  return { user, socket, establishments };
}

export default connect(mapStateToProps, { userMoves, setTag })(Map);