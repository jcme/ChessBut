var Variant = require("../Variant");

function OnlyPawnsAndKing() { }

OnlyPawnsAndKing.prototype = Object.create(Variant.prototype);

OnlyPawnsAndKing.prototype.flavourText = ["There's only pawns and kings."];

OnlyPawnsAndKing.prototype.afterBoardInitialization = function(board) {
  return {
    a8: null, b8: null, c8: null, d8: null, e8: 'bK_', f8: null, g8: null, h8: null,
    a7: 'bP_', b7: 'bP_', c7: 'bP_', d7: 'bP_', e7: 'bP_', f7: 'bP_', g7: 'bP_', h7: 'bP_',
    a6: null,  b6: null,  c6: null,  d6: null,  e6: null,  f6: null,  g6: null,  h6: null,
    a5: null,  b5: null,  c5: null,  d5: null,  e5: null,  f5: null,  g5: null,  h5: null,
    a4: null,  b4: null,  c4: null,  d4: null,  e4: null,  f4: null,  g4: null,  h4: null,
    a3: null,  b3: null,  c3: null,  d3: null,  e3: null,  f3: null,  g3: null,  h3: null,
    a2: 'wP_', b2: 'wP_', c2: 'wP_', d2: 'wP_', e2: 'wP_', f2: 'wP_', g2: 'wP_', h2: 'wP_',
    a1: null, b1: null, c1: null, d1: null, e1: 'wK_', f1: null, g1: null, h1: null
  };
}

module.exports = OnlyPawnsAndKing;
