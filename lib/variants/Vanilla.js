var Variant = require("../Variant");

function Vanilla() {

}

Vanilla.prototype = Object.create(Variant.prototype);

Vanilla.prototype.name = "Vanilla";

Vanilla.prototype.flavourText = ["Nothing."];

module.exports = Vanilla;
