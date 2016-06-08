(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

;(function (window, document) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var peek = _Peek(document.querySelector('.peek'));
        peek.init();
    });

    //needs default parameters
    function _Peek(element) {

        //vars
        var slider = element,
            slides = Array.from(element.querySelectorAll('.slide')),
            slidesCount = slides.length,
            currentIndex = 0,
            lastIndex = 0;

        function init() {
            //TODO: if more than 1 slide, trigger

            slider.style.width = 100 * slidesCount + '%';

            slides.forEach(function (slide) {
                slide.style.width = 100 / slidesCount + '%';
            });

            createPeekDots();

            var dotNav = document.querySelector('.peek-dots');

            dotNav.addEventListener('click', function (ev) {
                ev.preventDefault();

                var targetDot = ev.target,
                    dots = _getChildren(this),
                    dotIndex = [].indexOf.call(dots, targetDot);

                if (targetDot === this) return;

                gotoSlide(dotIndex);
            });
        }

        //slide functionality
        function slide() {}

        //dot index
        function gotoSlide(index) {
            //pass currentIndex to lastIndex
            lastIndex = currentIndex;
            //pass the clicked index into currentIndex
            currentIndex = index;
        }

        //create the dot navigation elements and append
        function createPeekDots() {
            var frag = document.createDocumentFragment(),
                dotNav = document.createElement('nav'),
                anchor = void 0;

            for (var i = 0; i < slidesCount; i += 1) {
                anchor = document.createElement('a');
                anchor.className = i === currentIndex ? 'peek-dot dot-current' : 'peek-dot';

                dotNav.appendChild(anchor);
            }

            dotNav.className = 'peek-dots';

            frag.appendChild(dotNav);
            slider.parentNode.appendChild(frag);
        }

        //createElement w/ opt to shorten element creation process
        function _createElement() {}

        //get the parent element's children
        function _getChildren(element) {
            var i = 0,
                children = [],
                childrenNodes = element.childNodes,
                child = void 0;

            for (i; i < childrenNodes.length; i += 1) {
                if (childrenNodes[i].nodeType === 1) {
                    children.push(childrenNodes[i]);
                }
            }

            return children;
        }

        return Object.freeze({
            init: init
        });
    }
})(window, document);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFFLFdBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEwQjtBQUN4Qjs7QUFFQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFVO0FBQ3BELFlBQUksT0FBTyxNQUFNLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFOLENBQVg7QUFDQSxhQUFLLElBQUw7QUFDSCxLQUhEOzs7QUFNQSxhQUFTLEtBQVQsQ0FBZSxPQUFmLEVBQXdCOzs7QUFHcEIsWUFBSSxTQUFlLE9BQW5CO1lBQ0ksU0FBZSxNQUFNLElBQU4sQ0FBVyxRQUFRLGdCQUFSLENBQXlCLFFBQXpCLENBQVgsQ0FEbkI7WUFFSSxjQUFlLE9BQU8sTUFGMUI7WUFHSSxlQUFlLENBSG5CO1lBSUksWUFBZSxDQUpuQjs7QUFPQSxpQkFBUyxJQUFULEdBQWdCOzs7QUFHWixtQkFBTyxLQUFQLENBQWEsS0FBYixHQUFxQixNQUFNLFdBQU4sR0FBb0IsR0FBekM7O0FBRUEsbUJBQU8sT0FBUCxDQUFlLFVBQVMsS0FBVCxFQUFlO0FBQzFCLHNCQUFNLEtBQU4sQ0FBWSxLQUFaLEdBQW9CLE1BQU0sV0FBTixHQUFvQixHQUF4QztBQUNILGFBRkQ7O0FBSUE7O0FBRUEsZ0JBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBYjs7QUFFQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFTLEVBQVQsRUFBWTtBQUN6QyxtQkFBRyxjQUFIOztBQUVBLG9CQUFJLFlBQVksR0FBRyxNQUFuQjtvQkFDSSxPQUFZLGFBQWMsSUFBZCxDQURoQjtvQkFFSSxXQUFZLEdBQUcsT0FBSCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0IsU0FBdEIsQ0FGaEI7O0FBSUEsb0JBQUssY0FBYyxJQUFuQixFQUF5Qjs7QUFFekIsMEJBQVUsUUFBVjtBQUNILGFBVkQ7QUFXSDs7O0FBR0QsaUJBQVMsS0FBVCxHQUFpQixDQUVoQjs7O0FBR0QsaUJBQVMsU0FBVCxDQUFvQixLQUFwQixFQUE0Qjs7QUFFeEIsd0JBQVksWUFBWjs7QUFFVCwyQkFBZSxLQUFmO0FBQ007OztBQUlELGlCQUFTLGNBQVQsR0FBMkI7QUFDdkIsZ0JBQUksT0FBUyxTQUFTLHNCQUFULEVBQWI7Z0JBQ0ksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FEYjtnQkFFSSxlQUZKOztBQUlBLGlCQUFNLElBQUksSUFBSSxDQUFkLEVBQWlCLElBQUksV0FBckIsRUFBa0MsS0FBSyxDQUF2QyxFQUEyQztBQUN2Qyx5QkFBUyxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBVDtBQUNBLHVCQUFPLFNBQVAsR0FBcUIsTUFBTSxZQUFSLEdBQXlCLHNCQUF6QixHQUFpRCxVQUFwRTs7QUFFQSx1QkFBTyxXQUFQLENBQW1CLE1BQW5CO0FBQ0g7O0FBRUQsbUJBQU8sU0FBUCxHQUFtQixXQUFuQjs7QUFFQSxpQkFBSyxXQUFMLENBQWlCLE1BQWpCO0FBQ0EsbUJBQU8sVUFBUCxDQUFrQixXQUFsQixDQUE4QixJQUE5QjtBQUNIOzs7QUFJRCxpQkFBUyxjQUFULEdBQTBCLENBQ3pCOzs7QUFJRCxpQkFBUyxZQUFULENBQXNCLE9BQXRCLEVBQStCO0FBQzNCLGdCQUFJLElBQUksQ0FBUjtnQkFDSSxXQUFXLEVBRGY7Z0JBRUksZ0JBQWdCLFFBQVEsVUFGNUI7Z0JBR0ksY0FISjs7QUFLQSxpQkFBTSxDQUFOLEVBQVMsSUFBSSxjQUFjLE1BQTNCLEVBQW1DLEtBQUssQ0FBeEMsRUFBMkM7QUFDdkMsb0JBQUssY0FBYyxDQUFkLEVBQWlCLFFBQWpCLEtBQThCLENBQW5DLEVBQXVDO0FBQ25DLDZCQUFTLElBQVQsQ0FBYyxjQUFjLENBQWQsQ0FBZDtBQUNIO0FBQ0o7O0FBRUQsbUJBQU8sUUFBUDtBQUNIOztBQUdELGVBQU8sT0FBTyxNQUFQLENBQWM7QUFDakIsa0JBQU87QUFEVSxTQUFkLENBQVA7QUFJSDtBQUVKLENBM0dDLEVBMkdBLE1BM0dBLEVBMkdRLFFBM0dSLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiOyhmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgcGVlayA9IF9QZWVrKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZWVrJykpO1xyXG4gICAgICAgIHBlZWsuaW5pdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9uZWVkcyBkZWZhdWx0IHBhcmFtZXRlcnNcclxuICAgIGZ1bmN0aW9uIF9QZWVrKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgLy92YXJzXHJcbiAgICAgICAgbGV0IHNsaWRlciAgICAgICA9IGVsZW1lbnQsXHJcbiAgICAgICAgICAgIHNsaWRlcyAgICAgICA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGUnKSksXHJcbiAgICAgICAgICAgIHNsaWRlc0NvdW50ICA9IHNsaWRlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCAgICA9IDA7XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICAvL1RPRE86IGlmIG1vcmUgdGhhbiAxIHNsaWRlLCB0cmlnZ2VyXHJcblxyXG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUud2lkdGggPSAxMDAgKiBzbGlkZXNDb3VudCArICclJztcclxuXHJcbiAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uKHNsaWRlKXtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gMTAwIC8gc2xpZGVzQ291bnQgKyAnJSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY3JlYXRlUGVla0RvdHMoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkb3ROYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVlay1kb3RzJyk7XHJcblxyXG4gICAgICAgICAgICBkb3ROYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXREb3QgPSBldi50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZG90cyAgICAgID0gX2dldENoaWxkcmVuKCB0aGlzICksXHJcbiAgICAgICAgICAgICAgICAgICAgZG90SW5kZXggID0gW10uaW5kZXhPZi5jYWxsKGRvdHMsIHRhcmdldERvdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0YXJnZXREb3QgPT09IHRoaXMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBnb3RvU2xpZGUoZG90SW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vc2xpZGUgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZG90IGluZGV4XHJcbiAgICAgICAgZnVuY3Rpb24gZ290b1NsaWRlKCBpbmRleCApIHtcclxuICAgICAgICAgICAgLy9wYXNzIGN1cnJlbnRJbmRleCB0byBsYXN0SW5kZXhcclxuICAgICAgICAgICAgbGFzdEluZGV4ID0gY3VycmVudEluZGV4O1xyXG4gICAgICAgICAgICAvL3Bhc3MgdGhlIGNsaWNrZWQgaW5kZXggaW50byBjdXJyZW50SW5kZXhcclxuXHRcdFx0Y3VycmVudEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9jcmVhdGUgdGhlIGRvdCBuYXZpZ2F0aW9uIGVsZW1lbnRzIGFuZCBhcHBlbmRcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVQZWVrRG90cyAoKSB7XHJcbiAgICAgICAgICAgIGxldCBmcmFnICAgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKSxcclxuICAgICAgICAgICAgICAgIGFuY2hvcjtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHNsaWRlc0NvdW50OyBpICs9IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgICAgICBhbmNob3IuY2xhc3NOYW1lID0gKCBpID09PSBjdXJyZW50SW5kZXggKSA/ICdwZWVrLWRvdCBkb3QtY3VycmVudCc6ICdwZWVrLWRvdCc7XHJcblxyXG4gICAgICAgICAgICAgICAgZG90TmF2LmFwcGVuZENoaWxkKGFuY2hvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvdE5hdi5jbGFzc05hbWUgPSAncGVlay1kb3RzJztcclxuXHJcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoZG90TmF2KTtcclxuICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZnJhZyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9jcmVhdGVFbGVtZW50IHcvIG9wdCB0byBzaG9ydGVuIGVsZW1lbnQgY3JlYXRpb24gcHJvY2Vzc1xyXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KCkge1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vZ2V0IHRoZSBwYXJlbnQgZWxlbWVudCdzIGNoaWxkcmVuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldENoaWxkcmVuKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBbXSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuTm9kZXMgPSBlbGVtZW50LmNoaWxkTm9kZXMsXHJcbiAgICAgICAgICAgICAgICBjaGlsZDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIGk7IGkgPCBjaGlsZHJlbk5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkcmVuTm9kZXNbaV0ubm9kZVR5cGUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbk5vZGVzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgICAgICAgaW5pdCA6IGluaXRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KHdpbmRvdywgZG9jdW1lbnQpKTtcclxuIl19
