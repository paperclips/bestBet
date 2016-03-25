import { Component } from 'react-native';
import { connect } from 'react-redux';
import Menu from '../components/menu.js';

function mapStateToProps({ user, socket }) {
  return { user, socket };
}

export default connect(mapStateToProps, { logOut })(Menu);