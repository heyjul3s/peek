(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
            isAnimating = false,
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
            _setCurrentIndexElementClass(slides[lastIndex], slides[currentIndex], 'selected');
            // _setCurrentIndexElementClass( dots[lastIndex], dots[currentIndex], 'dot-current' );
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

                currentSelected.addEventListener(_applyTransitionEndPrefix(currentSelected), function callback(ev) {
                    if (ev.propertyName === 'transform' && currentSelected.classList.contains('animating')) {
                        currentSelected.classList.remove('animating');
                    }

                    if (lastSelected.classList.contains(klassname) && !currentSelected.classList.contains('animating')) {
                        lastSelected.classList.remove(klassname);
                        currentSelected.removeEventListener(_applyTransitionEndPrefix(currentSelected), callback, false);
                    }
                });

                // _removeLastIndexElementClass(lastSelected, currentSelected, klassname);
            }
        }

        /**
         * Used in lieu with _setCurrentIndexElementClass() to remove previous element class
         * @param  {[type]} targetSlide [description]
         * @return {[type]}             [description]
         */
        function _removeLastIndexElementClass(lastSelected, currentSelected, klassname) {}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0VBLENBQUUsV0FBUyxNQUFULEVBQWlCLFFBQWpCLEVBQTBCO0FBQ3hCOztBQUVBLGFBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFVBQVMsRUFBVCxFQUFZO0FBQ3RELFlBQUksT0FBTyxNQUFPLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFQLENBQVg7QUFDQSxhQUFLLElBQUw7QUFDSCxLQUhEOztBQUtBLGFBQVMsS0FBVCxDQUFlLE9BQWYsRUFBd0I7O0FBRXBCLFlBQUksU0FBZSxPQUFuQjtZQUNJLFNBQWUsTUFBTSxJQUFOLENBQVcsUUFBUSxnQkFBUixDQUF5QixRQUF6QixDQUFYLENBRG5CO1lBRUksY0FBZSxPQUFPLE1BRjFCO1lBR0ksZUFBZSxDQUhuQjtZQUlJLFlBQWUsQ0FKbkI7WUFLSSxjQUFlLEtBTG5CO1lBTUksb0JBTko7WUFPSSxlQVBKO1lBUUksYUFSSjs7O0FBWUEsWUFBSSx3QkFBd0I7QUFDeEIsZ0NBQXFCLHFCQURHO0FBRXJCLDZCQUFrQixlQUZHO0FBR3BCLDRCQUFpQixpQkFIRztBQUluQiwyQkFBZ0IsZ0JBSkc7QUFLbEIsMEJBQWU7QUFMRyxTQUE1Qjs7QUFTQSxpQkFBUyxJQUFULEdBQWdCOztBQUVaLGdCQUFLLGNBQWMsQ0FBbkIsRUFBdUI7QUFDbkI7QUFDSDs7QUFFRCxxQkFBYyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBZDtBQUNBLG1CQUFjLGFBQWEsTUFBYixDQUFkO0FBQ0EsMEJBQWMsU0FBUyxhQUFULENBQXVCLGdCQUF2QixDQUFkOztBQUVBLG1CQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVMsRUFBVCxFQUFZOztBQUV6QyxtQkFBRyxjQUFIOztBQUVBLG9CQUFJLFlBQVksR0FBRyxNQUFuQjtvQkFDSSxXQUFZLEdBQUcsT0FB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SUFBL0I7QUFDSDs7Ozs7OztBQVFELGlCQUFTLFlBQVQsQ0FBc0IsT0FBdEIsRUFBK0I7QUFDM0IsZ0JBQUksT0FBTyxTQUFTLHNCQUFULEVBQVg7QUFDQSxtQkFBTyxLQUFLLFdBQUwsQ0FBa0IsT0FBbEIsQ0FBUDtBQUNIOzs7Ozs7OztBQVNELGlCQUFTLGNBQVQsQ0FBd0IsR0FBeEIsRUFBNkIsTUFBN0IsRUFBcUM7O0FBRXBDLGdCQUFJLFVBQVUsU0FBUyxhQUFULENBQXVCLEdBQXZCLENBQWQ7O0FBRUEsZ0JBQUksTUFBSixFQUFZO0FBQ1gsb0JBQUssT0FBTyxTQUFaLEVBQXdCLFFBQVEsU0FBUixHQUFvQixPQUFPLFNBQTNCO0FBQ2xCLG9CQUFLLE9BQU8sWUFBWixFQUEyQixRQUFRLFlBQVIsQ0FBcUIsT0FBTyxZQUFQLENBQW9CLElBQXpDLEVBQStDLE9BQU8sWUFBUCxDQUFvQixLQUFuRTtBQUNqQzs7QUFFRCxtQkFBTyxPQUFQO0FBQ0E7Ozs7Ozs7QUFRRCxpQkFBUyxZQUFULENBQXNCLE9BQXRCLEVBQStCOztBQUUzQixnQkFBSSxJQUFJLENBQVI7Z0JBQ0ksV0FBVyxFQURmO2dCQUVJLGdCQUFnQixRQUFRLFVBRjVCO2dCQUdJLGNBSEo7O0FBS0EsaUJBQU0sQ0FBTixFQUFTLElBQUksY0FBYyxNQUEzQixFQUFtQyxLQUFLLENBQXhDLEVBQTJDO0FBQ3ZDLG9CQUFLLGNBQWMsQ0FBZCxFQUFpQixRQUFqQixLQUE4QixDQUFuQyxFQUF1QztBQUNuQyw2QkFBUyxJQUFULENBQWMsY0FBYyxDQUFkLENBQWQ7QUFDSDtBQUNKOztBQUVELG1CQUFPLFFBQVA7QUFDSDs7QUFHRCxlQUFPLE9BQU8sTUFBUCxDQUFjO0FBQ2pCLGtCQUFPO0FBRFUsU0FBZCxDQUFQO0FBSUg7QUFFSixDQXpSQyxFQXlSQSxNQXpSQSxFQXlSUSxRQXpSUixDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vVE9ETzogZW5zdXJlIHdoZW4gYW5pbWF0aW5nLCBubyBvdGhlciBldmVudHMgdG8gaW50ZXJmZXJlXHJcblxyXG47KGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgbGV0IHBlZWsgPSBfUGVlayggZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWsnKSApO1xyXG4gICAgICAgIHBlZWsuaW5pdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gX1BlZWsoZWxlbWVudCkge1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyICAgICAgID0gZWxlbWVudCxcclxuICAgICAgICAgICAgc2xpZGVzICAgICAgID0gQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpKSxcclxuICAgICAgICAgICAgc2xpZGVzQ291bnQgID0gc2xpZGVzLmxlbmd0aCxcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gMCxcclxuICAgICAgICAgICAgbGFzdEluZGV4ICAgID0gMCxcbiAgICAgICAgICAgIGlzQW5pbWF0aW5nICA9IGZhbHNlLFxyXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdixcclxuICAgICAgICAgICAgZG90TmF2LFxyXG4gICAgICAgICAgICBkb3RzO1xyXG5cclxuXHJcbiAgICAgICAgLy90cmFuc2l0aW9uZW5kIHByZWZpeFxyXG4gICAgICAgIGxldCB0cmFuc2l0aW9uRW5kUHJlZml4ZXMgPSB7XHJcbiAgICAgICAgICAgICdXZWJraXRUcmFuc2l0aW9uJyA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgJ01velRyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnLFxyXG4gICAgICAgICAgICAgICAgJ21zVHJhbnNpdGlvbicgOiAnTVNUcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAnT1RyYW5zaXRpb24nIDogJ29UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGRvdCBuYXYgYW5kIHByZXYvYnV0dG9uIGlmIG1vcmUgdGhhbiAxIHNsaWRlXHJcbiAgICAgICAgICAgIGlmICggc2xpZGVzQ291bnQgPiAxICkge1xyXG4gICAgICAgICAgICAgICAgX2NyZWF0ZU5hdkVsZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvdE5hdiAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWstZG90cycpO1xyXG4gICAgICAgICAgICBkb3RzICAgICAgICA9IF9nZXRDaGlsZHJlbihkb3ROYXYpO1xyXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZS1idG4tbmF2Jyk7XHJcblxyXG4gICAgICAgICAgICBkb3ROYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldil7XHJcblxyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RG90ID0gZXYudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdEluZGV4ICA9IFtdLmluZGV4T2YuY2FsbChkb3RzLCB0YXJnZXREb3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0RG90ID09PSB0aGlzKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBfZ290b1NsaWRlKGRvdEluZGV4LCBkb3RzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzbGlkZUJ0bk5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0QnRuICAgICAgPSBldi50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVEaXJlY3Rpb24gPSB0YXJnZXRCdG4uZGF0YXNldC5kaXJlY3Rpb247XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0YXJnZXRCdG4gPT09IHRoaXMpIHJldHVybjtcblxyXG5cclxuICAgICAgICAgICAgICAgIF9zbGlkZVRvRGlyZWN0aW9uKCBzbGlkZURpcmVjdGlvbiwgc2xpZGVzLCBkb3RzICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZSBhbGwgdGhlIG5lY2Vzc2FyeSBuYXZpZ2F0aW9uYWwgZWxlbWVudHNcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZU5hdkVsZW1lbnRzKCkge1xyXG4gICAgICAgICAgICBfY3JlYXRlUGVla0RvdHMoKTtcclxuICAgICAgICAgICAgX2NyZWF0ZVByZXZOZXh0QnRuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dvdG9TbGlkZSggaW5kZXgsIGRvdHMgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIGluZGV4ID09PSBjdXJyZW50SW5kZXggKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsYXN0SW5kZXggICAgPSBjdXJyZW50SW5kZXg7XHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICAgICAgX3NsaWRlKCBzbGlkZXMsIGRvdHMgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZXRlcm1pbmUgd2hpY2ggbmF2IGJ1dHRvbiBhbmQgc2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHNsaWRlRGlyZWN0aW9uIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfc2xpZGVUb0RpcmVjdGlvbiggc2xpZGVEaXJlY3Rpb24sIHNsaWRlcywgZG90cyApIHtcclxuXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcclxuXHJcbiAgICAgICAgICAgIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBjdXJyZW50SW5kZXggPCBzbGlkZXNDb3VudCAtIDEgKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICdwcmV2aW91cycgJiYgY3VycmVudEluZGV4ID4gMCApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfc2xpZGUoIHNsaWRlcywgZG90cyApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9zbGlkZSggc2xpZGVzLCBkb3RzICkge1xuICAgICAgICAgICAgX3NldEN1cnJlbnRJbmRleEVsZW1lbnRDbGFzcyggc2xpZGVzW2xhc3RJbmRleF0sIHNsaWRlc1tjdXJyZW50SW5kZXhdLCAnc2VsZWN0ZWQnICk7XHJcbiAgICAgICAgICAgIC8vIF9zZXRDdXJyZW50SW5kZXhFbGVtZW50Q2xhc3MoIGRvdHNbbGFzdEluZGV4XSwgZG90c1tjdXJyZW50SW5kZXhdLCAnZG90LWN1cnJlbnQnICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGFuZGxlcyBzbGlkZSBjbGFzc2VzIGZvciBzbGlkZSBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSB0YXJnZXRTbGlkZSBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX3NldEN1cnJlbnRJbmRleEVsZW1lbnRDbGFzcyggbGFzdFNlbGVjdGVkLCBjdXJyZW50U2VsZWN0ZWQsIGtsYXNzbmFtZSApIHtcbiAgICAgICAgICAgIGlmICggIWN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoa2xhc3NuYW1lKSApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuYWRkKGtsYXNzbmFtZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGluZycpO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLmFkZEV2ZW50TGlzdGVuZXIoIF9hcHBseVRyYW5zaXRpb25FbmRQcmVmaXgoY3VycmVudFNlbGVjdGVkKSwgZnVuY3Rpb24gY2FsbGJhY2soZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBldi5wcm9wZXJ0eU5hbWUgPT09ICd0cmFuc2Zvcm0nICYmIGN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW1hdGluZycpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGluZycpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBsYXN0U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKGtsYXNzbmFtZSkgJiYgIWN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW1hdGluZycpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoa2xhc3NuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RlZC5yZW1vdmVFdmVudExpc3RlbmVyKCBfYXBwbHlUcmFuc2l0aW9uRW5kUHJlZml4KGN1cnJlbnRTZWxlY3RlZCksIGNhbGxiYWNrLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBfcmVtb3ZlTGFzdEluZGV4RWxlbWVudENsYXNzKGxhc3RTZWxlY3RlZCwgY3VycmVudFNlbGVjdGVkLCBrbGFzc25hbWUpO1xyXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXNlZCBpbiBsaWV1IHdpdGggX3NldEN1cnJlbnRJbmRleEVsZW1lbnRDbGFzcygpIHRvIHJlbW92ZSBwcmV2aW91cyBlbGVtZW50IGNsYXNzXHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSB0YXJnZXRTbGlkZSBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUxhc3RJbmRleEVsZW1lbnRDbGFzcyggbGFzdFNlbGVjdGVkLCBjdXJyZW50U2VsZWN0ZWQsIGtsYXNzbmFtZSApIHtcbiAgICAgICAgfVxuXG5cclxuICAgICAgICBmdW5jdGlvbiBfYXBwbHlUcmFuc2l0aW9uRW5kUHJlZml4KCBlbGVtZW50ICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYW5zaXRpb247XHJcblxyXG4gICAgICAgICAgICAvL1RPRE86IHBvc3NpYmx5IGEgYmV0dGVyIG1ldGhvZCB0byBkbyB0aGlzXHJcbiAgICAgICAgICAgIGZvciAodHJhbnNpdGlvbiBpbiB0cmFuc2l0aW9uRW5kUHJlZml4ZXMpIHtcclxuICAgICAgICAgICAgICBpZiAoIGVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvbl0gIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uRW5kUHJlZml4ZXNbdHJhbnNpdGlvbl07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlcyB0aGUgZG90IG5hdmlnYXRpb24gZWxlbWVudHNcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVBlZWtEb3RzKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyYWcgICA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcclxuICAgICAgICAgICAgICAgIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKSxcclxuICAgICAgICAgICAgICAgIGRvdE5hdiA9IF9jcmVhdGVFbGVtZW50KCduYXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3BlZWstZG90cydcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgaSA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpIDsgaSA8IHNsaWRlc0NvdW50OyBpICs9IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9zZXQgaW5pdGlhbCBkb3Qgd2l0aCBcImRvdC1jdXJyZW50XCIgY2xhc3NcclxuICAgICAgICAgICAgICAgIGFuY2hvci5jbGFzc05hbWUgPSAoIGkgPT09IGN1cnJlbnRJbmRleCApID8gJ3BlZWstZG90IGRvdC1jdXJyZW50JzogJ3BlZWstZG90JztcclxuICAgICAgICAgICAgICAgIC8vc2V0IHRvIGZhbHNlLCBubyBuZWVkIGZvciBkZWVwIGNsb25pbmdcclxuICAgICAgICAgICAgICAgIGRvdE5hdi5hcHBlbmRDaGlsZChhbmNob3IuY2xvbmVOb2RlKGZhbHNlKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsaWRlci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKCBmcmFnLmFwcGVuZENoaWxkKGRvdE5hdikgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjcmVhdGVzIHRoZSBuZXh0L3ByZXYgYnV0dG9ucyBmb3IgdGhlIHNsaWRlclxyXG4gICAgICAgICAqIEByZXR1cm5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlUHJldk5leHRCdG4oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJhZyA9IF9lbGVtZW50RnJhZyhcclxuICAgICAgICAgICAgICAgICAgICBfY3JlYXRlRWxlbWVudCgnbmF2Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3NsaWRlLWJ0bi1uYXYnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuICAgPSBfY3JlYXRlRWxlbWVudCgnYScsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAncHJldi1idG4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZSA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnICA6ICdkYXRhLWRpcmVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScgOiAncHJldmlvdXMnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgbmV4dEJ0biAgID0gX2NyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ25leHQtYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJyAgOiAnZGF0YS1kaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnIDogJ25leHQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKHByZXZCdG4pO1xyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKG5leHRCdG4pO1xyXG4gICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZnJhZyApO1xyXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhcHBlbmRzIGVsZW1lbnQgdG8gZG9jdW1lbnQgZnJhZ21lbnRcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBlbGVtZW50IDogdGFyZ2V0IGVsZW1lbnQgdG8gYXBwZW5kXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICA6IGRvY3VtZW50IGZyYWdtZW50XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZWxlbWVudEZyYWcoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjcmVhdGUgYW4gZWxlbWVudCB3aXRoIGFkZGl0aW9uYWwgb3B0aW9ucyBsaWtlIGFkZGluZyBjbGFzc25hbWVzXHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSB0YWcgICAgOiB0aGUgdGFnIHRvIGNyZWF0ZVxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gb3B0aW9uIDogb3B0aW9ucyB0byBzZXQsIGFjY29tbW9kYXRlcyBjbGFzc05hbWUgYW5kIGF0dHJpYnV0ZXNcclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICA6IGVsZW1lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCh0YWcsIG9wdGlvbikge1xyXG5cclxuICAgICAgICBcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgICAgICBcdGlmIChvcHRpb24pIHtcclxuICAgICAgICBcdFx0aWYgKCBvcHRpb24uY2xhc3NOYW1lICkgZWxlbWVudC5jbGFzc05hbWUgPSBvcHRpb24uY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBvcHRpb24uc2V0QXR0cmlidXRlICkgZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLnNldEF0dHJpYnV0ZS5kYXRhLCBvcHRpb24uc2V0QXR0cmlidXRlLnZhbHVlKTtcclxuICAgICAgICBcdH1cclxuXHJcbiAgICAgICAgXHRyZXR1cm4gZWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXQgdGhlIHBhcmVudCBlbGVtZW50J3MgY2hpbGRyZW5cclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGVsZW1lbnQgOiB0YXJnZXQgZWxlbWVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gYXJyYXkgICA6IGFycmF5IGxpc3Qgb2YgY2hpbGQgbm9kZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0Q2hpbGRyZW4oZWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBbXSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuTm9kZXMgPSBlbGVtZW50LmNoaWxkTm9kZXMsXHJcbiAgICAgICAgICAgICAgICBjaGlsZDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIGk7IGkgPCBjaGlsZHJlbk5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkcmVuTm9kZXNbaV0ubm9kZVR5cGUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbk5vZGVzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgICAgICAgaW5pdCA6IGluaXRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KHdpbmRvdywgZG9jdW1lbnQpKTtcclxuIl19
