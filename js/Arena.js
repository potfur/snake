"use strict";

var Arena = (function() {

    var Arena = function(size, grow) {
        this.size = size || 10;
        this.grow = grow || 4;

        this.init();
    };

    Arena.prototype.init = function() {
        this.vector = new Vector();
        this.fruit = undefined;
        this.snake = new Snake(
            Math.round(this.size / 2),
            Math.round(this.size / 2),
            this.vector,
            this.grow
        );

        this.placeFruit();
        this.tick();
    };

    Arena.prototype.goUp = function() {
        if(!wouldGoReverse(this.vector, [0, 1])) {
            this.vector.up();
        }
    };

    Arena.prototype.goRight = function() {
        if(!wouldGoReverse(this.vector, [-1, 0])) {
            this.vector.right();
        }
    };

    Arena.prototype.goDown = function() {
        if(!wouldGoReverse(this.vector, [0, -1])) {
            this.vector.down();
        }
    };

    Arena.prototype.goLeft = function() {
        if(!wouldGoReverse(this.vector, [1, 0])) {
            this.vector.left();
        }
    };

    function wouldGoReverse(vector, direction) {
        return vector.x === direction[0] && vector.y === direction[1];
    }

    Arena.prototype.isInRange = function() {
        var x = this.snake.position.x + this.snake.vector.x,
            y = this.snake.position.y + this.snake.vector.y;

        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    };

    Arena.prototype.isOnTail = function() {
        var x = this.snake.position.x + this.snake.vector.x,
            y = this.snake.position.y + this.snake.vector.y;

        if(this.snake.vector.x === 0 && this.snake.vector.y === 0) {
            return false;
        }

        return this.matrix[x][y] === 'T';
    };

    Arena.prototype.isOnFruit = function() {
        return this.fruit.position.x === this.snake.position.x && this.fruit.position.y === this.snake.position.y;
    };

    Arena.prototype.placeFruit = function () {
        var blocked = getBlockedCells(this.snake, this.fruit);
        var coords = randomizeCoords(this.size);

        while(blocked.indexOf(coords.join(',')) !== -1) {
            coords = randomizeCoords(this.size);
        }

        if(!this.fruit) {
            this.fruit = { counter: 0, position: undefined };
        }

        this.fruit.counter++
        this.fruit.position = new Position(coords[0], coords[1]);

        console.log([
            coords,
            blocked
        ]);
    };

    function getBlockedCells(snake, fruit) {
        var blocked = [];

        blocked.push([snake.position.x, snake.position.y]);
        snake.tail.parts.forEach(function(part) {
            blocked.push([part.x, part.y]);
        });

        if(fruit) {
            blocked.push([fruit.position.x, fruit.position.y]);
        }

        blocked.forEach(function(value, i, array) {
            array[i] = value.join(',');
        });

        return blocked;
    }

    function randomizeCoords(multipler) {
        return [
            Math.floor(Math.random() * multipler),
            Math.floor(Math.random() * multipler)
        ];
    }

    Arena.prototype.tick = function() {
        if(!this.isInRange()) {
            throw 'Outside arena matrix';
        }

        if(this.isOnTail()) {
            throw 'Stepped on tail';
        }

        if(this.isOnFruit()) {
            this.placeFruit();
            this.snake.tail.grow(this.grow);
        }

        this.snake.move();

        // prefil matrix with dots
        this.matrix = fillMatrix(this.size, undefined);

        // fruit
        this.matrix[this.fruit.position.x][this.fruit.position.y] = 'X';

        // snake tail
        this.snake.tail.parts.forEach(function(part) {
            this.matrix[part.x][part.y] = 'T';
        }, this);

        // snake head
        this.matrix[this.snake.position.x][this.snake.position.y] = 'S';
    };

    function fillMatrix(size, fill) {
        var x, y, matrix = [];

        for(x = 0; x < size; x++) {
            matrix[x] = [];
            for(y = 0; y < size; y++) {
                matrix[x][y] = fill || '';
            }
        }

        return matrix;
    }

    Arena.prototype.print = function() {
        var i, j, str = [];

        for(i = 0; i < this.size; i++) {
            str[i] = [];
            for(j = 0; j < this.size; j++) {
                str[i][j] = ('.' + this.matrix[j][i]).slice(-1);
            }

            str[i] = str[i].join(' ');
        }

        return str.join("\n") + "\n\n" + this.fruit.counter;
    };

    return Arena;
})();
