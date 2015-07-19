"use strict";

var Vector = (function() {

    var Vector = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    Vector.prototype.up = function() {
        this.x = 0;
        this.y = -1;
    };

    Vector.prototype.right = function() {
        this.x = 1;
        this.y = 0;
    };

    Vector.prototype.down = function() {
        this.x = 0;
        this.y = 1;
    };

    Vector.prototype.left = function() {
        this.x = -1;
        this.y = 0;
    };

    return Vector;
})();
