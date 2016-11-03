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
                dotNav = _createElement('nav', {
                className: 'peek-dots'
            }),
                i = 0,
                anchor = void 0,
                span = void 0;

            for (i; i < slidesCount; i += 1) {
                anchor = document.createElement('a');
                span = document.createElement('span');

                //set initial dot with "dot-current" class
                anchor.className = i === currentIndex ? 'peek-dot dot-current' : 'peek-dot';
                span.className = 'highlight';

                anchor.appendChild(span);
                dotNav.appendChild(anchor.cloneNode(true));
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
                prevBtnSpan = _createElement('span', {
                className: 'prev-btn-overlay'
            }),
                nextBtn = _createElement('a', {
                className: 'next-btn',
                setAttribute: {
                    'data': 'data-direction',
                    'value': 'next'
                }
            }),
                nextBtnSpan = _createElement('span', {
                className: 'next-btn-overlay'
            });

            prevBtn.appendChild(prevBtnSpan);
            nextBtn.appendChild(nextBtnSpan);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFFLFdBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEwQjtBQUN4Qjs7QUFFQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxVQUFTLEVBQVQsRUFBWTtBQUN0RCxZQUFJLE9BQU8sTUFBTyxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUCxDQUFYO0FBQ0EsYUFBSyxJQUFMO0FBQ0gsS0FIRDs7QUFLQSxhQUFTLEtBQVQsQ0FBZSxPQUFmLEVBQXdCOztBQUVwQixZQUFJLFNBQWUsT0FBbkI7WUFDSSxTQUFlLE1BQU0sSUFBTixDQUFXLFFBQVEsZ0JBQVIsQ0FBeUIsUUFBekIsQ0FBWCxDQURuQjtZQUVJLGNBQWUsT0FBTyxNQUYxQjtZQUdJLGVBQWUsQ0FIbkI7WUFJSSxZQUFlLENBSm5CO1lBS0ksb0JBTEo7WUFNSSxlQU5KO1lBT0ksYUFQSjs7O0FBV0EsWUFBSSx3QkFBd0I7QUFDeEIsZ0NBQXFCLHFCQURHO0FBRXJCLDZCQUFrQixlQUZHO0FBR3BCLDRCQUFpQixpQkFIRztBQUluQiwyQkFBZ0IsZ0JBSkc7QUFLbEIsMEJBQWU7QUFMRyxTQUE1Qjs7QUFTQSxpQkFBUyxJQUFULEdBQWdCOztBQUVaLGdCQUFLLGNBQWMsQ0FBbkIsRUFBdUI7QUFDbkI7QUFDSDs7QUFFRCxxQkFBYyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBZDtBQUNBLG1CQUFjLGFBQWEsTUFBYixDQUFkO0FBQ0EsMEJBQWMsU0FBUyxhQUFULENBQXVCLGdCQUF2QixDQUFkOztBQUVBLG1CQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFVBQVMsRUFBVCxFQUFZOztBQUV6QyxtQkFBRyxjQUFIOztBQUVBLG9CQUFJLFlBQVksR0FBRyxNQUFuQjtvQkFDSSxXQUFZLEdBQUcsT0FBSCxDQUFXLElBQVgsQ0FBZ0Is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O0FBRUQsbUJBQU8sT0FBUDtBQUNBOzs7Ozs7O0FBUUQsaUJBQVMsWUFBVCxDQUFzQixPQUF0QixFQUErQjs7QUFFM0IsZ0JBQUksSUFBSSxDQUFSO2dCQUNJLFdBQVcsRUFEZjtnQkFFSSxnQkFBZ0IsUUFBUSxVQUY1QjtnQkFHSSxjQUhKOztBQUtBLGlCQUFNLENBQU4sRUFBUyxJQUFJLGNBQWMsTUFBM0IsRUFBbUMsS0FBSyxDQUF4QyxFQUEyQztBQUN2QyxvQkFBSyxjQUFjLENBQWQsRUFBaUIsUUFBakIsS0FBOEIsQ0FBbkMsRUFBdUM7QUFDbkMsNkJBQVMsSUFBVCxDQUFjLGNBQWMsQ0FBZCxDQUFkO0FBQ0g7QUFDSjs7QUFFRCxtQkFBTyxRQUFQO0FBQ0g7O0FBR0QsZUFBTyxPQUFPLE1BQVAsQ0FBYztBQUNqQixrQkFBTztBQURVLFNBQWQsQ0FBUDtBQUlIO0FBRUosQ0E3U0MsRUE2U0EsTUE3U0EsRUE2U1EsUUE3U1IsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCI7KGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgbGV0IHBlZWsgPSBfUGVlayggZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWsnKSApO1xyXG4gICAgICAgIHBlZWsuaW5pdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gX1BlZWsoZWxlbWVudCkge1xyXG5cclxuICAgICAgICBsZXQgc2xpZGVyICAgICAgID0gZWxlbWVudCxcclxuICAgICAgICAgICAgc2xpZGVzICAgICAgID0gQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpKSxcclxuICAgICAgICAgICAgc2xpZGVzQ291bnQgID0gc2xpZGVzLmxlbmd0aCxcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gMCxcclxuICAgICAgICAgICAgbGFzdEluZGV4ICAgID0gMCxcbiAgICAgICAgICAgIHNsaWRlQnRuTmF2LFxyXG4gICAgICAgICAgICBkb3ROYXYsXHJcbiAgICAgICAgICAgIGRvdHM7XHJcblxyXG5cclxuICAgICAgICAvL3RyYW5zaXRpb25lbmQgcHJlZml4XHJcbiAgICAgICAgbGV0IHRyYW5zaXRpb25FbmRQcmVmaXhlcyA9IHtcclxuICAgICAgICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAnTW96VHJhbnNpdGlvbicgOiAndHJhbnNpdGlvbmVuZCcsXHJcbiAgICAgICAgICAgICAgICAnbXNUcmFuc2l0aW9uJyA6ICdNU1RyYW5zaXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgICdPVHJhbnNpdGlvbicgOiAnb1RyYW5zaXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbicgOiAndHJhbnNpdGlvbmVuZCdcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgLy9jcmVhdGUgZG90IG5hdiBhbmQgcHJldi9idXR0b24gaWYgbW9yZSB0aGFuIDEgc2xpZGVcclxuICAgICAgICAgICAgaWYgKCBzbGlkZXNDb3VudCA+IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBfY3JlYXRlTmF2RWxlbWVudHMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZG90TmF2ICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVlay1kb3RzJyk7XHJcbiAgICAgICAgICAgIGRvdHMgICAgICAgID0gX2dldENoaWxkcmVuKGRvdE5hdik7XHJcbiAgICAgICAgICAgIHNsaWRlQnRuTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlLWJ0bi1uYXYnKTtcclxuXHJcbiAgICAgICAgICAgIGRvdE5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcclxuXHJcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXREb3QgPSBldi50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZG90SW5kZXggID0gW10uaW5kZXhPZi5jYWxsKGRvdHMsIHRhcmdldERvdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0YXJnZXREb3QgPT09IHRoaXMpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIF9nb3RvU2xpZGUoZG90SW5kZXgsIGRvdHMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlQnRuTmF2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRCdG4gICAgICA9IGV2LnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZURpcmVjdGlvbiA9IHRhcmdldEJ0bi5kYXRhc2V0LmRpcmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRhcmdldEJ0biA9PT0gdGhpcykgcmV0dXJuO1xuXHJcblxyXG4gICAgICAgICAgICAgICAgX3NsaWRlVG9EaXJlY3Rpb24oIHNsaWRlRGlyZWN0aW9uLCBzbGlkZXMsIGRvdHMgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlIGFsbCB0aGUgbmVjZXNzYXJ5IG5hdmlnYXRpb25hbCBlbGVtZW50c1xyXG4gICAgICAgICAqIEByZXR1cm5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlTmF2RWxlbWVudHMoKSB7XHJcbiAgICAgICAgICAgIF9jcmVhdGVQZWVrRG90cygpO1xyXG4gICAgICAgICAgICBfY3JlYXRlUHJldk5leHRCdG4oKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ290b1NsaWRlKCBpbmRleCwgZG90cyApIHtcclxuICAgICAgICAgICAgaWYgKCBpbmRleCA9PT0gY3VycmVudEluZGV4ICkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgbGFzdEluZGV4ICAgID0gY3VycmVudEluZGV4O1xyXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAgICAgICAgIF9zbGlkZSggc2xpZGVzLCBkb3RzICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGV0ZXJtaW5lIHdoaWNoIG5hdiBidXR0b24gYW5kIHNsaWRlXHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBzbGlkZURpcmVjdGlvbiBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX3NsaWRlVG9EaXJlY3Rpb24oIHNsaWRlRGlyZWN0aW9uLCBzbGlkZXMsIGRvdHMgKSB7XHJcblxyXG4gICAgICAgICAgICBsYXN0SW5kZXggPSBjdXJyZW50SW5kZXg7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHNsaWRlRGlyZWN0aW9uID09PSAnbmV4dCcgJiYgY3VycmVudEluZGV4IDwgc2xpZGVzQ291bnQgLSAxICkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHNsaWRlRGlyZWN0aW9uID09PSAncHJldmlvdXMnICYmIGN1cnJlbnRJbmRleCA+IDAgKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcclxuICAgICAgICAgICAgLy8gaWYgYXQgbGFzdCBzbGlkZSwgcmVzZXQgdG8gZmlyc3QgaW5kZXhcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBjdXJyZW50SW5kZXggPiBzbGlkZXNDb3VudCAtIDIgKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAvLyBpZiBhdCBmaXJ0IHNsaWRlLCBzZXQgdG8gbGFzdCBpbmRleFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBzbGlkZURpcmVjdGlvbiA9PT0gJ3ByZXZpb3VzJyAmJiBjdXJyZW50SW5kZXggPCBzbGlkZXNDb3VudCAtIDIgKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggPSAgc2xpZGVzQ291bnQgLSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfc2xpZGUoIHNsaWRlcywgZG90cyApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9zbGlkZSggc2xpZGVzLCBkb3RzICkge1xyXG4gICAgICAgICAgICBfc2V0Q3VycmVudEluZGV4RWxlbWVudENsYXNzKCBzbGlkZXNbbGFzdEluZGV4XSwgc2xpZGVzW2N1cnJlbnRJbmRleF0sICdzZWxlY3RlZCcgKTtcbiAgICAgICAgICAgIF9zZXRDdXJyZW50SW5kZXhFbGVtZW50Q2xhc3MoIGRvdHNbbGFzdEluZGV4XSwgZG90c1tjdXJyZW50SW5kZXhdLCAnZG90LWN1cnJlbnQnICk7XG4gICAgICAgIH1cclxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZXMgc2xpZGUgY2xhc3NlcyBmb3Igc2xpZGUgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFyZ2V0U2xpZGUgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9zZXRDdXJyZW50SW5kZXhFbGVtZW50Q2xhc3MoIGxhc3RTZWxlY3RlZCwgY3VycmVudFNlbGVjdGVkLCBrbGFzc25hbWUgKSB7XG5cbiAgICAgICAgICAgIGlmICggIWN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoa2xhc3NuYW1lKSApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LmFkZChrbGFzc25hbWUpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuYWRkKCdhbmltYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIF9yZW1vdmVMYXN0SW5kZXhFbGVtZW50Q2xhc3MobGFzdFNlbGVjdGVkLCBjdXJyZW50U2VsZWN0ZWQsIGtsYXNzbmFtZSk7XHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVzZWQgaW4gbGlldSB3aXRoIF9zZXRDdXJyZW50SW5kZXhFbGVtZW50Q2xhc3MoKSB0byByZW1vdmUgcHJldmlvdXMgZWxlbWVudCBjbGFzc1xyXG4gICAgICAgICAqIGFuZCB0aGVuIGhhbHQgdHJhbnNpdGlvbmVuZCBldmVudHMgYnkgcmVtb3ZpbmcgaXQgb3RoZXJ3aXNlIGl0IHdpbGwgY29udGludWVcclxuICAgICAgICAgKiB0byBydW4gdGhyb3VnaCBldmVyeSBldmVudFxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFyZ2V0U2xpZGUgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVMYXN0SW5kZXhFbGVtZW50Q2xhc3MoIGxhc3RTZWxlY3RlZCwgY3VycmVudFNlbGVjdGVkLCBrbGFzc25hbWUgKSB7XG5cbiAgICAgICAgICAgIGN1cnJlbnRTZWxlY3RlZC5hZGRFdmVudExpc3RlbmVyKCBfYXBwbHlUcmFuc2l0aW9uRW5kUHJlZml4KGN1cnJlbnRTZWxlY3RlZCksIGZ1bmN0aW9uIGNhbGxiYWNrKGV2KSB7XG4gICAgICAgICAgICAgICAgaWYgKCBldi5wcm9wZXJ0eU5hbWUgPT09ICd0cmFuc2Zvcm0nICYmIGN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW1hdGluZycpICkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW5nJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCBsYXN0U2VsZWN0ZWQuY2xhc3NMaXN0LmNvbnRhaW5zKGtsYXNzbmFtZSkgJiYgIWN1cnJlbnRTZWxlY3RlZC5jbGFzc0xpc3QuY29udGFpbnMoJ2FuaW1hdGluZycpICkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZShrbGFzc25hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0ZWQucmVtb3ZlRXZlbnRMaXN0ZW5lciggX2FwcGx5VHJhbnNpdGlvbkVuZFByZWZpeChjdXJyZW50U2VsZWN0ZWQpLCBjYWxsYmFjaywgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cclxuICAgICAgICBmdW5jdGlvbiBfYXBwbHlUcmFuc2l0aW9uRW5kUHJlZml4KCBlbGVtZW50ICkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYW5zaXRpb247XHJcblxyXG4gICAgICAgICAgICAvL1RPRE86IHBvc3NpYmx5IGEgYmV0dGVyIG1ldGhvZCB0byBkbyB0aGlzXHJcbiAgICAgICAgICAgIGZvciAodHJhbnNpdGlvbiBpbiB0cmFuc2l0aW9uRW5kUHJlZml4ZXMpIHtcclxuICAgICAgICAgICAgICBpZiAoIGVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvbl0gIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uRW5kUHJlZml4ZXNbdHJhbnNpdGlvbl07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlcyB0aGUgZG90IG5hdmlnYXRpb24gZWxlbWVudHNcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVBlZWtEb3RzKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyYWcgICA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcclxuICAgICAgICAgICAgICAgIGRvdE5hdiA9IF9jcmVhdGVFbGVtZW50KCduYXYnLCB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdwZWVrLWRvdHMnXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgYW5jaG9yLFxyXG4gICAgICAgICAgICAgICAgc3BhbjtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIGkgOyBpIDwgc2xpZGVzQ291bnQ7IGkgKz0gMSApIHtcclxuICAgICAgICAgICAgICAgIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgICAgIHNwYW4gICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3NldCBpbml0aWFsIGRvdCB3aXRoIFwiZG90LWN1cnJlbnRcIiBjbGFzc1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yLmNsYXNzTmFtZSA9ICggaSA9PT0gY3VycmVudEluZGV4ICkgPyAncGVlay1kb3QgZG90LWN1cnJlbnQnOiAncGVlay1kb3QnO1xuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NOYW1lID0gJ2hpZ2hsaWdodCc7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYW5jaG9yLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICAgICAgICAgIGRvdE5hdi5hcHBlbmRDaGlsZChhbmNob3IuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsaWRlci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKCBmcmFnLmFwcGVuZENoaWxkKGRvdE5hdikgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjcmVhdGVzIHRoZSBuZXh0L3ByZXYgYnV0dG9ucyBmb3IgdGhlIHNsaWRlclxyXG4gICAgICAgICAqIEByZXR1cm5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlUHJldk5leHRCdG4oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJhZyA9IF9lbGVtZW50RnJhZyhcclxuICAgICAgICAgICAgICAgICAgICBfY3JlYXRlRWxlbWVudCgnbmF2Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3NsaWRlLWJ0bi1uYXYnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuID0gX2NyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3ByZXYtYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJyAgOiAnZGF0YS1kaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnIDogJ3ByZXZpb3VzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIHByZXZCdG5TcGFuID0gX2NyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3ByZXYtYnRuLW92ZXJsYXknXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICBuZXh0QnRuID0gX2NyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ25leHQtYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJyAgOiAnZGF0YS1kaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnIDogJ25leHQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgbmV4dEJ0blNwYW4gPSBfY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAnbmV4dC1idG4tb3ZlcmxheSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJldkJ0bi5hcHBlbmRDaGlsZChwcmV2QnRuU3Bhbik7XHJcbiAgICAgICAgICAgIG5leHRCdG4uYXBwZW5kQ2hpbGQobmV4dEJ0blNwYW4pO1xyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKHByZXZCdG4pO1xyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKG5leHRCdG4pO1xyXG4gICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZnJhZyApO1xyXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhcHBlbmRzIGVsZW1lbnQgdG8gZG9jdW1lbnQgZnJhZ21lbnRcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBlbGVtZW50IDogdGFyZ2V0IGVsZW1lbnQgdG8gYXBwZW5kXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICA6IGRvY3VtZW50IGZyYWdtZW50XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZWxlbWVudEZyYWcoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZyYWcuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjcmVhdGUgYW4gZWxlbWVudCB3aXRoIGFkZGl0aW9uYWwgb3B0aW9ucyBsaWtlIGFkZGluZyBjbGFzc25hbWVzXHJcbiAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSB0YWcgICAgOiB0aGUgdGFnIHRvIGNyZWF0ZVxyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gb3B0aW9uIDogb3B0aW9ucyB0byBzZXQsIGFjY29tbW9kYXRlcyBjbGFzc05hbWUgYW5kIGF0dHJpYnV0ZXNcclxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICA6IGVsZW1lbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCh0YWcsIG9wdGlvbikge1xyXG5cclxuICAgICAgICBcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgICAgICBcdGlmIChvcHRpb24pIHtcclxuICAgICAgICBcdFx0aWYgKCBvcHRpb24uY2xhc3NOYW1lICkgZWxlbWVudC5jbGFzc05hbWUgPSBvcHRpb24uY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBvcHRpb24uc2V0QXR0cmlidXRlICkgZWxlbWVudC5zZXRBdHRyaWJ1dGUob3B0aW9uLnNldEF0dHJpYnV0ZS5kYXRhLCBvcHRpb24uc2V0QXR0cmlidXRlLnZhbHVlKTtcclxuICAgICAgICBcdH1cclxuXHJcbiAgICAgICAgXHRyZXR1cm4gZWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXQgdGhlIHBhcmVudCBlbGVtZW50J3MgY2hpbGRyZW5cclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGVsZW1lbnQgOiB0YXJnZXQgZWxlbWVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gYXJyYXkgICA6IGFycmF5IGxpc3Qgb2YgY2hpbGQgbm9kZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0Q2hpbGRyZW4oZWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBbXSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuTm9kZXMgPSBlbGVtZW50LmNoaWxkTm9kZXMsXHJcbiAgICAgICAgICAgICAgICBjaGlsZDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIGk7IGkgPCBjaGlsZHJlbk5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkcmVuTm9kZXNbaV0ubm9kZVR5cGUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbk5vZGVzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgICAgICAgaW5pdCA6IGluaXRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KHdpbmRvdywgZG9jdW1lbnQpKTtcclxuIl19
