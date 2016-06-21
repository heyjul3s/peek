(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

;(function (window, document) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function (ev) {
        var peek = _Peek(document.querySelector('.peek'));
        peek.init();
    });

    function _Peek(element) {

        //vars
        var slider = element,
            slides = Array.from(element.querySelectorAll('.slide')),
            slidesCount = slides.length,
            currentIndex = 0,
            lastIndex = 0;

        function init() {
            //apply slider width
            slider.style.width = 100 * slidesCount + '%';

            //apply slide width
            slides.forEach(function (slide) {
                slide.style.width = 100 / slidesCount + '%';
            });

            //create dot nav and prev/button if more than 1 slide
            if (slidesCount > 1) {
                _createPeekDots();
                _createPrevNextBtn();
            }

            var dotNav = document.querySelector('.peek-dots'),
                slideBtnNav = document.querySelector('.slide-btn-nav');

            dotNav.addEventListener('click', function (ev) {
                ev.preventDefault();

                var targetDot = ev.target,

                //get children
                dots = _getChildren(this),

                //get index of dots
                dotIndex = [].indexOf.call(dots, targetDot);

                if (targetDot === this) return;

                //pass the dot index
                _gotoSlide(dotIndex, slider, dots);
            });

            //pass the data
            slideBtnNav.addEventListener('click', function (ev) {
                ev.preventDefault();

                var targetBtn = ev.target,
                    slideDirection = targetBtn.dataset.direction;

                _prevNext(slideDirection);
            });
        }

        /**
         * animates the slider element
         * @param  {element} slider : main container of slides
         * @return
         */
        function _slide(slider) {
            var translateVal = -1 * currentIndex * 100 / slidesCount,
                theSlider = slider;

            theSlider.style.transform = 'translate3d(' + translateVal + '%, 0, 0)';
        }

        /**
         * controls direction of content slide
         * @param  {[string]} slideDirection : data attribute acquired from slider nav buttons
         * @return
         */
        function _prevNext(slideDirection) {

            lastIndex = currentIndex;

            if (slideDirection === 'next' && currentIndex < slidesCount - 1) {
                currentIndex += 1;
            } else if (slideDirection === 'previous' && currentIndex > 0) {
                currentIndex -= 1;
            }

            //initate slide functionality
            _slide(slider);
        }

        //dot index
        function _gotoSlide(index, slider, dots) {

            //don't do anything if is the current dot
            if (index === currentIndex) {
                return false;
            }

            //pass currentIndex to lastIndex
            lastIndex = currentIndex;
            //pass the clicked index into currentIndex
            currentIndex = index;

            if (dots[lastIndex].classList.contains('dot-current')) {
                dots[lastIndex].classList.remove('dot-current');
            }

            if (!dots[currentIndex].classList.contains('dot-current')) {
                dots[currentIndex].classList.add('dot-current');
            }

            //initate slide functionality
            _slide(slider);
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

        //
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxDQUFFLFdBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEwQjtBQUN4Qjs7QUFFQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxVQUFTLEVBQVQsRUFBWTtBQUN0RCxZQUFJLE9BQU8sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBTixDQUFYO0FBQ0EsYUFBSyxJQUFMO0FBQ0gsS0FIRDs7QUFLQSxhQUFTLEtBQVQsQ0FBZSxPQUFmLEVBQXdCOzs7QUFHcEIsWUFBSSxTQUFlLE9BQW5CO1lBQ0ksU0FBZSxNQUFNLElBQU4sQ0FBVyxRQUFRLGdCQUFSLENBQXlCLFFBQXpCLENBQVgsQ0FEbkI7WUFFSSxjQUFlLE9BQU8sTUFGMUI7WUFHSSxlQUFlLENBSG5CO1lBSUksWUFBZSxDQUpuQjs7QUFPQSxpQkFBUyxJQUFULEdBQWdCOztBQUVaLG1CQUFPLEtBQVAsQ0FBYSxLQUFiLEdBQXFCLE1BQU0sV0FBTixHQUFvQixHQUF6Qzs7O0FBR0EsbUJBQU8sT0FBUCxDQUFlLFVBQVMsS0FBVCxFQUFlO0FBQzFCLHNCQUFNLEtBQU4sQ0FBWSxLQUFaLEdBQW9CLE1BQU0sV0FBTixHQUFvQixHQUF4QztBQUNILGFBRkQ7OztBQUtBLGdCQUFLLGNBQWMsQ0FBbkIsRUFBdUI7QUFDbkI7QUFDQTtBQUNIOztBQUVELGdCQUFJLFNBQWMsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQWxCO2dCQUNJLGNBQWMsU0FBUyxhQUFULENBQXVCLGdCQUF2QixDQURsQjs7QUFHQSxtQkFBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFTLEVBQVQsRUFBWTtBQUN6QyxtQkFBRyxjQUFIOztBQUVBLG9CQUFJLFlBQVksR0FBRyxNQUFuQjs7O0FBRUksdUJBQVksYUFBYyxJQUFkLENBRmhCOzs7QUFJSSwyQkFB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RCxtQkFBTyxRQUFQO0FBQ0g7O0FBR0QsZUFBTyxPQUFPLE1BQVAsQ0FBYztBQUNqQixrQkFBTztBQURVLFNBQWQsQ0FBUDtBQUlIO0FBRUosQ0FqUEMsRUFpUEEsTUFqUEEsRUFpUFEsUUFqUFIsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxuOyhmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KXtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgIGxldCBwZWVrID0gX1BlZWsoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWsnKSk7XHJcbiAgICAgICAgcGVlay5pbml0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBfUGVlayhlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIC8vdmFyc1xyXG4gICAgICAgIGxldCBzbGlkZXIgICAgICAgPSBlbGVtZW50LFxyXG4gICAgICAgICAgICBzbGlkZXMgICAgICAgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlJykpLFxyXG4gICAgICAgICAgICBzbGlkZXNDb3VudCAgPSBzbGlkZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSAwLFxyXG4gICAgICAgICAgICBsYXN0SW5kZXggICAgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgLy9hcHBseSBzbGlkZXIgd2lkdGhcclxuICAgICAgICAgICAgc2xpZGVyLnN0eWxlLndpZHRoID0gMTAwICogc2xpZGVzQ291bnQgKyAnJSc7XHJcblxyXG4gICAgICAgICAgICAvL2FwcGx5IHNsaWRlIHdpZHRoXHJcbiAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uKHNsaWRlKXtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gMTAwIC8gc2xpZGVzQ291bnQgKyAnJSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9jcmVhdGUgZG90IG5hdiBhbmQgcHJldi9idXR0b24gaWYgbW9yZSB0aGFuIDEgc2xpZGVcclxuICAgICAgICAgICAgaWYgKCBzbGlkZXNDb3VudCA+IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBfY3JlYXRlUGVla0RvdHMoKTtcclxuICAgICAgICAgICAgICAgIF9jcmVhdGVQcmV2TmV4dEJ0bigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZG90TmF2ICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVlay1kb3RzJyksXHJcbiAgICAgICAgICAgICAgICBzbGlkZUJ0bk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZS1idG4tbmF2Jyk7XHJcblxyXG4gICAgICAgICAgICBkb3ROYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXREb3QgPSBldi50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9nZXQgY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICBkb3RzICAgICAgPSBfZ2V0Q2hpbGRyZW4oIHRoaXMgKSxcclxuICAgICAgICAgICAgICAgICAgICAvL2dldCBpbmRleCBvZiBkb3RzXHJcbiAgICAgICAgICAgICAgICAgICAgZG90SW5kZXggID0gW10uaW5kZXhPZi5jYWxsKGRvdHMsIHRhcmdldERvdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0YXJnZXREb3QgPT09IHRoaXMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3Bhc3MgdGhlIGRvdCBpbmRleFxyXG4gICAgICAgICAgICAgICAgX2dvdG9TbGlkZShkb3RJbmRleCwgc2xpZGVyLCBkb3RzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3Bhc3MgdGhlIGRhdGFcclxuICAgICAgICAgICAgc2xpZGVCdG5OYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0QnRuICAgICAgPSBldi50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVEaXJlY3Rpb24gPSB0YXJnZXRCdG4uZGF0YXNldC5kaXJlY3Rpb247XHJcblxyXG4gICAgICAgICAgICAgICAgX3ByZXZOZXh0KHNsaWRlRGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogYW5pbWF0ZXMgdGhlIHNsaWRlciBlbGVtZW50XHJcbiAgICAgICAgICogQHBhcmFtICB7ZWxlbWVudH0gc2xpZGVyIDogbWFpbiBjb250YWluZXIgb2Ygc2xpZGVzXHJcbiAgICAgICAgICogQHJldHVyblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9zbGlkZShzbGlkZXIpIHtcclxuICAgIFx0XHRsZXQgdHJhbnNsYXRlVmFsID0gLTEgKiBjdXJyZW50SW5kZXggKiAxMDAgLyBzbGlkZXNDb3VudCxcclxuICAgICAgICAgICAgICAgIHRoZVNsaWRlciAgICA9IHNsaWRlcjtcclxuXHJcbiAgICAgICAgICAgIHRoZVNsaWRlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHRyYW5zbGF0ZVZhbCArICclLCAwLCAwKSc7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY29udHJvbHMgZGlyZWN0aW9uIG9mIGNvbnRlbnQgc2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0gIHtbc3RyaW5nXX0gc2xpZGVEaXJlY3Rpb24gOiBkYXRhIGF0dHJpYnV0ZSBhY3F1aXJlZCBmcm9tIHNsaWRlciBuYXYgYnV0dG9uc1xyXG4gICAgICAgICAqIEByZXR1cm5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfcHJldk5leHQoc2xpZGVEaXJlY3Rpb24pIHtcclxuXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcclxuXHJcbiAgICAgICAgICAgIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBjdXJyZW50SW5kZXggPCBzbGlkZXNDb3VudCAtIDEgKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICdwcmV2aW91cycgJiYgY3VycmVudEluZGV4ID4gMCApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2luaXRhdGUgc2xpZGUgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgICAgICBfc2xpZGUoc2xpZGVyKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL2RvdCBpbmRleFxyXG4gICAgICAgIGZ1bmN0aW9uIF9nb3RvU2xpZGUoIGluZGV4LCBzbGlkZXIsIGRvdHMgKSB7XHJcblxyXG4gICAgICAgICAgICAvL2Rvbid0IGRvIGFueXRoaW5nIGlmIGlzIHRoZSBjdXJyZW50IGRvdFxyXG4gICAgICAgICAgICBpZiAoIGluZGV4ID09PSBjdXJyZW50SW5kZXggKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcGFzcyBjdXJyZW50SW5kZXggdG8gbGFzdEluZGV4XHJcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcclxuICAgICAgICAgICAgLy9wYXNzIHRoZSBjbGlja2VkIGluZGV4IGludG8gY3VycmVudEluZGV4XHJcblx0XHRcdGN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICAgICAgaWYgKCBkb3RzW2xhc3RJbmRleF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkb3QtY3VycmVudCcpICkge1xyXG4gICAgICAgICAgICAgICAgZG90c1tsYXN0SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2RvdC1jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggIWRvdHNbY3VycmVudEluZGV4XS5jbGFzc0xpc3QuY29udGFpbnMoJ2RvdC1jdXJyZW50JykgKSB7XHJcbiAgICAgICAgICAgICAgICBkb3RzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LmFkZCgnZG90LWN1cnJlbnQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9pbml0YXRlIHNsaWRlIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICAgICAgX3NsaWRlKHNsaWRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlcyB0aGUgZG90IG5hdmlnYXRpb24gZWxlbWVudHNcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVBlZWtEb3RzICgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBmcmFnICAgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgICAgICAgICAgICBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYgPSBfY3JlYXRlRWxlbWVudCgnbmF2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdwZWVrLWRvdHMnXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yICggaSA7IGkgPCBzbGlkZXNDb3VudDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc2V0IGluaXRpYWwgZG90IHdpdGggXCJkb3QtY3VycmVudFwiIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBhbmNob3IuY2xhc3NOYW1lID0gKCBpID09PSBjdXJyZW50SW5kZXggKSA/ICdwZWVrLWRvdCBkb3QtY3VycmVudCc6ICdwZWVrLWRvdCc7XHJcbiAgICAgICAgICAgICAgICAvL3NldCB0byBmYWxzZSwgbm8gbmVlZCBmb3IgZGVlcCBjbG9uaW5nXHJcbiAgICAgICAgICAgICAgICBkb3ROYXYuYXBwZW5kQ2hpbGQoYW5jaG9yLmNsb25lTm9kZShmYWxzZSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZnJhZy5hcHBlbmRDaGlsZChkb3ROYXYpICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlcyB0aGUgbmV4dC9wcmV2IGJ1dHRvbnMgZm9yIHRoZSBzbGlkZXJcclxuICAgICAgICAgKiBAcmV0dXJuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVByZXZOZXh0QnRuKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZyYWcgPSBfZWxlbWVudEZyYWcoXHJcbiAgICAgICAgICAgICAgICAgICAgX2NyZWF0ZUVsZW1lbnQoJ25hdicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICdzbGlkZS1idG4tbmF2J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICksXHJcblxyXG4gICAgICAgICAgICAgICAgcHJldkJ0biAgID0gX2NyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3ByZXYtYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJyAgOiAnZGF0YS1kaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnIDogJ3ByZXZpb3VzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIG5leHRCdG4gICA9IF9jcmVhdGVFbGVtZW50KCdhJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICduZXh0LWJ0bicsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0QXR0cmlidXRlIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YScgIDogJ2RhdGEtZGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyA6ICduZXh0J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChwcmV2QnRuKTtcclxuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChuZXh0QnRuKTtcclxuICAgICAgICAgICAgc2xpZGVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIGZyYWcgKTtcclxuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogYXBwZW5kcyBlbGVtZW50IHRvIGRvY3VtZW50IGZyYWdtZW50XG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gZWxlbWVudCA6IHRhcmdldCBlbGVtZW50IHRvIGFwcGVuZFxuICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgOiBkb2N1bWVudCBmcmFnbWVudFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2VsZW1lbnRGcmFnKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmcmFnLmFwcGVuZENoaWxkKCBlbGVtZW50ICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlIGFuIGVsZW1lbnQgd2l0aCBhZGRpdGlvbmFsIG9wdGlvbnMgbGlrZSBhZGRpbmcgY2xhc3NuYW1lc1xyXG4gICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gdGFnICAgIDogdGhlIHRhZyB0byBjcmVhdGVcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IG9wdGlvbiA6IG9wdGlvbnMgdG8gc2V0LCBhY2NvbW1vZGF0ZXMgY2xhc3NOYW1lIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgOiBlbGVtZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnQodGFnLCBvcHRpb24pIHtcclxuXHJcbiAgICAgICAgXHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgXHRpZiAob3B0aW9uKSB7XHJcbiAgICAgICAgXHRcdGlmICggb3B0aW9uLmNsYXNzTmFtZSApIGVsZW1lbnQuY2xhc3NOYW1lID0gb3B0aW9uLmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgIGlmICggb3B0aW9uLnNldEF0dHJpYnV0ZSApIGVsZW1lbnQuc2V0QXR0cmlidXRlKG9wdGlvbi5zZXRBdHRyaWJ1dGUuZGF0YSwgb3B0aW9uLnNldEF0dHJpYnV0ZS52YWx1ZSk7XHJcbiAgICAgICAgXHR9XHJcblxyXG4gICAgICAgIFx0cmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXQgdGhlIHBhcmVudCBlbGVtZW50J3MgY2hpbGRyZW5cclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGVsZW1lbnQgOiB0YXJnZXQgZWxlbWVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gYXJyYXkgICA6IGFycmF5IGxpc3Qgb2YgY2hpbGQgbm9kZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0Q2hpbGRyZW4oZWxlbWVudCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBbXSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuTm9kZXMgPSBlbGVtZW50LmNoaWxkTm9kZXMsXHJcbiAgICAgICAgICAgICAgICBjaGlsZDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIGk7IGkgPCBjaGlsZHJlbk5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkcmVuTm9kZXNbaV0ubm9kZVR5cGUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbk5vZGVzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgICAgICAgaW5pdCA6IGluaXRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KHdpbmRvdywgZG9jdW1lbnQpKTtcclxuIl19
