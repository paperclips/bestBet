export default (socket, voteData) => {
  return (dispatch) => {
    socket.emit('userVoted', voteData);
  }
}