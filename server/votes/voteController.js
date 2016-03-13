// vote controller

  // does what it has to do when some fool votes
  function registerVote (vote) {
    // vote controller adds to vote table (with estabId, zone, etc.)
    // vote controller would have to EMIT to the appropriate socketIds that a new vote happened and send that info
  };

module.exports = {
  registerVote: registerVote
};
