var Variant = require("../Variant");

function BecomeWhatYouTake() { }

BecomeWhatYouTake.prototype = Object.create(Variant.prototype);

BecomeWhatYouTake.prototype.flavourText = ["When you take a piece, your piece becomes the piece you took","Kings play as normal."];

BecomeWhatYouTake.prototype.afterCaptureMove = function( board, capturePiece, capturedPiece, startSquare, endSquare, captureSquare){
  if (capturePiece.charAt(1) !== "K") {
    if (capturedPiece.charAt(0) === "w") {
      capturedPiece = "b" + capturedPiece.substr(1);
    }  else {
      capturedPiece = "w" + capturedPiece.substr(1);
    }
    board[endSquare] = capturedPiece;
  }
  return board;
}

module.exports = BecomeWhatYouTake;
