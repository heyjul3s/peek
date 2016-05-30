(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (window, document) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var peek = _Peek(document.querySelector('.peek'));
        peek.init();
    });

    //default parametes
    function _Peek(element) {

        var slider = element,
            slides = Array.from(element.querySelectorAll('.slider')),
            slidesCount = slides.length;

        function init() {
            console.log(slidesCount);
        }

        //peek width: 100 * slidesCount + '%'

        function peekSlides() {}

        function peekButtons() {}

        function peekDots() {}

        return Object.freeze({
            init: init
        });
    }
})(window, document);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQyxXQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMEI7QUFDdkI7O0FBRUEsYUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVTtBQUNwRCxZQUFJLE9BQU8sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBTixDQUFYO0FBQ0EsYUFBSyxJQUFMO0FBQ0gsS0FIRDs7O0FBTUEsYUFBUyxLQUFULENBQWUsT0FBZixFQUF3Qjs7QUFFaEIsWUFBSSxTQUFjLE9BQWxCO1lBQ0ksU0FBYyxNQUFNLElBQU4sQ0FBVyxRQUFRLGdCQUFSLENBQXlCLFNBQXpCLENBQVgsQ0FEbEI7WUFFSSxjQUFjLE9BQU8sTUFGekI7O0FBSUosaUJBQVMsSUFBVCxHQUFnQjtBQUNaLG9CQUFRLEdBQVIsQ0FBWSxXQUFaO0FBQ0g7Ozs7QUFJRCxpQkFBUyxVQUFULEdBQXNCLENBQ3JCOztBQUVELGlCQUFTLFdBQVQsR0FBdUIsQ0FDdEI7O0FBRUQsaUJBQVMsUUFBVCxHQUFvQixDQUNuQjs7QUFFRCxlQUFPLE9BQU8sTUFBUCxDQUFjO0FBQ2pCLGtCQUFPO0FBRFUsU0FBZCxDQUFQO0FBSUg7QUFFSixDQXBDQSxFQW9DQyxNQXBDRCxFQW9DUyxRQXBDVCxDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHBlZWsgPSBfUGVlayhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVlaycpKTtcclxuICAgICAgICBwZWVrLmluaXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZGVmYXVsdCBwYXJhbWV0ZXNcclxuICAgIGZ1bmN0aW9uIF9QZWVrKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzbGlkZXIgICAgICA9IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXMgICAgICA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyJykpLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzQ291bnQgPSBzbGlkZXMubGVuZ3RoO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzbGlkZXNDb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3BlZWsgd2lkdGg6IDEwMCAqIHNsaWRlc0NvdW50ICsgJyUnXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBlZWtTbGlkZXMoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwZWVrQnV0dG9ucygpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBlZWtEb3RzKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xyXG4gICAgICAgICAgICBpbml0IDogaW5pdFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0od2luZG93LCBkb2N1bWVudCkpO1xyXG4iXX0=
