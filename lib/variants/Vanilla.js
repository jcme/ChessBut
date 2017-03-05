var Variant = require("../Variant");

function Vanilla() {

}

Vanilla.prototype = Object.create(Variant.prototype);

Vanilla.prototype.flavourText = "nothing";

module.exports = Vanilla;
