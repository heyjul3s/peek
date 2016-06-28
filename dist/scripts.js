(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//TODO: ensure when animating, no other events to interfere

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

            _slide(slides, dots);
        }

        function _slide(slides, dots) {

            var slideHandler = _currentElementClassHandler.bind(null, slides, 'selected'),
                dotNavHandler = _currentElementClassHandler.bind(null, dots, 'dot-current');

            slideHandler(_getElementIndexes(lastIndex, currentIndex));
            dotNavHandler(_getElementIndexes(lastIndex, currentIndex));
        }

        /**
         * Class swapping helper to remove designated class from previous element
         * and add to new element
         * @param  {[type]} lastElement
         * @param  {[type]} currentElement
         * @param  {[ string ]} klassName      : class name to be modified
         * @return
         */

        //TODO: string check and trim
        function _currentElementClassHandler(element, klassname, indexes) {
            var _indexes = _slicedToArray(indexes, 2);

            var lastIndex = _indexes[0];
            var currentIndex = _indexes[1];


            _setCurrentIndexElementClass(element[lastIndex], element[currentIndex], klassname);
        }

        function _getElementIndexes(lastIndex, currentIndex) {

            var indexes = [];

            //TODO: additional helper funcs for arg checks
            if (typeof lastIndex !== 'undefined' && typeof currentIndex !== 'undefined') {
                indexes.push(lastIndex, currentIndex);
            }

            return indexes;
        }

        /**
         * Handles slide classes for slide functionality
         * @param  {[type]} targetSlide [description]
         * @return {[type]}             [description]
         */
        function _setCurrentIndexElementClass(lastSelected, currentSelected, klassname) {

            if (!currentSelected.classList.contains(klassname)) {
                currentSelected.classList.add(klassname);
                _removeLastIndexElementClass(lastSelected, currentSelected, klassname);
            }
        }

        /**
         * Used in lieu with _setCurrentIndexElementClass() to remove previous element class
         * @param  {[type]} targetSlide [description]
         * @return {[type]}             [description]
         */
        function _removeLastIndexElementClass(lastSelected, currentSelected, klassname) {

            currentSelected.addEventListener(_applyTransitionEndPrefix(currentSelected), function () {
                if (lastSelected.classList.contains(klassname)) {
                    lastSelected.classList.remove(klassname);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDRUEsQ0FBRSxXQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMEI7QUFDeEI7O0FBRUEsYUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsVUFBUyxFQUFULEVBQVk7QUFDdEQsWUFBSSxPQUFPLE1BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQVAsQ0FBWDtBQUNBLGFBQUssSUFBTDtBQUNILEtBSEQ7O0FBS0EsYUFBUyxLQUFULENBQWUsT0FBZixFQUF3Qjs7QUFFcEIsWUFBSSxTQUFlLE9BQW5CO1lBQ0ksU0FBZSxNQUFNLElBQU4sQ0FBVyxRQUFRLGdCQUFSLENBQXlCLFFBQXpCLENBQVgsQ0FEbkI7WUFFSSxjQUFlLE9BQU8sTUFGMUI7WUFHSSxlQUFlLENBSG5CO1lBSUksWUFBZSxDQUpuQjtZQUtJLG9CQUxKO1lBTUksZUFOSjtZQU9JLGFBUEo7OztBQVdBLFlBQUksd0JBQXdCO0FBQ3hCLGdDQUFxQixxQkFERztBQUVyQiw2QkFBa0IsZUFGRztBQUdwQiw0QkFBaUIsaUJBSEc7QUFJbkIsMkJBQWdCLGdCQUpHO0FBS2xCLDBCQUFlO0FBTEcsU0FBNUI7O0FBU0EsaUJBQVMsSUFBVCxHQUFnQjs7QUFFWixnQkFBSyxjQUFjLENBQW5CLEVBQXVCO0FBQ25CO0FBQ0g7O0FBRUQscUJBQWMsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQWQ7QUFDQSxtQkFBYyxhQUFhLE1BQWIsQ0FBZDtBQUNBLDBCQUFjLFNBQVMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBZDs7QUFFQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFTLEVBQVQsRUFBWTs7QUFFekMsbUJBQUcsY0FBSDs7QUFFQSxvQkFBSSxZQUFZLEdBQUcsTUFBbkI7b0JBQ0ksV0FBWSxHQUFHLE9BQUgsQ0FBVyxJQUFYLENB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LEtBQThCLENBQW5DLEVBQXVDO0FBQ25DLDZCQUFTLElBQVQsQ0FBYyxjQUFjLENBQWQsQ0FBZDtBQUNIO0FBQ0o7O0FBRUQsbUJBQU8sUUFBUDtBQUNIOztBQUdELGVBQU8sT0FBTyxNQUFQLENBQWM7QUFDakIsa0JBQU87QUFEVSxTQUFkLENBQVA7QUFJSDtBQUVKLENBblRDLEVBbVRBLE1BblRBLEVBbVRRLFFBblRSLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9UT0RPOiBlbnN1cmUgd2hlbiBhbmltYXRpbmcsIG5vIG90aGVyIGV2ZW50cyB0byBpbnRlcmZlcmVcclxuXHJcbjsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCl7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKGV2KXtcclxuICAgICAgICBsZXQgcGVlayA9IF9QZWVrKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVlaycpICk7XHJcbiAgICAgICAgcGVlay5pbml0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBfUGVlayhlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBzbGlkZXIgICAgICAgPSBlbGVtZW50LFxyXG4gICAgICAgICAgICBzbGlkZXMgICAgICAgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlJykpLFxyXG4gICAgICAgICAgICBzbGlkZXNDb3VudCAgPSBzbGlkZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSAwLFxyXG4gICAgICAgICAgICBsYXN0SW5kZXggICAgPSAwLFxyXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdixcclxuICAgICAgICAgICAgZG90TmF2LFxyXG4gICAgICAgICAgICBkb3RzO1xyXG5cclxuXHJcbiAgICAgICAgLy90cmFuc2l0aW9uZW5kIHByZWZpeFxyXG4gICAgICAgIGxldCB0cmFuc2l0aW9uRW5kUHJlZml4ZXMgPSB7XHJcbiAgICAgICAgICAgICdXZWJraXRUcmFuc2l0aW9uJyA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgJ01velRyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnLFxyXG4gICAgICAgICAgICAgICAgJ21zVHJhbnNpdGlvbicgOiAnTVNUcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAnT1RyYW5zaXRpb24nIDogJ29UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGRvdCBuYXYgYW5kIHByZXYvYnV0dG9uIGlmIG1vcmUgdGhhbiAxIHNsaWRlXHJcbiAgICAgICAgICAgIGlmICggc2xpZGVzQ291bnQgPiAxICkge1xyXG4gICAgICAgICAgICAgICAgX2NyZWF0ZU5hdkVsZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvdE5hdiAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWstZG90cycpO1xyXG4gICAgICAgICAgICBkb3RzICAgICAgICA9IF9nZXRDaGlsZHJlbihkb3ROYXYpO1xyXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZS1idG4tbmF2Jyk7XHJcblxyXG4gICAgICAgICAgICBkb3ROYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldil7XHJcblxyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RG90ID0gZXYudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdEluZGV4ICA9IFtdLmluZGV4T2YuY2FsbChkb3RzLCB0YXJnZXREb3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0RG90ID09PSB0aGlzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgX2dvdG9TbGlkZShkb3RJbmRleCwgZG90cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2xpZGVCdG5OYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xyXG5cclxuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldEJ0biAgICAgID0gZXYudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlRGlyZWN0aW9uID0gdGFyZ2V0QnRuLmRhdGFzZXQuZGlyZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0QnRuID09PSB0aGlzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgX3NsaWRlVG9EaXJlY3Rpb24oIHNsaWRlRGlyZWN0aW9uLCBzbGlkZXMsIGRvdHMgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlIGFsbCB0aGUgbmVjZXNzYXJ5IG5hdmlnYXRpb25hbCBlbGVtZW50c1xyXG4gICAgICAgICAqIEByZXR1cm5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlTmF2RWxlbWVudHMoKSB7XHJcbiAgICAgICAgICAgIF9jcmVhdGVQZWVrRG90cygpO1xyXG4gICAgICAgICAgICBfY3JlYXRlUHJldk5leHRCdG4oKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ290b1NsaWRlKCBpbmRleCwgZG90cyApIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggaW5kZXggPT09IGN1cnJlbnRJbmRleCApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCAgICA9IGN1cnJlbnRJbmRleDtcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgICBfc2xpZGUoIHNsaWRlcywgZG90cyApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERldGVybWluZSB3aGljaCBuYXYgYnV0dG9uIGFuZCBzbGlkZVxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gc2xpZGVEaXJlY3Rpb24gW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9zbGlkZVRvRGlyZWN0aW9uKCBzbGlkZURpcmVjdGlvbiwgc2xpZGVzLCBkb3RzICkge1xyXG5cclxuICAgICAgICAgICAgbGFzdEluZGV4ID0gY3VycmVudEluZGV4O1xyXG5cclxuICAgICAgICAgICAgaWYgKCBzbGlkZURpcmVjdGlvbiA9PT0gJ25leHQnICYmIGN1cnJlbnRJbmRleCA8IHNsaWRlc0NvdW50IC0gMSApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBzbGlkZURpcmVjdGlvbiA9PT0gJ3ByZXZpb3VzJyAmJiBjdXJyZW50SW5kZXggPiAwICkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9zbGlkZSggc2xpZGVzLCBkb3RzICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3NsaWRlKCBzbGlkZXMsIGRvdHMgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2xpZGVIYW5kbGVyICA9IF9jdXJyZW50RWxlbWVudENsYXNzSGFuZGxlci5iaW5kKCBudWxsLCBzbGlkZXMsICdzZWxlY3RlZCcgKSxcclxuICAgICAgICAgICAgICAgIGRvdE5hdkhhbmRsZXIgPSBfY3VycmVudEVsZW1lbnRDbGFzc0hhbmRsZXIuYmluZCggbnVsbCwgZG90cywgJ2RvdC1jdXJyZW50JyApO1xyXG5cclxuICAgICAgICAgICAgc2xpZGVIYW5kbGVyKCBfZ2V0RWxlbWVudEluZGV4ZXMobGFzdEluZGV4LCBjdXJyZW50SW5kZXgpICk7XHJcbiAgICAgICAgICAgIGRvdE5hdkhhbmRsZXIoIF9nZXRFbGVtZW50SW5kZXhlcyhsYXN0SW5kZXgsIGN1cnJlbnRJbmRleCkgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDbGFzcyBzd2FwcGluZyBoZWxwZXIgdG8gcmVtb3ZlIGRlc2lnbmF0ZWQgY2xhc3MgZnJvbSBwcmV2aW91cyBlbGVtZW50XHJcbiAgICAgICAgICogYW5kIGFkZCB0byBuZXcgZWxlbWVudFxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gbGFzdEVsZW1lbnRcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGN1cnJlbnRFbGVtZW50XHJcbiAgICAgICAgICogQHBhcmFtICB7WyBzdHJpbmcgXX0ga2xhc3NOYW1lICAgICAgOiBjbGFzcyBuYW1lIHRvIGJlIG1vZGlmaWVkXHJcbiAgICAgICAgICogQHJldHVyblxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAvL1RPRE86IHN0cmluZyBjaGVjayBhbmQgdHJpbVxyXG4gICAgICAgIGZ1bmN0aW9uIF9jdXJyZW50RWxlbWVudENsYXNzSGFuZGxlciggZWxlbWVudCwga2xhc3NuYW1lLCBpbmRleGVzICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IFsgbGFzdEluZGV4LCBjdXJyZW50SW5kZXggXSA9IGluZGV4ZXM7XHJcblxyXG4gICAgICAgICAgICBfc2V0Q3VycmVudEluZGV4RWxlbWVudENsYXNzKCBlbGVtZW50W2xhc3RJbmRleF0sIGVsZW1lbnRbY3VycmVudEluZGV4XSwga2xhc3NuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0RWxlbWVudEluZGV4ZXMoIGxhc3RJbmRleCwgY3VycmVudEluZGV4ICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGluZGV4ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vVE9ETzogYWRkaXRpb25hbCBoZWxwZXIgZnVuY3MgZm9yIGFyZyBjaGVja3NcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgbGFzdEluZGV4ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY3VycmVudEluZGV4ICE9PSAndW5kZWZpbmVkJyApIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaChsYXN0SW5kZXgsIGN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbmRleGVzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhhbmRsZXMgc2xpZGUgY2xhc3NlcyBmb3Igc2xpZGUgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFyZ2V0U2xpZGUgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9zZXRDdXJyZW50SW5kZXhFbGVtZW50Q2xhc3MoIGxhc3RTZWxlY3RlZCwgY3VycmVudFNlbGVjdGVkLCBrbGFzc25hbWUgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKGtsYXNzbmFtZSkgKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmFkZChrbGFzc25hbWUpO1xyXG4gICAgICAgICAgICAgICAgX3JlbW92ZUxhc3RJbmRleEVsZW1lbnRDbGFzcyhsYXN0U2VsZWN0ZWQsIGN1cnJlbnRTZWxlY3RlZCwga2xhc3NuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVzZWQgaW4gbGlldSB3aXRoIF9zZXRDdXJyZW50SW5kZXhFbGVtZW50Q2xhc3MoKSB0byByZW1vdmUgcHJldmlvdXMgZWxlbWVudCBjbGFzc1xyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFyZ2V0U2xpZGUgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVMYXN0SW5kZXhFbGVtZW50Q2xhc3MoIGxhc3RTZWxlY3RlZCwgY3VycmVudFNlbGVjdGVkLCBrbGFzc25hbWUgKSB7XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuYWRkRXZlbnRMaXN0ZW5lciggX2FwcGx5VHJhbnNpdGlvbkVuZFByZWZpeChjdXJyZW50U2VsZWN0ZWQpLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCBsYXN0U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKGtsYXNzbmFtZSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoa2xhc3NuYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2FwcGx5VHJhbnNpdGlvbkVuZFByZWZpeCggZWxlbWVudCApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmFuc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgLy9UT0RPOiBwb3NzaWJseSBhIGJldHRlciBtZXRob2QgdG8gZG8gdGhpc1xyXG4gICAgICAgICAgICBmb3IgKHRyYW5zaXRpb24gaW4gdHJhbnNpdGlvbkVuZFByZWZpeGVzKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCBlbGVtZW50LnN0eWxlW3RyYW5zaXRpb25dICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbkVuZFByZWZpeGVzW3RyYW5zaXRpb25dO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNyZWF0ZXMgdGhlIGRvdCBuYXZpZ2F0aW9uIGVsZW1lbnRzXHJcbiAgICAgICAgICogQHJldHVyblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVQZWVrRG90cygpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBmcmFnICAgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgICAgICAgICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYgPSBfY3JlYXRlRWxlbWVudCgnbmF2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdwZWVrLWRvdHMnXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA7IGkgPCBzbGlkZXNDb3VudDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc2V0IGluaXRpYWwgZG90IHdpdGggXCJkb3QtY3VycmVudFwiIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhbmNob3IuY2xhc3NOYW1lID0gKCBpID09PSBjdXJyZW50SW5kZXggKSA/ICdwZWVrLWRvdCBkb3QtY3VycmVudCc6ICdwZWVrLWRvdCc7XHJcbiAgICAgICAgICAgICAgICAvL3NldCB0byBmYWxzZSwgbm8gbmVlZCBmb3IgZGVlcCBjbG9uaW5nXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYuYXBwZW5kQ2hpbGQoYW5jaG9yLmNsb25lTm9kZShmYWxzZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZnJhZy5hcHBlbmRDaGlsZChkb3ROYXYpICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlcyB0aGUgbmV4dC9wcmV2IGJ1dHRvbnMgZm9yIHRoZSBzbGlkZXJcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVByZXZOZXh0QnRuKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyYWcgPSBfZWxlbWVudEZyYWcoXHJcbiAgICAgICAgICAgICAgICAgICAgX2NyZWF0ZUVsZW1lbnQoJ25hdicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdzbGlkZS1idG4tbmF2J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICksXHJcblxyXG4gICAgICAgICAgICAgICAgcHJldkJ0biAgID0gX2NyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3ByZXYtYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJyAgOiAnZGF0YS1kaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnIDogJ3ByZXZpb3VzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIG5leHRCdG4gICA9IF9jcmVhdGVFbGVtZW50KCdhJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICduZXh0LWJ0bicsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0QXR0cmlidXRlIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YScgIDogJ2RhdGEtZGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyA6ICduZXh0J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChwcmV2QnRuKTtcclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChuZXh0QnRuKTtcclxuICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIGZyYWcgKTtcclxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogYXBwZW5kcyBlbGVtZW50IHRvIGRvY3VtZW50IGZyYWdtZW50XG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gZWxlbWVudCA6IHRhcmdldCBlbGVtZW50IHRvIGFwcGVuZFxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgOiBkb2N1bWVudCBmcmFnbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2VsZW1lbnRGcmFnKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmcmFnLmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlIGFuIGVsZW1lbnQgd2l0aCBhZGRpdGlvbmFsIG9wdGlvbnMgbGlrZSBhZGRpbmcgY2xhc3NuYW1lc1xyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFnICAgIDogdGhlIHRhZyB0byBjcmVhdGVcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IG9wdGlvbiA6IG9wdGlvbnMgdG8gc2V0LCBhY2NvbW1vZGF0ZXMgY2xhc3NOYW1lIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgOiBlbGVtZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnQodGFnLCBvcHRpb24pIHtcclxuXHJcbiAgICAgICAgXHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgXHRpZiAob3B0aW9uKSB7XHJcbiAgICAgICAgXHRcdGlmICggb3B0aW9uLmNsYXNzTmFtZSApIGVsZW1lbnQuY2xhc3NOYW1lID0gb3B0aW9uLmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgIGlmICggb3B0aW9uLnNldEF0dHJpYnV0ZSApIGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbi5zZXRBdHRyaWJ1dGUuZGF0YSwgb3B0aW9uLnNldEF0dHJpYnV0ZS52YWx1ZSk7XHJcbiAgICAgICAgXHR9XHJcblxyXG4gICAgICAgIFx0cmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZ2V0IHRoZSBwYXJlbnQgZWxlbWVudCdzIGNoaWxkcmVuXHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBlbGVtZW50IDogdGFyZ2V0IGVsZW1lbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19IGFycmF5ICAgOiBhcnJheSBsaXN0IG9mIGNoaWxkIG5vZGVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldENoaWxkcmVuKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpID0gMCxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gW10sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbk5vZGVzID0gZWxlbWVudC5jaGlsZE5vZGVzLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpOyBpIDwgY2hpbGRyZW5Ob2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZHJlbk5vZGVzW2ldLm5vZGVUeXBlID09PSAxICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGRyZW5Ob2Rlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICAgICAgICAgIGluaXQgOiBpbml0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSh3aW5kb3csIGRvY3VtZW50KSk7XHJcbiJdfQ==
