(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
                // if at last slide, reset to first index
            } else if (slideDirection === 'next' && currentIndex > slidesCount - 2) {
                    currentIndex = 0;
                    // if at firt slide, set to last index
                } else if (slideDirection === 'previous' && currentIndex < slidesCount - 2) {
                        currentIndex = slidesCount - 1;
                    }

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
         * and then halt transitionend events by removing it otherwise it will continue
         * to run through every event
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFFLFdBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEwQjtBQUN4Qjs7QUFFQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxVQUFTLEVBQVQsRUFBWTtBQUN0RCxZQUFJLE9BQU8sTUFBTyxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUCxDQUFYO0FBQ0EsYUFBSyxJQUFMO0FBQ0gsS0FIRDs7QUFLQSxhQUFTLEtBQVQsQ0FBZSxPQUFmLEVBQXdCOztBQUVwQixZQUFJLFNBQWUsT0FBbkI7WUFDSSxTQUFlLE1BQU0sSUFBTixDQUFXLFFBQVEsZ0JBQVIsQ0FBeUIsUUFBekIsQ0FBWCxDQURuQjtZQUVJLGNBQWUsT0FBTyxNQUYxQjtZQUdJLGVBQWUsQ0FIbkI7WUFJSSxZQUFlLENBSm5CO1lBS0ksb0JBTEo7WUFNSSxlQU5KO1lBT0ksYUFQSjs7O0FBV0EsWUFBSSx3QkFBd0I7QUFDeEIsZ0NBQXFCLHFCQURHO0FBRXJCLDZCQUFrQixlQUZHO0FBR3BCLDRCQUFpQixpQkFIRztBQUluQiwyQkFBZ0IsZ0JBSkc7QUFLbEIsMEJBQWU7QUFMRyxTQUE1Qjs7QUFTQSxpQkFBUyxJQUFULEdBQWdCOztBQUVaLGdCQUFLLGNBQWMsQ0FBbkIsRUFBdUI7QUFDbkI7QUFDSDs7QUFFRCxxQkFBYyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBZDtBQUNBLG1CQUFjLGFBQWEsTUFBYixDQUFkO0FBQ0EsMEJBQWMsU0FBUyxhQUFULENBQXVCLGdCQUF2QixDQUFkOztBQUVBLG1CQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVMsRUFBVCxFQUFZOztBQUV6QyxtQkFBRyxjQUFIOztBQUVBLG9CQUFJLFlBQVksR0FBRyxNQUFuQjtvQkFDSSxXQUFZLEdBQUcsT0FBSCxDQUFXLElBQVgsQ0FBZ0Is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O0FBQ25DLDZCQUFTLElBQVQsQ0FBYyxjQUFjLENBQWQsQ0FBZDtBQUNIO0FBQ0o7O0FBRUQsbUJBQU8sUUFBUDtBQUNIOztBQUdELGVBQU8sT0FBTyxNQUFQLENBQWM7QUFDakIsa0JBQU87QUFEVSxTQUFkLENBQVA7QUFJSDtBQUVKLENBL1JDLEVBK1JBLE1BL1JBLEVBK1JRLFFBL1JSLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiOyhmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgIGxldCBwZWVrID0gX1BlZWsoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZWVrJykgKTtcclxuICAgICAgICBwZWVrLmluaXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIF9QZWVrKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlciAgICAgICA9IGVsZW1lbnQsXHJcbiAgICAgICAgICAgIHNsaWRlcyAgICAgICA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGUnKSksXHJcbiAgICAgICAgICAgIHNsaWRlc0NvdW50ICA9IHNsaWRlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCAgICA9IDAsXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdixcclxuICAgICAgICAgICAgZG90TmF2LFxyXG4gICAgICAgICAgICBkb3RzO1xyXG5cclxuXHJcbiAgICAgICAgLy90cmFuc2l0aW9uZW5kIHByZWZpeFxyXG4gICAgICAgIGxldCB0cmFuc2l0aW9uRW5kUHJlZml4ZXMgPSB7XHJcbiAgICAgICAgICAgICdXZWJraXRUcmFuc2l0aW9uJyA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgJ01velRyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnLFxyXG4gICAgICAgICAgICAgICAgJ21zVHJhbnNpdGlvbicgOiAnTVNUcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAnT1RyYW5zaXRpb24nIDogJ29UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGRvdCBuYXYgYW5kIHByZXYvYnV0dG9uIGlmIG1vcmUgdGhhbiAxIHNsaWRlXHJcbiAgICAgICAgICAgIGlmICggc2xpZGVzQ291bnQgPiAxICkge1xyXG4gICAgICAgICAgICAgICAgX2NyZWF0ZU5hdkVsZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvdE5hdiAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWstZG90cycpO1xyXG4gICAgICAgICAgICBkb3RzICAgICAgICA9IF9nZXRDaGlsZHJlbihkb3ROYXYpO1xyXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZS1idG4tbmF2Jyk7XHJcblxyXG4gICAgICAgICAgICBkb3ROYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldil7XHJcblxyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RG90ID0gZXYudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdEluZGV4ICA9IFtdLmluZGV4T2YuY2FsbChkb3RzLCB0YXJnZXREb3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0RG90ID09PSB0aGlzKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBfZ290b1NsaWRlKGRvdEluZGV4LCBkb3RzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0QnRuICAgICAgPSBldi50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVEaXJlY3Rpb24gPSB0YXJnZXRCdG4uZGF0YXNldC5kaXJlY3Rpb247XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0YXJnZXRCdG4gPT09IHRoaXMpIHJldHVybjtcblxyXG5cclxuICAgICAgICAgICAgICAgIF9zbGlkZVRvRGlyZWN0aW9uKCBzbGlkZURpcmVjdGlvbiwgc2xpZGVzLCBkb3RzICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZSBhbGwgdGhlIG5lY2Vzc2FyeSBuYXZpZ2F0aW9uYWwgZWxlbWVudHNcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZU5hdkVsZW1lbnRzKCkge1xyXG4gICAgICAgICAgICBfY3JlYXRlUGVla0RvdHMoKTtcclxuICAgICAgICAgICAgX2NyZWF0ZVByZXZOZXh0QnRuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dvdG9TbGlkZSggaW5kZXgsIGRvdHMgKSB7XHJcbiAgICAgICAgICAgIGlmICggaW5kZXggPT09IGN1cnJlbnRJbmRleCApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCAgICA9IGN1cnJlbnRJbmRleDtcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgICBfc2xpZGUoIHNsaWRlcywgZG90cyApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERldGVybWluZSB3aGljaCBuYXYgYnV0dG9uIGFuZCBzbGlkZVxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gc2xpZGVEaXJlY3Rpb24gW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9zbGlkZVRvRGlyZWN0aW9uKCBzbGlkZURpcmVjdGlvbiwgc2xpZGVzLCBkb3RzICkge1xyXG5cclxuICAgICAgICAgICAgbGFzdEluZGV4ID0gY3VycmVudEluZGV4O1xyXG5cclxuICAgICAgICAgICAgaWYgKCBzbGlkZURpcmVjdGlvbiA9PT0gJ25leHQnICYmIGN1cnJlbnRJbmRleCA8IHNsaWRlc0NvdW50IC0gMSApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBzbGlkZURpcmVjdGlvbiA9PT0gJ3ByZXZpb3VzJyAmJiBjdXJyZW50SW5kZXggPiAwICkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XHJcbiAgICAgICAgICAgIC8vIGlmIGF0IGxhc3Qgc2xpZGUsIHJlc2V0IHRvIGZpcnN0IGluZGV4XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHNsaWRlRGlyZWN0aW9uID09PSAnbmV4dCcgJiYgY3VycmVudEluZGV4ID4gc2xpZGVzQ291bnQgLSAyICkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgLy8gaWYgYXQgZmlydCBzbGlkZSwgc2V0IHRvIGxhc3QgaW5kZXhcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICdwcmV2aW91cycgJiYgY3VycmVudEluZGV4IDwgc2xpZGVzQ291bnQgLSAyICkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gIHNsaWRlc0NvdW50IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX3NsaWRlKCBzbGlkZXMsIGRvdHMgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc2xpZGUoIHNsaWRlcywgZG90cyApIHtcclxuICAgICAgICAgICAgX3NldEN1cnJlbnRJbmRleEVsZW1lbnRDbGFzcyggc2xpZGVzW2xhc3RJbmRleF0sIHNsaWRlc1tjdXJyZW50SW5kZXhdLCAnc2VsZWN0ZWQnICk7XG4gICAgICAgICAgICBfc2V0Q3VycmVudEluZGV4RWxlbWVudENsYXNzKCBkb3RzW2xhc3RJbmRleF0sIGRvdHNbY3VycmVudEluZGV4XSwgJ2RvdC1jdXJyZW50JyApO1xuICAgICAgICB9XHJcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGVzIHNsaWRlIGNsYXNzZXMgZm9yIHNsaWRlIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHRhcmdldFNsaWRlIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfc2V0Q3VycmVudEluZGV4RWxlbWVudENsYXNzKCBsYXN0U2VsZWN0ZWQsIGN1cnJlbnRTZWxlY3RlZCwga2xhc3NuYW1lICkge1xuXG4gICAgICAgICAgICBpZiAoICFjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKGtsYXNzbmFtZSkgKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLmNsYXNzTGlzdC5hZGQoa2xhc3NuYW1lKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW5nJyk7XG5cbiAgICAgICAgICAgICAgICBfcmVtb3ZlTGFzdEluZGV4RWxlbWVudENsYXNzKGxhc3RTZWxlY3RlZCwgY3VycmVudFNlbGVjdGVkLCBrbGFzc25hbWUpO1xyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVc2VkIGluIGxpZXUgd2l0aCBfc2V0Q3VycmVudEluZGV4RWxlbWVudENsYXNzKCkgdG8gcmVtb3ZlIHByZXZpb3VzIGVsZW1lbnQgY2xhc3NcclxuICAgICAgICAgKiBhbmQgdGhlbiBoYWx0IHRyYW5zaXRpb25lbmQgZXZlbnRzIGJ5IHJlbW92aW5nIGl0IG90aGVyd2lzZSBpdCB3aWxsIGNvbnRpbnVlXHJcbiAgICAgICAgICogdG8gcnVuIHRocm91Z2ggZXZlcnkgZXZlbnRcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHRhcmdldFNsaWRlIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfcmVtb3ZlTGFzdEluZGV4RWxlbWVudENsYXNzKCBsYXN0U2VsZWN0ZWQsIGN1cnJlbnRTZWxlY3RlZCwga2xhc3NuYW1lICkge1xuXG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuYWRkRXZlbnRMaXN0ZW5lciggX2FwcGx5VHJhbnNpdGlvbkVuZFByZWZpeChjdXJyZW50U2VsZWN0ZWQpLCBmdW5jdGlvbiBjYWxsYmFjayhldikge1xuICAgICAgICAgICAgICAgIGlmICggZXYucHJvcGVydHlOYW1lID09PSAndHJhbnNmb3JtJyAmJiBjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhbmltYXRpbmcnKSApIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGluZycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggbGFzdFNlbGVjdGVkLmNsYXNzTGlzdC5jb250YWlucyhrbGFzc25hbWUpICYmICFjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhbmltYXRpbmcnKSApIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoa2xhc3NuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLnJlbW92ZUV2ZW50TGlzdGVuZXIoIF9hcHBseVRyYW5zaXRpb25FbmRQcmVmaXgoY3VycmVudFNlbGVjdGVkKSwgY2FsbGJhY2ssIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2FwcGx5VHJhbnNpdGlvbkVuZFByZWZpeCggZWxlbWVudCApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmFuc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgLy9UT0RPOiBwb3NzaWJseSBhIGJldHRlciBtZXRob2QgdG8gZG8gdGhpc1xyXG4gICAgICAgICAgICBmb3IgKHRyYW5zaXRpb24gaW4gdHJhbnNpdGlvbkVuZFByZWZpeGVzKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCBlbGVtZW50LnN0eWxlW3RyYW5zaXRpb25dICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbkVuZFByZWZpeGVzW3RyYW5zaXRpb25dO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNyZWF0ZXMgdGhlIGRvdCBuYXZpZ2F0aW9uIGVsZW1lbnRzXHJcbiAgICAgICAgICogQHJldHVyblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVQZWVrRG90cygpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBmcmFnICAgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgICAgICAgICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYgPSBfY3JlYXRlRWxlbWVudCgnbmF2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdwZWVrLWRvdHMnXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA7IGkgPCBzbGlkZXNDb3VudDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc2V0IGluaXRpYWwgZG90IHdpdGggXCJkb3QtY3VycmVudFwiIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhbmNob3IuY2xhc3NOYW1lID0gKCBpID09PSBjdXJyZW50SW5kZXggKSA/ICdwZWVrLWRvdCBkb3QtY3VycmVudCc6ICdwZWVrLWRvdCc7XHJcbiAgICAgICAgICAgICAgICAvL3NldCB0byBmYWxzZSwgbm8gbmVlZCBmb3IgZGVlcCBjbG9uaW5nXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYuYXBwZW5kQ2hpbGQoYW5jaG9yLmNsb25lTm9kZShmYWxzZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZnJhZy5hcHBlbmRDaGlsZChkb3ROYXYpICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlcyB0aGUgbmV4dC9wcmV2IGJ1dHRvbnMgZm9yIHRoZSBzbGlkZXJcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVByZXZOZXh0QnRuKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyYWcgPSBfZWxlbWVudEZyYWcoXHJcbiAgICAgICAgICAgICAgICAgICAgX2NyZWF0ZUVsZW1lbnQoJ25hdicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdzbGlkZS1idG4tbmF2J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICksXHJcblxyXG4gICAgICAgICAgICAgICAgcHJldkJ0biAgID0gX2NyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3ByZXYtYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJyAgOiAnZGF0YS1kaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnIDogJ3ByZXZpb3VzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIG5leHRCdG4gICA9IF9jcmVhdGVFbGVtZW50KCdhJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICduZXh0LWJ0bicsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0QXR0cmlidXRlIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YScgIDogJ2RhdGEtZGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyA6ICduZXh0J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChwcmV2QnRuKTtcclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChuZXh0QnRuKTtcclxuICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIGZyYWcgKTtcclxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogYXBwZW5kcyBlbGVtZW50IHRvIGRvY3VtZW50IGZyYWdtZW50XG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gZWxlbWVudCA6IHRhcmdldCBlbGVtZW50IHRvIGFwcGVuZFxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgOiBkb2N1bWVudCBmcmFnbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2VsZW1lbnRGcmFnKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmcmFnLmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlIGFuIGVsZW1lbnQgd2l0aCBhZGRpdGlvbmFsIG9wdGlvbnMgbGlrZSBhZGRpbmcgY2xhc3NuYW1lc1xyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFnICAgIDogdGhlIHRhZyB0byBjcmVhdGVcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IG9wdGlvbiA6IG9wdGlvbnMgdG8gc2V0LCBhY2NvbW1vZGF0ZXMgY2xhc3NOYW1lIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgOiBlbGVtZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnQodGFnLCBvcHRpb24pIHtcclxuXHJcbiAgICAgICAgXHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgXHRpZiAob3B0aW9uKSB7XHJcbiAgICAgICAgXHRcdGlmICggb3B0aW9uLmNsYXNzTmFtZSApIGVsZW1lbnQuY2xhc3NOYW1lID0gb3B0aW9uLmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgIGlmICggb3B0aW9uLnNldEF0dHJpYnV0ZSApIGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbi5zZXRBdHRyaWJ1dGUuZGF0YSwgb3B0aW9uLnNldEF0dHJpYnV0ZS52YWx1ZSk7XHJcbiAgICAgICAgXHR9XHJcblxyXG4gICAgICAgIFx0cmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZ2V0IHRoZSBwYXJlbnQgZWxlbWVudCdzIGNoaWxkcmVuXHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBlbGVtZW50IDogdGFyZ2V0IGVsZW1lbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19IGFycmF5ICAgOiBhcnJheSBsaXN0IG9mIGNoaWxkIG5vZGVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldENoaWxkcmVuKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpID0gMCxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gW10sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbk5vZGVzID0gZWxlbWVudC5jaGlsZE5vZGVzLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpOyBpIDwgY2hpbGRyZW5Ob2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZHJlbk5vZGVzW2ldLm5vZGVUeXBlID09PSAxICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGRyZW5Ob2Rlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICAgICAgICAgIGluaXQgOiBpbml0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSh3aW5kb3csIGRvY3VtZW50KSk7XHJcbiJdfQ==
