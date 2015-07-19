"use strict";

var Snake = (function() {

    var Tail = function(position, length) {
        this.length = length || 0;

        this.parts = [];

        var i = 0;
        while(i < this.length) {
            this.parts.push(new Position(position.x, position.y));
            i++;
        }
    };

    Tail.prototype.grow = function(amount) {
        this.length = this.length + amount;
    };

    Tail.prototype.shrink = function(amount) {
        this.length = Math.max(0, this.length - amount);
    };

    Tail.prototype.change = function(position) {
        if(this.parts.length > this.length) {
            this.parts.pop();
        }

        if(this.parts.length = this.length) {
            this.parts.pop();
        }

        if(this.parts.length < this.length) {
            this.parts.unshift(new Position(position.x, position.y))
        }
    };

    var Snake = function(x, y, vector, tailLength) {
        this.position = new Position(x, y);
        this.vector = vector;
        this.tail = new Tail(this.position, tailLength);
    };

    Snake.prototype.move = function() {
        this.tail.change(this.position);
        this.position.change(this.vector);
    };

    return Snake;
})();
