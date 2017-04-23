var IO = null;
var DB = null;

/**
 * Add player to game
 * Emits an "update" event on success or an "error" event on failure
 */
var join = function(gameID) {

  var sess      = this.handshake.session;
  var debugInfo = {
    socketID : this.id,
    event    : 'join',
    gameID   : gameID,
    session  : sess
  };

  // Check if user has permission to access this game
  if (gameID !== sess.gameID) {
    console.log('ERROR: Access Denied', debugInfo);
    this.emit('error', {message: "You cannot join this game"});
    return;
  }

  // Lookup game in database
  var game = DB.find(gameID);
  if (!game) {
    console.log('ERROR: Game Not Found', debugInfo);
    this.emit('error', {message: "Game not found"});
    return;
  }

  // Add user to game
  var result = game.addPlayer(sess);
  if (!result) {
    console.log('ERROR: Failed to Add Player', debugInfo);
    this.emit('error', {message: "Unable to join game"});
    return;
  }

  //Save the player colour
  this.playerColor = sess.playerColor;

  // Add user to a socket.io "room" that matches the game ID
  this.join(gameID);

  // Emit the update event to everyone in this room/game
  //IO.sockets.in(gameID).emit('update', game);

  broadcastGameState(game, gameID, this);

  console.log(sess.playerName+' joined '+gameID);
};

/**
 * Apply move to game
 * Emits an "update" event on success or an "error" event on failure
 */
var move = function(data) {

  var sess      = this.handshake.session;
  var debugInfo = {
    socketID : this.id,
    event    : 'move',
    gameID   : data.gameID,
    move     : data.move,
    session  : sess
  };

  // Check if user has permission to access this game
  if (data.gameID !== sess.gameID) {
    console.log('ERROR: Access Denied', debugInfo);
    this.emit('error', {message: "You have not joined this game"});
    return;
  }

  // Lookup game in database
  var game = DB.find(data.gameID);
  if (!game) {
    console.log('ERROR: Game Not Found', debugInfo);
    this.emit('error', {message: "Game not found"});
    return;
  }

  // Apply move to game
  var result = game.move(data.move);
  if (!result) {
    console.log('ERROR: Failed to Apply Move', debugInfo);
    this.emit('error', {message: "Invalid move, please try again"});
    return;
  }

  // Emit the update event to everyone in this room/game
  broadcastGameState(game, data.gameID, this);

  console.log(data.gameID+' '+sess.playerName+': '+data.move);
};

/**
 * Forfeit a game
 * Emits an "update" event on success or an "error" event on failure
 */
var forfeit = function(gameID) {

  var sess      = this.handshake.session;
  var debugInfo = {
    socketID : this.id,
    event    : 'forfeit',
    gameID   : gameID,
    session  : sess
  };

  // Check if user has permission to access this game
  if (gameID !== sess.gameID) {
    console.log('ERROR: Access Denied', debugInfo);
    this.emit('error', {message: "You have not joined this game"});
    return;
  }

  // Lookup game in database
  var game = DB.find(gameID);
  if (!game) {
    console.log('ERROR: Game Not Found', debugInfo);
    this.emit('error', {message: "Game not found"});
    return;
  }

  // Forfeit game
  var result = game.forfeit(sess);
  if (!result) {
    console.log('ERROR: Failed to Forfeit', debugInfo);
    this.emit('error', {message: "Failed to forfeit game"});
    return;
  }

  // Emit the update event to everyone in this room/game
  broadcastGameState(game, gameID, this);

  console.log(gameID+' '+sess.playerName+': Forfeit');
};

/**
 * Remove player from game
 */
var disconnect = function() {

  var sess      = this.handshake.session;
  var debugInfo = {
    socketID : this.id,
    event    : 'disconnect',
    session  : sess
  };

  // Lookup game in database
  var game = DB.find(sess.gameID);
  if (!game) {
    console.log('ERROR: Game Not Found', debugInfo);
    return;
  }

  // Remove player from game
  var result = game.removePlayer(sess);
  if (!result) {
    console.log('ERROR: '+sess.playerName+' failed to leave '+sess.gameID);
    return;
  }

  console.log(sess.playerName+' left '+sess.gameID);
  console.log('Socket '+this.id+' disconnected');
};

/**
 * Broadcast the game state to each player based on color
 */
var broadcastGameState = function(game, gameID, socket){
  //Emit the update event to the opponent
  var opponentColor;
  if (socket.playerColor === "white"){
    opponentColor = "black";
  }
  else {
    opponentColor = "white";
  }
  var modifiedGame;
  modifiedGame = game.variant.beforeSocketUpdateEmit(game, opponentColor);
  socket.broadcast.to(gameID).emit('update', modifiedGame);

  //Emit the update event to the current player
  modifiedGame = game.variant.beforeSocketUpdateEmit(game, socket.playerColor);
  socket.emit('update', modifiedGame);
}


/**
 * Attach route/event handlers for socket.io
 */
exports.attach = function(io, db) {
  IO = io;
  DB = db;

  // When a new socket connection is made
  io.sockets.on('connection', function (socket) {

    // Attach the event handlers
    socket.on('join', join);
    socket.on('move', move);
    socket.on('forfeit', forfeit);
    socket.on('disconnect', disconnect);

    console.log('Socket '+socket.id+' connected');
  });
};
