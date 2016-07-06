(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// TODO: infinite scroll

;(function (window, document) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function (ev) {
        var peek = _Peek(document.querySelector('.peek'));
        peek.init();
    });

    function _Peek(element) {

        var slider = element,
            slides = Array.from(element.querySelectorAll('.slide')),
            slidesCount = slides.length,
            currentIndex = 0,
            lastIndex = 0,
            slideBtnNav = void 0,
            dotNav = void 0,
            dots = void 0;

        //transitionend prefix
        var transitionEndPrefixes = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'msTransition': 'MSTransitionEnd',
            'OTransition': 'oTransitionEnd',
            'transition': 'transitionend'
        };

        function init() {
            //create dot nav and prev/button if more than 1 slide
            if (slidesCount > 1) {
                _createNavElements();
            }

            dotNav = document.querySelector('.peek-dots');
            dots = _getChildren(dotNav);
            slideBtnNav = document.querySelector('.slide-btn-nav');

            dotNav.addEventListener('click', function (ev) {

                ev.preventDefault();

                var targetDot = ev.target,
                    dotIndex = [].indexOf.call(dots, targetDot);

                if (targetDot === this) return;

                _gotoSlide(dotIndex, dots);
            });

            slideBtnNav.addEventListener('click', function (ev) {

                ev.preventDefault();

                var targetBtn = ev.target,
                    slideDirection = targetBtn.dataset.direction;

                if (targetBtn === this) return;

                _slideToDirection(slideDirection, slides, dots);
            });
        }

        /**
         * Create all the necessary navigational elements
         * @return
         */
        function _createNavElements() {
            _createPeekDots();
            _createPrevNextBtn();
        }

        function _gotoSlide(index, dots) {
            if (index === currentIndex) return false;

            lastIndex = currentIndex;
            currentIndex = index;

            _slide(slides, dots);
        }

        /**
         * Determine which nav button and slide
         * @param  {[type]} slideDirection [description]
         * @return {[type]}                [description]
         */
        function _slideToDirection(slideDirection, slides, dots) {

            lastIndex = currentIndex;

            if (slideDirection === 'next' && currentIndex < slidesCount - 1) {
                currentIndex += 1;
            } else if (slideDirection === 'previous' && currentIndex > 0) {
                currentIndex -= 1;
            }

            // _slide( slides, 'selected' );
            _slide(slides, dots);
        }

        function _slide(slides, dots) {
            _setCurrentIndexElementClass(slides[lastIndex], slides[currentIndex], 'selected');
            _setCurrentIndexElementClass(dots[lastIndex], dots[currentIndex], 'dot-current');
        }

        /**
         * Handles slide classes for slide functionality
         * @param  {[type]} targetSlide [description]
         * @return {[type]}             [description]
         */
        function _setCurrentIndexElementClass(lastSelected, currentSelected, klassname) {
            if (!currentSelected.classList.contains(klassname)) {
                currentSelected.classList.add(klassname);
                currentSelected.classList.add('animating');

                _removeLastIndexElementClass(lastSelected, currentSelected, klassname);
            }
        }

        /**
         * Used in lieu with _setCurrentIndexElementClass() to remove previous element class
         * and then halt transitionend events by removing it
         * @param  {[type]} targetSlide [description]
         * @return {[type]}             [description]
         */
        function _removeLastIndexElementClass(lastSelected, currentSelected, klassname) {
            currentSelected.addEventListener(_applyTransitionEndPrefix(currentSelected), function callback(ev) {
                if (ev.propertyName === 'transform' && currentSelected.classList.contains('animating')) {
                    currentSelected.classList.remove('animating');
                }

                if (lastSelected.classList.contains(klassname) && !currentSelected.classList.contains('animating')) {
                    lastSelected.classList.remove(klassname);
                    currentSelected.removeEventListener(_applyTransitionEndPrefix(currentSelected), callback, false);
                }
            });
        }

        function _applyTransitionEndPrefix(element) {

            var transition = void 0;

            //TODO: possibly a better method to do this
            for (transition in transitionEndPrefixes) {
                if (element.style[transition] !== undefined) {
                    return transitionEndPrefixes[transition];
                }
            }
        }

        /**
         * creates the dot navigation elements
         * @return
         */
        function _createPeekDots() {

            var frag = document.createDocumentFragment(),
                anchor = document.createElement('a'),
                dotNav = _createElement('nav', {
                className: 'peek-dots'
            }),
                i = 0;

            for (i; i < slidesCount; i += 1) {
                anchor = document.createElement('a');

                //set initial dot with "dot-current" class
                anchor.className = i === currentIndex ? 'peek-dot dot-current' : 'peek-dot';
                //set to false, no need for deep cloning
                dotNav.appendChild(anchor.cloneNode(false));
            }

            slider.parentNode.appendChild(frag.appendChild(dotNav));
        }

        /**
         * creates the next/prev buttons for the slider
         * @return
         */
        function _createPrevNextBtn() {

            var frag = _elementFrag(_createElement('nav', {
                className: 'slide-btn-nav'
            })),
                prevBtn = _createElement('a', {
                className: 'prev-btn',
                setAttribute: {
                    'data': 'data-direction',
                    'value': 'previous'
                }
            }),
                nextBtn = _createElement('a', {
                className: 'next-btn',
                setAttribute: {
                    'data': 'data-direction',
                    'value': 'next'
                }
            });

            frag.appendChild(prevBtn);
            frag.appendChild(nextBtn);
            slider.parentNode.appendChild(frag);
        }

        /**
         * appends element to document fragment
         * @param  {[type]} element : target element to append
         * @return {[type]}         : document fragment
         */
        function _elementFrag(element) {
            var frag = document.createDocumentFragment();
            return frag.appendChild(element);
        }

        /**
         * create an element with additional options like adding classnames
         * @param  {[type]} tag    : the tag to create
         * @param  {[type]} option : options to set, accommodates className and attributes
         * @return {[type]}        : element
         */
        function _createElement(tag, option) {

            var element = document.createElement(tag);

            if (option) {
                if (option.className) element.className = option.className;
                if (option.setAttribute) element.setAttribute(option.setAttribute.data, option.setAttribute.value);
            }

            return element;
        }

        /**
         * get the parent element's children
         * @param  {[type]} element : target element
         * @return {[type]} array   : array list of child nodes
         */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0VBLENBQUUsV0FBUyxNQUFULEVBQWlCLFFBQWpCLEVBQTBCO0FBQ3hCOztBQUVBLGFBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFVBQVMsRUFBVCxFQUFZO0FBQ3RELFlBQUksT0FBTyxNQUFPLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFQLENBQVg7QUFDQSxhQUFLLElBQUw7QUFDSCxLQUhEOztBQUtBLGFBQVMsS0FBVCxDQUFlLE9BQWYsRUFBd0I7O0FBRXBCLFlBQUksU0FBZSxPQUFuQjtZQUNJLFNBQWUsTUFBTSxJQUFOLENBQVcsUUFBUSxnQkFBUixDQUF5QixRQUF6QixDQUFYLENBRG5CO1lBRUksY0FBZSxPQUFPLE1BRjFCO1lBR0ksZUFBZSxDQUhuQjtZQUlJLFlBQWUsQ0FKbkI7WUFLSSxvQkFMSjtZQU1JLGVBTko7WUFPSSxhQVBKOzs7QUFXQSxZQUFJLHdCQUF3QjtBQUN4QixnQ0FBcUIscUJBREc7QUFFckIsNkJBQWtCLGVBRkc7QUFHcEIsNEJBQWlCLGlCQUhHO0FBSW5CLDJCQUFnQixnQkFKRztBQUtsQiwwQkFBZTtBQUxHLFNBQTVCOztBQVNBLGlCQUFTLElBQVQsR0FBZ0I7O0FBRVosZ0JBQUssY0FBYyxDQUFuQixFQUF1QjtBQUNuQjtBQUNIOztBQUVELHFCQUFjLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFkO0FBQ0EsbUJBQWMsYUFBYSxNQUFiLENBQWQ7QUFDQSwwQkFBYyxTQUFTLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWQ7O0FBRUEsbUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBUyxFQUFULEVBQVk7O0FBRXpDLG1CQUFHLGNBQUg7O0FBRUEsb0JBQUksWUFBWSxHQUFHLE1BQW5CO29CQUNJLFdBQVksR0FBRyxPQUFILENBQVcsSUFBWCxDQUFn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RCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBUT0RPOiBpbmZpbml0ZSBzY3JvbGxcclxuXHJcbjsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKGV2KXtcclxuICAgICAgICBsZXQgcGVlayA9IF9QZWVrKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVlaycpICk7XHJcbiAgICAgICAgcGVlay5pbml0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBfUGVlayhlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXIgICAgICAgPSBlbGVtZW50LFxyXG4gICAgICAgICAgICBzbGlkZXMgICAgICAgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlJykpLFxyXG4gICAgICAgICAgICBzbGlkZXNDb3VudCAgPSBzbGlkZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSAwLFxyXG4gICAgICAgICAgICBsYXN0SW5kZXggICAgPSAwLFxuICAgICAgICAgICAgc2xpZGVCdG5OYXYsXHJcbiAgICAgICAgICAgIGRvdE5hdixcclxuICAgICAgICAgICAgZG90cztcclxuXHJcblxyXG4gICAgICAgIC8vdHJhbnNpdGlvbmVuZCBwcmVmaXhcclxuICAgICAgICBsZXQgdHJhbnNpdGlvbkVuZFByZWZpeGVzID0ge1xyXG4gICAgICAgICAgICAnV2Via2l0VHJhbnNpdGlvbicgOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICdNb3pUcmFuc2l0aW9uJyA6ICd0cmFuc2l0aW9uZW5kJyxcclxuICAgICAgICAgICAgICAgICdtc1RyYW5zaXRpb24nIDogJ01TVHJhbnNpdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAgJ09UcmFuc2l0aW9uJyA6ICdvVHJhbnNpdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uJyA6ICd0cmFuc2l0aW9uZW5kJ1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICAvL2NyZWF0ZSBkb3QgbmF2IGFuZCBwcmV2L2J1dHRvbiBpZiBtb3JlIHRoYW4gMSBzbGlkZVxyXG4gICAgICAgICAgICBpZiAoIHNsaWRlc0NvdW50ID4gMSApIHtcclxuICAgICAgICAgICAgICAgIF9jcmVhdGVOYXZFbGVtZW50cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkb3ROYXYgICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZWVrLWRvdHMnKTtcclxuICAgICAgICAgICAgZG90cyAgICAgICAgPSBfZ2V0Q2hpbGRyZW4oZG90TmF2KTtcclxuICAgICAgICAgICAgc2xpZGVCdG5OYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGUtYnRuLW5hdicpO1xyXG5cclxuICAgICAgICAgICAgZG90TmF2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xyXG5cclxuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldERvdCA9IGV2LnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICBkb3RJbmRleCAgPSBbXS5pbmRleE9mLmNhbGwoZG90cywgdGFyZ2V0RG90KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRhcmdldERvdCA9PT0gdGhpcykgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgX2dvdG9TbGlkZShkb3RJbmRleCwgZG90cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2xpZGVCdG5OYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xyXG5cclxuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldEJ0biAgICAgID0gZXYudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlRGlyZWN0aW9uID0gdGFyZ2V0QnRuLmRhdGFzZXQuZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0QnRuID09PSB0aGlzKSByZXR1cm47XG5cclxuXHJcbiAgICAgICAgICAgICAgICBfc2xpZGVUb0RpcmVjdGlvbiggc2xpZGVEaXJlY3Rpb24sIHNsaWRlcywgZG90cyApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgYWxsIHRoZSBuZWNlc3NhcnkgbmF2aWdhdGlvbmFsIGVsZW1lbnRzXHJcbiAgICAgICAgICogQHJldHVyblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVOYXZFbGVtZW50cygpIHtcclxuICAgICAgICAgICAgX2NyZWF0ZVBlZWtEb3RzKCk7XHJcbiAgICAgICAgICAgIF9jcmVhdGVQcmV2TmV4dEJ0bigpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nb3RvU2xpZGUoIGluZGV4LCBkb3RzICkge1xyXG4gICAgICAgICAgICBpZiAoIGluZGV4ID09PSBjdXJyZW50SW5kZXggKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsYXN0SW5kZXggICAgPSBjdXJyZW50SW5kZXg7XHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICAgICAgX3NsaWRlKCBzbGlkZXMsIGRvdHMgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZXRlcm1pbmUgd2hpY2ggbmF2IGJ1dHRvbiBhbmQgc2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHNsaWRlRGlyZWN0aW9uIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfc2xpZGVUb0RpcmVjdGlvbiggc2xpZGVEaXJlY3Rpb24sIHNsaWRlcywgZG90cyApIHtcclxuXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcclxuXHJcbiAgICAgICAgICAgIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBjdXJyZW50SW5kZXggPCBzbGlkZXNDb3VudCAtIDEgKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICdwcmV2aW91cycgJiYgY3VycmVudEluZGV4ID4gMCApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBfc2xpZGUoIHNsaWRlcywgJ3NlbGVjdGVkJyApO1xyXG4gICAgICAgICAgICBfc2xpZGUoIHNsaWRlcywgZG90cyApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9zbGlkZSggc2xpZGVzLCBkb3RzICkge1xyXG4gICAgICAgICAgICBfc2V0Q3VycmVudEluZGV4RWxlbWVudENsYXNzKCBzbGlkZXNbbGFzdEluZGV4XSwgc2xpZGVzW2N1cnJlbnRJbmRleF0sICdzZWxlY3RlZCcgKTtcbiAgICAgICAgICAgIF9zZXRDdXJyZW50SW5kZXhFbGVtZW50Q2xhc3MoIGRvdHNbbGFzdEluZGV4XSwgZG90c1tjdXJyZW50SW5kZXhdLCAnZG90LWN1cnJlbnQnICk7XG4gICAgICAgIH1cclxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZXMgc2xpZGUgY2xhc3NlcyBmb3Igc2xpZGUgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFyZ2V0U2xpZGUgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9zZXRDdXJyZW50SW5kZXhFbGVtZW50Q2xhc3MoIGxhc3RTZWxlY3RlZCwgY3VycmVudFNlbGVjdGVkLCBrbGFzc25hbWUgKSB7XG4gICAgICAgICAgICBpZiAoICFjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKGtsYXNzbmFtZSkgKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLmNsYXNzTGlzdC5hZGQoa2xhc3NuYW1lKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW5nJyk7XG5cbiAgICAgICAgICAgICAgICBfcmVtb3ZlTGFzdEluZGV4RWxlbWVudENsYXNzKGxhc3RTZWxlY3RlZCwgY3VycmVudFNlbGVjdGVkLCBrbGFzc25hbWUpO1xyXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXNlZCBpbiBsaWV1IHdpdGggX3NldEN1cnJlbnRJbmRleEVsZW1lbnRDbGFzcygpIHRvIHJlbW92ZSBwcmV2aW91cyBlbGVtZW50IGNsYXNzXHJcbiAgICAgICAgICogYW5kIHRoZW4gaGFsdCB0cmFuc2l0aW9uZW5kIGV2ZW50cyBieSByZW1vdmluZyBpdFxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFyZ2V0U2xpZGUgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVMYXN0SW5kZXhFbGVtZW50Q2xhc3MoIGxhc3RTZWxlY3RlZCwgY3VycmVudFNlbGVjdGVkLCBrbGFzc25hbWUgKSB7XG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuYWRkRXZlbnRMaXN0ZW5lciggX2FwcGx5VHJhbnNpdGlvbkVuZFByZWZpeChjdXJyZW50U2VsZWN0ZWQpLCBmdW5jdGlvbiBjYWxsYmFjayhldikge1xuICAgICAgICAgICAgICAgIGlmICggZXYucHJvcGVydHlOYW1lID09PSAndHJhbnNmb3JtJyAmJiBjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhbmltYXRpbmcnKSApIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGluZycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggbGFzdFNlbGVjdGVkLmNsYXNzTGlzdC5jb250YWlucyhrbGFzc25hbWUpICYmICFjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhbmltYXRpbmcnKSApIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoa2xhc3NuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLnJlbW92ZUV2ZW50TGlzdGVuZXIoIF9hcHBseVRyYW5zaXRpb25FbmRQcmVmaXgoY3VycmVudFNlbGVjdGVkKSwgY2FsbGJhY2ssIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2FwcGx5VHJhbnNpdGlvbkVuZFByZWZpeCggZWxlbWVudCApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmFuc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgLy9UT0RPOiBwb3NzaWJseSBhIGJldHRlciBtZXRob2QgdG8gZG8gdGhpc1xyXG4gICAgICAgICAgICBmb3IgKHRyYW5zaXRpb24gaW4gdHJhbnNpdGlvbkVuZFByZWZpeGVzKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCBlbGVtZW50LnN0eWxlW3RyYW5zaXRpb25dICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbkVuZFByZWZpeGVzW3RyYW5zaXRpb25dO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNyZWF0ZXMgdGhlIGRvdCBuYXZpZ2F0aW9uIGVsZW1lbnRzXHJcbiAgICAgICAgICogQHJldHVyblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVQZWVrRG90cygpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBmcmFnICAgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgICAgICAgICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYgPSBfY3JlYXRlRWxlbWVudCgnbmF2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdwZWVrLWRvdHMnXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA7IGkgPCBzbGlkZXNDb3VudDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc2V0IGluaXRpYWwgZG90IHdpdGggXCJkb3QtY3VycmVudFwiIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhbmNob3IuY2xhc3NOYW1lID0gKCBpID09PSBjdXJyZW50SW5kZXggKSA/ICdwZWVrLWRvdCBkb3QtY3VycmVudCc6ICdwZWVrLWRvdCc7XHJcbiAgICAgICAgICAgICAgICAvL3NldCB0byBmYWxzZSwgbm8gbmVlZCBmb3IgZGVlcCBjbG9uaW5nXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYuYXBwZW5kQ2hpbGQoYW5jaG9yLmNsb25lTm9kZShmYWxzZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZnJhZy5hcHBlbmRDaGlsZChkb3ROYXYpICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlcyB0aGUgbmV4dC9wcmV2IGJ1dHRvbnMgZm9yIHRoZSBzbGlkZXJcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVByZXZOZXh0QnRuKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyYWcgPSBfZWxlbWVudEZyYWcoXHJcbiAgICAgICAgICAgICAgICAgICAgX2NyZWF0ZUVsZW1lbnQoJ25hdicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdzbGlkZS1idG4tbmF2J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICksXHJcblxyXG4gICAgICAgICAgICAgICAgcHJldkJ0biAgID0gX2NyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3ByZXYtYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJyAgOiAnZGF0YS1kaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnIDogJ3ByZXZpb3VzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIG5leHRCdG4gICA9IF9jcmVhdGVFbGVtZW50KCdhJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICduZXh0LWJ0bicsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0QXR0cmlidXRlIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YScgIDogJ2RhdGEtZGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyA6ICduZXh0J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChwcmV2QnRuKTtcclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChuZXh0QnRuKTtcclxuICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIGZyYWcgKTtcclxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogYXBwZW5kcyBlbGVtZW50IHRvIGRvY3VtZW50IGZyYWdtZW50XG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gZWxlbWVudCA6IHRhcmdldCBlbGVtZW50IHRvIGFwcGVuZFxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgOiBkb2N1bWVudCBmcmFnbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2VsZW1lbnRGcmFnKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmcmFnLmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlIGFuIGVsZW1lbnQgd2l0aCBhZGRpdGlvbmFsIG9wdGlvbnMgbGlrZSBhZGRpbmcgY2xhc3NuYW1lc1xyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFnICAgIDogdGhlIHRhZyB0byBjcmVhdGVcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IG9wdGlvbiA6IG9wdGlvbnMgdG8gc2V0LCBhY2NvbW1vZGF0ZXMgY2xhc3NOYW1lIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgOiBlbGVtZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnQodGFnLCBvcHRpb24pIHtcclxuXHJcbiAgICAgICAgXHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgXHRpZiAob3B0aW9uKSB7XHJcbiAgICAgICAgXHRcdGlmICggb3B0aW9uLmNsYXNzTmFtZSApIGVsZW1lbnQuY2xhc3NOYW1lID0gb3B0aW9uLmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgIGlmICggb3B0aW9uLnNldEF0dHJpYnV0ZSApIGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbi5zZXRBdHRyaWJ1dGUuZGF0YSwgb3B0aW9uLnNldEF0dHJpYnV0ZS52YWx1ZSk7XHJcbiAgICAgICAgXHR9XHJcblxyXG4gICAgICAgIFx0cmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZ2V0IHRoZSBwYXJlbnQgZWxlbWVudCdzIGNoaWxkcmVuXHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBlbGVtZW50IDogdGFyZ2V0IGVsZW1lbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19IGFycmF5ICAgOiBhcnJheSBsaXN0IG9mIGNoaWxkIG5vZGVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldENoaWxkcmVuKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpID0gMCxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gW10sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbk5vZGVzID0gZWxlbWVudC5jaGlsZE5vZGVzLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpOyBpIDwgY2hpbGRyZW5Ob2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZHJlbk5vZGVzW2ldLm5vZGVUeXBlID09PSAxICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGRyZW5Ob2Rlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICAgICAgICAgIGluaXQgOiBpbml0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSh3aW5kb3csIGRvY3VtZW50KSk7XHJcbiJdfQ==
