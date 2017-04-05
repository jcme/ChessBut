function Variant() {

}

Variant.prototype.afterBoardInitialization = function(board) {
  return board;
}

Variant.prototype.afterCaptureMove = function( board, capturePiece, capturedPiece, startSquare, endSquare, captureSquare){
  return board;
}

module.exports = Variant;
