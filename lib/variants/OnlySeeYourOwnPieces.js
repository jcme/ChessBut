var Variant = require("../Variant");

function OnlySeeYourOwnPieces() { }

OnlySeeYourOwnPieces.prototype = Object.create(Variant.prototype);

OnlySeeYourOwnPieces.prototype.flavourText = ["You can only see your own pieces and your opponent's king."];

OnlySeeYourOwnPieces.prototype.beforeSocketUpdateEmit = function(game, receivingPlayerColor) {
//  var cloneGame = Object.assign({}, game);
  var cloneGame = JSON.parse(JSON.stringify(game));
  Object.keys(cloneGame.board).forEach(function(key,index) {
    if(cloneGame.board[key] !== null && cloneGame.board[key].charAt(0) !== receivingPlayerColor.charAt(0)
          && cloneGame.board[key].charAt(1) !== "K") {
      cloneGame.board[key] = null;
    }
  });
  return cloneGame;
}

module.exports = OnlySeeYourOwnPieces;
