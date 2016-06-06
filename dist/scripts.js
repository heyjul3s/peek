(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

;(function (window, document) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var peek = _Peek(document.querySelector('.peek'));
        peek.init();
    });

    //needs default parametes
    function _Peek(element) {

        //vars
        var slider = element,
            slides = Array.from(element.querySelectorAll('.slide')),
            slidesCount = slides.length,
            currentIndex = 0,
            lastIndex = 0;

        function init() {
            slider.style.width = 100 * slidesCount + '%';

            slides.forEach(function (slide) {
                slide.style.width = 100 / slidesCount + '%';
            });

            peekDotNavigation();
        }

        //actual slide functionality
        function peekSlide() {}

        //callback
        function peekDotNavigation() {
            createPeekDots();
        }

        function createPeekDots() {
            var frag = document.createDocumentFragment(),
                dotNav = document.createElement('nav'),
                anchor = void 0;

            //offset index by 1, for naming purposes
            for (var i = 1; i < slidesCount + 1; i += 1) {
                anchor = document.createElement('a');
                anchor.className = 'peek-dot dot-' + i;

                dotNav.appendChild(anchor);
            }

            dotNav.className = 'peek-dots';

            frag.appendChild(dotNav);
            slider.parentNode.appendChild(frag);
        }

        return Object.freeze({
            init: init
        });
    }
})(window, document);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFFLFdBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEwQjtBQUN4Qjs7QUFFQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFVO0FBQ3BELFlBQUksT0FBTyxNQUFNLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFOLENBQVg7QUFDQSxhQUFLLElBQUw7QUFDSCxLQUhEOzs7QUFNQSxhQUFTLEtBQVQsQ0FBZSxPQUFmLEVBQXdCOzs7QUFHcEIsWUFBSSxTQUFlLE9BQW5CO1lBQ0ksU0FBZSxNQUFNLElBQU4sQ0FBVyxRQUFRLGdCQUFSLENBQXlCLFFBQXpCLENBQVgsQ0FEbkI7WUFFSSxjQUFlLE9BQU8sTUFGMUI7WUFHSSxlQUFlLENBSG5CO1lBSUksWUFBZSxDQUpuQjs7QUFNQSxpQkFBUyxJQUFULEdBQWdCO0FBQ1osbUJBQU8sS0FBUCxDQUFhLEtBQWIsR0FBcUIsTUFBTSxXQUFOLEdBQW9CLEdBQXpDOztBQUVBLG1CQUFPLE9BQVAsQ0FBZSxVQUFTLEtBQVQsRUFBZTtBQUMxQixzQkFBTSxLQUFOLENBQVksS0FBWixHQUFvQixNQUFNLFdBQU4sR0FBb0IsR0FBeEM7QUFDSCxhQUZEOztBQUlBO0FBQ0g7OztBQUlELGlCQUFTLFNBQVQsR0FBcUIsQ0FFcEI7OztBQUlELGlCQUFTLGlCQUFULEdBQTZCO0FBQ3pCO0FBQ0g7O0FBR0QsaUJBQVMsY0FBVCxHQUEyQjtBQUN2QixnQkFBSSxPQUFTLFNBQVMsc0JBQVQsRUFBYjtnQkFDSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQURiO2dCQUVJLGVBRko7OztBQUtBLGlCQUFNLElBQUksSUFBSSxDQUFkLEVBQWlCLElBQUksY0FBYyxDQUFuQyxFQUFzQyxLQUFLLENBQTNDLEVBQStDO0FBQzNDLHlCQUFTLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFUO0FBQ0EsdUJBQU8sU0FBUCxHQUFtQixrQkFBa0IsQ0FBckM7O0FBRUEsdUJBQU8sV0FBUCxDQUFtQixNQUFuQjtBQUNIOztBQUVELG1CQUFPLFNBQVAsR0FBbUIsV0FBbkI7O0FBRUEsaUJBQUssV0FBTCxDQUFpQixNQUFqQjtBQUNBLG1CQUFPLFVBQVAsQ0FBa0IsV0FBbEIsQ0FBOEIsSUFBOUI7QUFDSDs7QUFHRCxlQUFPLE9BQU8sTUFBUCxDQUFjO0FBQ2pCLGtCQUFPO0FBRFUsU0FBZCxDQUFQO0FBSUg7QUFFSixDQW5FQyxFQW1FQSxNQW5FQSxFQW1FUSxRQW5FUixDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIjsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHBlZWsgPSBfUGVlayhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVlaycpKTtcclxuICAgICAgICBwZWVrLmluaXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vbmVlZHMgZGVmYXVsdCBwYXJhbWV0ZXNcclxuICAgIGZ1bmN0aW9uIF9QZWVrKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgLy92YXJzXHJcbiAgICAgICAgbGV0IHNsaWRlciAgICAgICA9IGVsZW1lbnQsXHJcbiAgICAgICAgICAgIHNsaWRlcyAgICAgICA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGUnKSksXHJcbiAgICAgICAgICAgIHNsaWRlc0NvdW50ICA9IHNsaWRlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCAgICA9IDA7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHNsaWRlci5zdHlsZS53aWR0aCA9IDEwMCAqIHNsaWRlc0NvdW50ICsgJyUnO1xyXG5cclxuICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goZnVuY3Rpb24oc2xpZGUpe1xyXG4gICAgICAgICAgICAgICAgc2xpZGUuc3R5bGUud2lkdGggPSAxMDAgLyBzbGlkZXNDb3VudCArICclJztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwZWVrRG90TmF2aWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vYWN0dWFsIHNsaWRlIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICBmdW5jdGlvbiBwZWVrU2xpZGUoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vY2FsbGJhY2tcclxuICAgICAgICBmdW5jdGlvbiBwZWVrRG90TmF2aWdhdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlUGVla0RvdHMoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVQZWVrRG90cyAoKSB7XHJcbiAgICAgICAgICAgIGxldCBmcmFnICAgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKSxcclxuICAgICAgICAgICAgICAgIGFuY2hvcjtcclxuXHJcbiAgICAgICAgICAgIC8vb2Zmc2V0IGluZGV4IGJ5IDEsIGZvciBuYW1pbmcgcHVycG9zZXNcclxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAxOyBpIDwgc2xpZGVzQ291bnQgKyAxOyBpICs9IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgICAgICBhbmNob3IuY2xhc3NOYW1lID0gJ3BlZWstZG90IGRvdC0nICsgaTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYuYXBwZW5kQ2hpbGQoYW5jaG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZG90TmF2LmNsYXNzTmFtZSA9ICdwZWVrLWRvdHMnO1xyXG5cclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChkb3ROYXYpO1xyXG4gICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChmcmFnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICAgICAgICAgIGluaXQgOiBpbml0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSh3aW5kb3csIGRvY3VtZW50KSk7XHJcbiJdfQ==
