"use strict";

var KeyMapper = (function() {
    var KeyMapper = function(mapping) {
        this.mapping = mapping || {};
    };

    KeyMapper.prototype.observe = function(element) {
        element.addEventListener('keydown', this.handleKeyDown.bind(this));
    };

    KeyMapper.prototype.handleKeyDown = function(event) {
        if(!this.mapping[event.keyCode]) {
            return;
        }

        return this.mapping[event.keyCode](event);
    };

    return KeyMapper;
})();
