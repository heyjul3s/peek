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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFFLFdBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEwQjtBQUN4Qjs7QUFFQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxVQUFTLEVBQVQsRUFBWTtBQUN0RCxZQUFJLE9BQU8sTUFBTyxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUCxDQUFYO0FBQ0EsYUFBSyxJQUFMO0FBQ0gsS0FIRDs7QUFLQSxhQUFTLEtBQVQsQ0FBZSxPQUFmLEVBQXdCOztBQUVwQixZQUFJLFNBQWUsT0FBbkI7WUFDSSxTQUFlLE1BQU0sSUFBTixDQUFXLFFBQVEsZ0JBQVIsQ0FBeUIsUUFBekIsQ0FBWCxDQURuQjtZQUVJLGNBQWUsT0FBTyxNQUYxQjtZQUdJLGVBQWUsQ0FIbkI7WUFJSSxZQUFlLENBSm5CO1lBS0ksb0JBTEo7WUFNSSxlQU5KO1lBT0ksYUFQSjs7O0FBV0EsWUFBSSx3QkFBd0I7QUFDeEIsZ0NBQXFCLHFCQURHO0FBRXJCLDZCQUFrQixlQUZHO0FBR3BCLDRCQUFpQixpQkFIRztBQUluQiwyQkFBZ0IsZ0JBSkc7QUFLbEIsMEJBQWU7QUFMRyxTQUE1Qjs7QUFTQSxpQkFBUyxJQUFULEdBQWdCOztBQUVaLGdCQUFLLGNBQWMsQ0FBbkIsRUFBdUI7QUFDbkI7QUFDSDs7QUFFRCxxQkFBYyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBZDtBQUNBLG1CQUFjLGFBQWEsTUFBYixDQUFkO0FBQ0EsMEJBQWMsU0FBUyxhQUFULENBQXVCLGdCQUF2QixDQUFkOztBQUVBLG1CQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVMsRUFBVCxFQUFZOztBQUV6QyxtQkFBRyxjQUFIOztBQUVBLG9CQUFJLFlBQVksR0FBRyxNQUFuQjtvQkFDSSxXQUFZLEdBQUcsT0FBSCxDQUFXLElBQVgsQ0FBZ0Is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LCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiOyhmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgIGxldCBwZWVrID0gX1BlZWsoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZWVrJykgKTtcclxuICAgICAgICBwZWVrLmluaXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIF9QZWVrKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgbGV0IHNsaWRlciAgICAgICA9IGVsZW1lbnQsXHJcbiAgICAgICAgICAgIHNsaWRlcyAgICAgICA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGUnKSksXHJcbiAgICAgICAgICAgIHNsaWRlc0NvdW50ICA9IHNsaWRlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCAgICA9IDAsXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdixcclxuICAgICAgICAgICAgZG90TmF2LFxyXG4gICAgICAgICAgICBkb3RzO1xyXG5cclxuXHJcbiAgICAgICAgLy90cmFuc2l0aW9uZW5kIHByZWZpeFxyXG4gICAgICAgIGxldCB0cmFuc2l0aW9uRW5kUHJlZml4ZXMgPSB7XHJcbiAgICAgICAgICAgICdXZWJraXRUcmFuc2l0aW9uJyA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgJ01velRyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnLFxyXG4gICAgICAgICAgICAgICAgJ21zVHJhbnNpdGlvbicgOiAnTVNUcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAnT1RyYW5zaXRpb24nIDogJ29UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGRvdCBuYXYgYW5kIHByZXYvYnV0dG9uIGlmIG1vcmUgdGhhbiAxIHNsaWRlXHJcbiAgICAgICAgICAgIGlmICggc2xpZGVzQ291bnQgPiAxICkge1xyXG4gICAgICAgICAgICAgICAgX2NyZWF0ZU5hdkVsZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvdE5hdiAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWstZG90cycpO1xyXG4gICAgICAgICAgICBkb3RzICAgICAgICA9IF9nZXRDaGlsZHJlbihkb3ROYXYpO1xyXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZS1idG4tbmF2Jyk7XHJcblxyXG4gICAgICAgICAgICBkb3ROYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldil7XHJcblxyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RG90ID0gZXYudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdEluZGV4ICA9IFtdLmluZGV4T2YuY2FsbChkb3RzLCB0YXJnZXREb3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0RG90ID09PSB0aGlzKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBfZ290b1NsaWRlKGRvdEluZGV4LCBkb3RzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0QnRuICAgICAgPSBldi50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVEaXJlY3Rpb24gPSB0YXJnZXRCdG4uZGF0YXNldC5kaXJlY3Rpb247XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0YXJnZXRCdG4gPT09IHRoaXMpIHJldHVybjtcblxyXG5cclxuICAgICAgICAgICAgICAgIF9zbGlkZVRvRGlyZWN0aW9uKCBzbGlkZURpcmVjdGlvbiwgc2xpZGVzLCBkb3RzICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZSBhbGwgdGhlIG5lY2Vzc2FyeSBuYXZpZ2F0aW9uYWwgZWxlbWVudHNcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZU5hdkVsZW1lbnRzKCkge1xyXG4gICAgICAgICAgICBfY3JlYXRlUGVla0RvdHMoKTtcclxuICAgICAgICAgICAgX2NyZWF0ZVByZXZOZXh0QnRuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dvdG9TbGlkZSggaW5kZXgsIGRvdHMgKSB7XHJcbiAgICAgICAgICAgIGlmICggaW5kZXggPT09IGN1cnJlbnRJbmRleCApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCAgICA9IGN1cnJlbnRJbmRleDtcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgICBfc2xpZGUoIHNsaWRlcywgZG90cyApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERldGVybWluZSB3aGljaCBuYXYgYnV0dG9uIGFuZCBzbGlkZVxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gc2xpZGVEaXJlY3Rpb24gW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9zbGlkZVRvRGlyZWN0aW9uKCBzbGlkZURpcmVjdGlvbiwgc2xpZGVzLCBkb3RzICkge1xyXG5cclxuICAgICAgICAgICAgbGFzdEluZGV4ID0gY3VycmVudEluZGV4O1xyXG5cclxuICAgICAgICAgICAgaWYgKCBzbGlkZURpcmVjdGlvbiA9PT0gJ25leHQnICYmIGN1cnJlbnRJbmRleCA8IHNsaWRlc0NvdW50IC0gMSApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBzbGlkZURpcmVjdGlvbiA9PT0gJ3ByZXZpb3VzJyAmJiBjdXJyZW50SW5kZXggPiAwICkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIF9zbGlkZSggc2xpZGVzLCAnc2VsZWN0ZWQnICk7XHJcbiAgICAgICAgICAgIF9zbGlkZSggc2xpZGVzLCBkb3RzICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3NsaWRlKCBzbGlkZXMsIGRvdHMgKSB7XHJcbiAgICAgICAgICAgIF9zZXRDdXJyZW50SW5kZXhFbGVtZW50Q2xhc3MoIHNsaWRlc1tsYXN0SW5kZXhdLCBzbGlkZXNbY3VycmVudEluZGV4XSwgJ3NlbGVjdGVkJyApO1xuICAgICAgICAgICAgX3NldEN1cnJlbnRJbmRleEVsZW1lbnRDbGFzcyggZG90c1tsYXN0SW5kZXhdLCBkb3RzW2N1cnJlbnRJbmRleF0sICdkb3QtY3VycmVudCcgKTtcbiAgICAgICAgfVxyXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlcyBzbGlkZSBjbGFzc2VzIGZvciBzbGlkZSBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSB0YXJnZXRTbGlkZSBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX3NldEN1cnJlbnRJbmRleEVsZW1lbnRDbGFzcyggbGFzdFNlbGVjdGVkLCBjdXJyZW50U2VsZWN0ZWQsIGtsYXNzbmFtZSApIHtcbiAgICAgICAgICAgIGlmICggIWN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoa2xhc3NuYW1lKSApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmFkZChrbGFzc25hbWUpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuYWRkKCdhbmltYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIF9yZW1vdmVMYXN0SW5kZXhFbGVtZW50Q2xhc3MobGFzdFNlbGVjdGVkLCBjdXJyZW50U2VsZWN0ZWQsIGtsYXNzbmFtZSk7XHJcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVc2VkIGluIGxpZXUgd2l0aCBfc2V0Q3VycmVudEluZGV4RWxlbWVudENsYXNzKCkgdG8gcmVtb3ZlIHByZXZpb3VzIGVsZW1lbnQgY2xhc3NcclxuICAgICAgICAgKiBhbmQgdGhlbiBoYWx0IHRyYW5zaXRpb25lbmQgZXZlbnRzIGJ5IHJlbW92aW5nIGl0XHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSB0YXJnZXRTbGlkZSBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUxhc3RJbmRleEVsZW1lbnRDbGFzcyggbGFzdFNlbGVjdGVkLCBjdXJyZW50U2VsZWN0ZWQsIGtsYXNzbmFtZSApIHtcbiAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RlZC5hZGRFdmVudExpc3RlbmVyKCBfYXBwbHlUcmFuc2l0aW9uRW5kUHJlZml4KGN1cnJlbnRTZWxlY3RlZCksIGZ1bmN0aW9uIGNhbGxiYWNrKGV2KSB7XG4gICAgICAgICAgICAgICAgaWYgKCBldi5wcm9wZXJ0eU5hbWUgPT09ICd0cmFuc2Zvcm0nICYmIGN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW1hdGluZycpICkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW5nJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCBsYXN0U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKGtsYXNzbmFtZSkgJiYgIWN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW1hdGluZycpICkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZShrbGFzc25hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQucmVtb3ZlRXZlbnRMaXN0ZW5lciggX2FwcGx5VHJhbnNpdGlvbkVuZFByZWZpeChjdXJyZW50U2VsZWN0ZWQpLCBjYWxsYmFjaywgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cclxuICAgICAgICBmdW5jdGlvbiBfYXBwbHlUcmFuc2l0aW9uRW5kUHJlZml4KCBlbGVtZW50ICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYW5zaXRpb247XHJcblxyXG4gICAgICAgICAgICAvL1RPRE86IHBvc3NpYmx5IGEgYmV0dGVyIG1ldGhvZCB0byBkbyB0aGlzXHJcbiAgICAgICAgICAgIGZvciAodHJhbnNpdGlvbiBpbiB0cmFuc2l0aW9uRW5kUHJlZml4ZXMpIHtcclxuICAgICAgICAgICAgICBpZiAoIGVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvbl0gIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uRW5kUHJlZml4ZXNbdHJhbnNpdGlvbl07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlcyB0aGUgZG90IG5hdmlnYXRpb24gZWxlbWVudHNcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVBlZWtEb3RzKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyYWcgICA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcclxuICAgICAgICAgICAgICAgIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKSxcclxuICAgICAgICAgICAgICAgIGRvdE5hdiA9IF9jcmVhdGVFbGVtZW50KCduYXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3BlZWstZG90cydcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgaSA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpIDsgaSA8IHNsaWRlc0NvdW50OyBpICs9IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9zZXQgaW5pdGlhbCBkb3Qgd2l0aCBcImRvdC1jdXJyZW50XCIgY2xhc3NcclxuICAgICAgICAgICAgICAgIGFuY2hvci5jbGFzc05hbWUgPSAoIGkgPT09IGN1cnJlbnRJbmRleCApID8gJ3BlZWstZG90IGRvdC1jdXJyZW50JzogJ3BlZWstZG90JztcclxuICAgICAgICAgICAgICAgIC8vc2V0IHRvIGZhbHNlLCBubyBuZWVkIGZvciBkZWVwIGNsb25pbmdcclxuICAgICAgICAgICAgICAgIGRvdE5hdi5hcHBlbmRDaGlsZChhbmNob3IuY2xvbmVOb2RlKGZhbHNlKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsaWRlci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKCBmcmFnLmFwcGVuZENoaWxkKGRvdE5hdikgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjcmVhdGVzIHRoZSBuZXh0L3ByZXYgYnV0dG9ucyBmb3IgdGhlIHNsaWRlclxyXG4gICAgICAgICAqIEByZXR1cm5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlUHJldk5leHRCdG4oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJhZyA9IF9lbGVtZW50RnJhZyhcclxuICAgICAgICAgICAgICAgICAgICBfY3JlYXRlRWxlbWVudCgnbmF2Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3NsaWRlLWJ0bi1uYXYnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuICAgPSBfY3JlYXRlRWxlbWVudCgnYScsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAncHJldi1idG4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZSA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnICA6ICdkYXRhLWRpcmVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScgOiAncHJldmlvdXMnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgbmV4dEJ0biAgID0gX2NyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ25leHQtYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJyAgOiAnZGF0YS1kaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnIDogJ25leHQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKHByZXZCdG4pO1xyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKG5leHRCdG4pO1xyXG4gICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZnJhZyApO1xyXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhcHBlbmRzIGVsZW1lbnQgdG8gZG9jdW1lbnQgZnJhZ21lbnRcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBlbGVtZW50IDogdGFyZ2V0IGVsZW1lbnQgdG8gYXBwZW5kXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICA6IGRvY3VtZW50IGZyYWdtZW50XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZWxlbWVudEZyYWcoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjcmVhdGUgYW4gZWxlbWVudCB3aXRoIGFkZGl0aW9uYWwgb3B0aW9ucyBsaWtlIGFkZGluZyBjbGFzc25hbWVzXHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSB0YWcgICAgOiB0aGUgdGFnIHRvIGNyZWF0ZVxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gb3B0aW9uIDogb3B0aW9ucyB0byBzZXQsIGFjY29tbW9kYXRlcyBjbGFzc05hbWUgYW5kIGF0dHJpYnV0ZXNcclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICA6IGVsZW1lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCh0YWcsIG9wdGlvbikge1xyXG5cclxuICAgICAgICBcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgICAgICBcdGlmIChvcHRpb24pIHtcclxuICAgICAgICBcdFx0aWYgKCBvcHRpb24uY2xhc3NOYW1lICkgZWxlbWVudC5jbGFzc05hbWUgPSBvcHRpb24uY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBvcHRpb24uc2V0QXR0cmlidXRlICkgZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLnNldEF0dHJpYnV0ZS5kYXRhLCBvcHRpb24uc2V0QXR0cmlidXRlLnZhbHVlKTtcclxuICAgICAgICBcdH1cclxuXHJcbiAgICAgICAgXHRyZXR1cm4gZWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXQgdGhlIHBhcmVudCBlbGVtZW50J3MgY2hpbGRyZW5cclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGVsZW1lbnQgOiB0YXJnZXQgZWxlbWVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gYXJyYXkgICA6IGFycmF5IGxpc3Qgb2YgY2hpbGQgbm9kZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0Q2hpbGRyZW4oZWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBbXSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuTm9kZXMgPSBlbGVtZW50LmNoaWxkTm9kZXMsXHJcbiAgICAgICAgICAgICAgICBjaGlsZDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIGk7IGkgPCBjaGlsZHJlbk5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkcmVuTm9kZXNbaV0ubm9kZVR5cGUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbk5vZGVzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgICAgICAgaW5pdCA6IGluaXRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KHdpbmRvdywgZG9jdW1lbnQpKTtcclxuIl19
