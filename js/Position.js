"use strict";

var Position = (function() {

    var Position = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    Position.prototype.change = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
    };

    return Position;
})();
