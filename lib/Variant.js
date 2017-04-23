function Variant() {

}

Variant.prototype.afterBoardInitialization = function(board) {
  return board;
}

Variant.prototype.afterCaptureMove = function( board, capturePiece, capturedPiece, startSquare, endSquare, captureSquare){
  return board;
}

Variant.prototype.beforeSocketUpdateEmit = function (game, receivingPlayerColor) {
  return game;
}

module.exports = Variant;
