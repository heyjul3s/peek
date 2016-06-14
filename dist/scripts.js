(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//TODO: easing func for huge steps
//TODO: prev/next func
//TODO: underscore funcs[

;(function (window, document) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function (ev) {
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

        var transitionPrefix = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'transition': 'transitionend'
        };

        function init() {
            //apply slider width
            slider.style.width = 100 * slidesCount + '%';

            //apply slide width
            slides.forEach(function (slide) {
                slide.style.width = 100 / slidesCount + '%';
            });

            //create dot nav if more than 1 slide
            if (slidesCount > 1) {
                createPeekDots();
                createPrevNextBtn();
            }

            var dotNav = document.querySelector('.peek-dots');

            dotNav.addEventListener('click', function (ev) {
                ev.preventDefault();

                var targetDot = ev.target,

                //get children
                dots = _getChildren(this),

                //get index of dots
                dotIndex = [].indexOf.call(dots, targetDot);

                if (targetDot === this) return;

                //pass the dot index
                gotoSlide(dotIndex, slider);
            });
        }

        //slide functionality
        function slide(slider) {
            var translateVal = -1 * currentIndex * 100 / slidesCount,
                theSlider = slider;

            theSlider.style.transform = 'translate3d(' + translateVal + '%, 0, 0)';
        }

        //handle forward previous slide
        function prevNext() {}

        //dot index
        function gotoSlide(index, slider) {
            if (index === currentIndex) {
                console.log('is current');
            }

            //pass currentIndex to lastIndex
            lastIndex = currentIndex;
            //pass the clicked index into currentIndex
            currentIndex = index;

            slide(slider);
        }

        //TODO: refactor
        //create the dot navigation elements and append
        function createPeekDots() {
            var frag = document.createDocumentFragment(),
                anchor = document.createElement('a'),
                dotNav = _createElement('nav', {
                className: 'peek-dots'
            }),
                i = 0;

            for (i; i < slidesCount; i += 1) {
                anchor = document.createElement('a');
                anchor.className = i === currentIndex ? 'peek-dot dot-current' : 'peek-dot';
                dotNav.appendChild(anchor.cloneNode(false));
            }

            slider.parentNode.appendChild(frag.appendChild(dotNav));
        }

        function createPrevNextBtn() {
            var frag = elementFrag(_createElement('nav', {
                className: 'slide-btn-nav'
            })),
                prevBtn = _createElement('a', {
                className: 'prev-btn'
            }),
                nextBtn = _createElement('a', {
                className: 'next-btn'
            });

            frag.appendChild(prevBtn);
            frag.appendChild(nextBtn);
            slider.parentNode.appendChild(frag);
        }

        function elementFrag(element) {
            var frag = document.createDocumentFragment();
            return frag.appendChild(element);
        }

        function _createElement(tag, option) {
            var element = document.createElement(tag);

            if (option) {
                if (option.className) element.className = option.className;
            }

            return element;
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDSUEsQ0FBRSxXQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMEI7QUFDeEI7O0FBRUEsYUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsVUFBUyxFQUFULEVBQVk7QUFDdEQsWUFBSSxPQUFPLE1BQU0sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQU4sQ0FBWDtBQUNBLGFBQUssSUFBTDtBQUNILEtBSEQ7OztBQU1BLGFBQVMsS0FBVCxDQUFlLE9BQWYsRUFBd0I7OztBQUdwQixZQUFJLFNBQWUsT0FBbkI7WUFDSSxTQUFlLE1BQU0sSUFBTixDQUFXLFFBQVEsZ0JBQVIsQ0FBeUIsUUFBekIsQ0FBWCxDQURuQjtZQUVJLGNBQWUsT0FBTyxNQUYxQjtZQUdJLGVBQWUsQ0FIbkI7WUFJSSxZQUFlLENBSm5COztBQU1BLFlBQUksbUJBQW1CO0FBQ25CLGdDQUFtQixxQkFEQTtBQUVuQiw2QkFBZ0IsZUFGRztBQUduQiwyQkFBYyxnQkFISztBQUluQiwwQkFBYTtBQUpNLFNBQXZCOztBQU9BLGlCQUFTLElBQVQsR0FBZ0I7O0FBRVosbUJBQU8sS0FBUCxDQUFhLEtBQWIsR0FBcUIsTUFBTSxXQUFOLEdBQW9CLEdBQXpDOzs7QUFHQSxtQkFBTyxPQUFQLENBQWUsVUFBUyxLQUFULEVBQWU7QUFDMUIsc0JBQU0sS0FBTixDQUFZLEtBQVosR0FBb0IsTUFBTSxXQUFOLEdBQW9CLEdBQXhDO0FBQ0gsYUFGRDs7O0FBS0EsZ0JBQUssY0FBYyxDQUFuQixFQUF1QjtBQUNuQjtBQUNBO0FBQ0g7O0FBRUQsZ0JBQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBYjs7QUFHQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFTLEVBQVQsRUFBWTtBQUN6QyxtQkFBRyxjQUFIOztBQUVBLG9C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QUFjLENBQWQsRUFBaUIsUUFBakIsS0FBOEIsQ0FBbkMsRUFBdUM7QUFDbkMsNkJBQVMsSUFBVCxDQUFjLGNBQWMsQ0FBZCxDQUFkO0FBQ0g7QUFDSjs7QUFFRCxtQkFBTyxRQUFQO0FBQ0g7O0FBR0QsZUFBTyxPQUFPLE1BQVAsQ0FBYztBQUNqQixrQkFBTztBQURVLFNBQWQsQ0FBUDtBQUlIO0FBRUosQ0F6S0MsRUF5S0EsTUF6S0EsRUF5S1EsUUF6S1IsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL1RPRE86IGVhc2luZyBmdW5jIGZvciBodWdlIHN0ZXBzXHJcbi8vVE9ETzogcHJldi9uZXh0IGZ1bmNcclxuLy9UT0RPOiB1bmRlcnNjb3JlIGZ1bmNzW1xyXG5cclxuOyhmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgIGxldCBwZWVrID0gX1BlZWsoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWsnKSk7XHJcbiAgICAgICAgcGVlay5pbml0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL25lZWRzIGRlZmF1bHQgcGFyYW1ldGVyc1xyXG4gICAgZnVuY3Rpb24gX1BlZWsoZWxlbWVudCkge1xyXG5cclxuICAgICAgICAvL3ZhcnNcclxuICAgICAgICBsZXQgc2xpZGVyICAgICAgID0gZWxlbWVudCxcclxuICAgICAgICAgICAgc2xpZGVzICAgICAgID0gQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpKSxcclxuICAgICAgICAgICAgc2xpZGVzQ291bnQgID0gc2xpZGVzLmxlbmd0aCxcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gMCxcclxuICAgICAgICAgICAgbGFzdEluZGV4ICAgID0gMDtcclxuXHJcbiAgICAgICAgbGV0IHRyYW5zaXRpb25QcmVmaXggPSB7XHJcbiAgICAgICAgICAgICdXZWJraXRUcmFuc2l0aW9uJzond2Via2l0VHJhbnNpdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICdNb3pUcmFuc2l0aW9uJzondHJhbnNpdGlvbmVuZCcsXHJcbiAgICAgICAgICAgICdPVHJhbnNpdGlvbic6J29UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgJ3RyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIC8vYXBwbHkgc2xpZGVyIHdpZHRoXHJcbiAgICAgICAgICAgIHNsaWRlci5zdHlsZS53aWR0aCA9IDEwMCAqIHNsaWRlc0NvdW50ICsgJyUnO1xyXG5cclxuICAgICAgICAgICAgLy9hcHBseSBzbGlkZSB3aWR0aFxyXG4gICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChmdW5jdGlvbihzbGlkZSl7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9IDEwMCAvIHNsaWRlc0NvdW50ICsgJyUnO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGRvdCBuYXYgaWYgbW9yZSB0aGFuIDEgc2xpZGVcclxuICAgICAgICAgICAgaWYgKCBzbGlkZXNDb3VudCA+IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQZWVrRG90cygpO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHJldk5leHRCdG4oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGRvdE5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZWVrLWRvdHMnKTtcclxuXHJcblxyXG4gICAgICAgICAgICBkb3ROYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXREb3QgPSBldi50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9nZXQgY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICBkb3RzICAgICAgPSBfZ2V0Q2hpbGRyZW4oIHRoaXMgKSxcclxuICAgICAgICAgICAgICAgICAgICAvL2dldCBpbmRleCBvZiBkb3RzXHJcbiAgICAgICAgICAgICAgICAgICAgZG90SW5kZXggID0gW10uaW5kZXhPZi5jYWxsKGRvdHMsIHRhcmdldERvdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0YXJnZXREb3QgPT09IHRoaXMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3Bhc3MgdGhlIGRvdCBpbmRleFxyXG4gICAgICAgICAgICAgICAgZ290b1NsaWRlKGRvdEluZGV4LCBzbGlkZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vc2xpZGUgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIGZ1bmN0aW9uIHNsaWRlKHNsaWRlcikge1xyXG4gICAgXHRcdGxldCB0cmFuc2xhdGVWYWwgPSAtMSAqIGN1cnJlbnRJbmRleCAqIDEwMCAvIHNsaWRlc0NvdW50LFxyXG4gICAgICAgICAgICAgICAgdGhlU2xpZGVyICAgID0gc2xpZGVyO1xyXG5cclxuICAgICAgICAgICAgdGhlU2xpZGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgdHJhbnNsYXRlVmFsICsgJyUsIDAsIDApJztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL2hhbmRsZSBmb3J3YXJkIHByZXZpb3VzIHNsaWRlXHJcbiAgICAgICAgZnVuY3Rpb24gcHJldk5leHQoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9kb3QgaW5kZXhcclxuICAgICAgICBmdW5jdGlvbiBnb3RvU2xpZGUoIGluZGV4LCBzbGlkZXIgKSB7XHJcbiAgICAgICAgICAgIGlmICggaW5kZXggPT09IGN1cnJlbnRJbmRleCApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpcyBjdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcGFzcyBjdXJyZW50SW5kZXggdG8gbGFzdEluZGV4XHJcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcclxuICAgICAgICAgICAgLy9wYXNzIHRoZSBjbGlja2VkIGluZGV4IGludG8gY3VycmVudEluZGV4XHJcblx0XHRcdGN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICAgICAgc2xpZGUoc2xpZGVyKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL1RPRE86IHJlZmFjdG9yXHJcbiAgICAgICAgLy9jcmVhdGUgdGhlIGRvdCBuYXZpZ2F0aW9uIGVsZW1lbnRzIGFuZCBhcHBlbmRcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVQZWVrRG90cyAoKSB7XHJcbiAgICAgICAgICAgIGxldCBmcmFnICAgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgICAgICAgICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYgPSBfY3JlYXRlRWxlbWVudCgnbmF2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdwZWVrLWRvdHMnXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA7IGkgPCBzbGlkZXNDb3VudDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yLmNsYXNzTmFtZSA9ICggaSA9PT0gY3VycmVudEluZGV4ICkgPyAncGVlay1kb3QgZG90LWN1cnJlbnQnOiAncGVlay1kb3QnO1xyXG4gICAgICAgICAgICAgICAgZG90TmF2LmFwcGVuZENoaWxkKGFuY2hvci5jbG9uZU5vZGUoZmFsc2UpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIGZyYWcuYXBwZW5kQ2hpbGQoZG90TmF2KSApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVByZXZOZXh0QnRuKCkge1xyXG4gICAgICAgICAgICBsZXQgZnJhZyA9IGVsZW1lbnRGcmFnKFxyXG4gICAgICAgICAgICAgICAgICAgIF9jcmVhdGVFbGVtZW50KCduYXYnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAnc2xpZGUtYnRuLW5hdidcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApLFxyXG5cclxuICAgICAgICAgICAgICAgIHByZXZCdG4gICA9IF9jcmVhdGVFbGVtZW50KCdhJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdwcmV2LWJ0bidcclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIG5leHRCdG4gICA9IF9jcmVhdGVFbGVtZW50KCdhJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICduZXh0LWJ0bidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChwcmV2QnRuKTtcclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChuZXh0QnRuKTtcclxuICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIGZyYWcgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBlbGVtZW50RnJhZyhlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHRhZywgb3B0aW9uKSB7XHJcbiAgICAgICAgXHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgXHRpZiAob3B0aW9uKSB7XHJcbiAgICAgICAgXHRcdGlmIChvcHRpb24uY2xhc3NOYW1lKSBlbGVtZW50LmNsYXNzTmFtZSA9IG9wdGlvbi5jbGFzc05hbWU7XHJcbiAgICAgICAgXHR9XHJcblxyXG4gICAgICAgIFx0cmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9nZXQgdGhlIHBhcmVudCBlbGVtZW50J3MgY2hpbGRyZW5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0Q2hpbGRyZW4oZWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IFtdLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5Ob2RlcyA9IGVsZW1lbnQuY2hpbGROb2RlcyxcclxuICAgICAgICAgICAgICAgIGNoaWxkO1xyXG5cclxuICAgICAgICAgICAgZm9yICggaTsgaSA8IGNoaWxkcmVuTm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmICggY2hpbGRyZW5Ob2Rlc1tpXS5ub2RlVHlwZSA9PT0gMSApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkcmVuTm9kZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY2hpbGRyZW47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xyXG4gICAgICAgICAgICBpbml0IDogaW5pdFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0od2luZG93LCBkb2N1bWVudCkpO1xyXG4iXX0=
