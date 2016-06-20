(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
                _gotoSlide(dotIndex, slider);
            });

            //pass data
            slideBtnNav.addEventListener('click', function (ev) {
                ev.preventDefault();

                var targetBtn = ev.target,
                    slideDirection = targetBtn.dataset.direction;

                _prevNext(slideDirection);
            });
        }

        //slide functionality
        function _slide(slider) {
            var translateVal = -1 * currentIndex * 100 / slidesCount,
                theSlider = slider;

            theSlider.style.transform = 'translate3d(' + translateVal + '%, 0, 0)';
        }

        //TODO: if end of slides
        function _prevNext(slideDirection) {

            lastIndex = currentIndex;

            if (slideDirection === 'next' && currentIndex < slidesCount - 1) {
                currentIndex += 1;
            } else if (slideDirection === 'previous' && currentIndex > 0) {
                currentIndex -= 1;
            }

            _slide(slider);
        }

        //dot index
        function _gotoSlide(index, slider) {

            if (index === currentIndex) {
                console.log('is current');
            }

            //pass currentIndex to lastIndex
            lastIndex = currentIndex;
            //pass the clicked index into currentIndex
            currentIndex = index;

            _slide(slider);
        }

        //TODO: refactor
        //create the dot navigation elements and append
        function _createPeekDots() {

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

        function _elementFrag(element) {
            var frag = document.createDocumentFragment();
            return frag.appendChild(element);
        }

        //TODO: attribute setter
        function _createElement(tag, option) {

            var element = document.createElement(tag);

            if (option) {
                if (option.className) element.className = option.className;
                if (option.setAttribute) element.setAttribute(option.setAttribute.data, option.setAttribute.value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxDQUFFLFdBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEwQjtBQUN4Qjs7QUFFQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxVQUFTLEVBQVQsRUFBWTtBQUN0RCxZQUFJLE9BQU8sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBTixDQUFYO0FBQ0EsYUFBSyxJQUFMO0FBQ0gsS0FIRDs7O0FBTUEsYUFBUyxLQUFULENBQWUsT0FBZixFQUF3Qjs7O0FBSXBCLFlBQUksU0FBZSxPQUFuQjtZQUNJLFNBQWUsTUFBTSxJQUFOLENBQVcsUUFBUSxnQkFBUixDQUF5QixRQUF6QixDQUFYLENBRG5CO1lBRUksY0FBZSxPQUFPLE1BRjFCO1lBR0ksZUFBZSxDQUhuQjtZQUlJLFlBQWUsQ0FKbkI7O0FBT0EsaUJBQVMsSUFBVCxHQUFnQjs7QUFFWixtQkFBTyxLQUFQLENBQWEsS0FBYixHQUFxQixNQUFNLFdBQU4sR0FBb0IsR0FBekM7OztBQUdBLG1CQUFPLE9BQVAsQ0FBZSxVQUFTLEtBQVQsRUFBZTtBQUMxQixzQkFBTSxLQUFOLENBQVksS0FBWixHQUFvQixNQUFNLFdBQU4sR0FBb0IsR0FBeEM7QUFDSCxhQUZEOzs7QUFLQSxnQkFBSyxjQUFjLENBQW5CLEVBQXVCO0FBQ25CO0FBQ0E7QUFDSDs7QUFFRCxnQkFBSSxTQUFjLFNBQVMsYUFBVCxDQUF1QixZQUF2QixDQUFsQjtnQkFDSSxjQUFjLFNBQVMsYUFBVCxDQUF1QixnQkFBdkIsQ0FEbEI7O0FBR0EsbUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBUyxFQUFULEVBQVk7QUFDekMsbUJBQUcsY0FBSDs7QUFFQSxvQkFBSSxZQUFZLEdBQUcsTUFBbkI7OztBQUVJLHVCQUFZLGFBQWMsSUFBZCxDQUZoQjs7O0FBSUksMkJB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LFdBQUwsQ0FBa0IsT0FBbEIsQ0FBUDtBQUNIOzs7QUFJRCxpQkFBUyxjQUFULENBQXdCLEdBQXhCLEVBQTZCLE1BQTdCLEVBQXFDOztBQUVwQyxnQkFBSSxVQUFVLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFkOztBQUVBLGdCQUFJLE1BQUosRUFBWTtBQUNYLG9CQUFLLE9BQU8sU0FBWixFQUF3QixRQUFRLFNBQVIsR0FBb0IsT0FBTyxTQUEzQjtBQUNsQixvQkFBSyxPQUFPLFlBQVosRUFBMkIsUUFBUSxZQUFSLENBQXFCLE9BQU8sWUFBUCxDQUFvQixJQUF6QyxFQUErQyxPQUFPLFlBQVAsQ0FBb0IsS0FBbkU7QUFDakM7O0FBRUQsbUJBQU8sT0FBUDtBQUNBOzs7QUFJRCxpQkFBUyxZQUFULENBQXNCLE9BQXRCLEVBQStCOztBQUUzQixnQkFBSSxJQUFJLENBQVI7Z0JBQ0ksV0FBVyxFQURmO2dCQUVJLGdCQUFnQixRQUFRLFVBRjVCO2dCQUdJLGNBSEo7O0FBS0EsaUJBQU0sQ0FBTixFQUFTLElBQUksY0FBYyxNQUEzQixFQUFtQyxLQUFLLENBQXhDLEVBQTJDO0FBQ3ZDLG9CQUFLLGNBQWMsQ0FBZCxFQUFpQixRQUFqQixLQUE4QixDQUFuQyxFQUF1QztBQUNuQyw2QkFBUyxJQUFULENBQWMsY0FBYyxDQUFkLENBQWQ7QUFDSDtBQUNKOztBQUVELG1CQUFPLFFBQVA7QUFDSDs7QUFHRCxlQUFPLE9BQU8sTUFBUCxDQUFjO0FBQ2pCLGtCQUFPO0FBRFUsU0FBZCxDQUFQO0FBSUg7QUFFSixDQXhNQyxFQXdNQSxNQXhNQSxFQXdNUSxRQXhNUixDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG47KGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgbGV0IHBlZWsgPSBfUGVlayhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVlaycpKTtcclxuICAgICAgICBwZWVrLmluaXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vbmVlZHMgZGVmYXVsdCBwYXJhbWV0ZXJzXHJcbiAgICBmdW5jdGlvbiBfUGVlayhlbGVtZW50KSB7XHJcblxyXG5cclxuICAgICAgICAvL3ZhcnNcclxuICAgICAgICBsZXQgc2xpZGVyICAgICAgID0gZWxlbWVudCxcclxuICAgICAgICAgICAgc2xpZGVzICAgICAgID0gQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpKSxcclxuICAgICAgICAgICAgc2xpZGVzQ291bnQgID0gc2xpZGVzLmxlbmd0aCxcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gMCxcclxuICAgICAgICAgICAgbGFzdEluZGV4ICAgID0gMDtcclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIC8vYXBwbHkgc2xpZGVyIHdpZHRoXHJcbiAgICAgICAgICAgIHNsaWRlci5zdHlsZS53aWR0aCA9IDEwMCAqIHNsaWRlc0NvdW50ICsgJyUnO1xyXG5cclxuICAgICAgICAgICAgLy9hcHBseSBzbGlkZSB3aWR0aFxyXG4gICAgICAgICAgICBzbGlkZXMuZm9yRWFjaChmdW5jdGlvbihzbGlkZSl7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9IDEwMCAvIHNsaWRlc0NvdW50ICsgJyUnO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vY3JlYXRlIGRvdCBuYXYgYW5kIHByZXYvYnV0dG9uIGlmIG1vcmUgdGhhbiAxIHNsaWRlXHJcbiAgICAgICAgICAgIGlmICggc2xpZGVzQ291bnQgPiAxICkge1xyXG4gICAgICAgICAgICAgICAgX2NyZWF0ZVBlZWtEb3RzKCk7XHJcbiAgICAgICAgICAgICAgICBfY3JlYXRlUHJldk5leHRCdG4oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGRvdE5hdiAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWstZG90cycpLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVCdG5OYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGUtYnRuLW5hdicpO1xyXG5cclxuICAgICAgICAgICAgZG90TmF2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RG90ID0gZXYudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ2V0IGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgZG90cyAgICAgID0gX2dldENoaWxkcmVuKCB0aGlzICksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9nZXQgaW5kZXggb2YgZG90c1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdEluZGV4ICA9IFtdLmluZGV4T2YuY2FsbChkb3RzLCB0YXJnZXREb3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0RG90ID09PSB0aGlzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgLy9wYXNzIHRoZSBkb3QgaW5kZXhcclxuICAgICAgICAgICAgICAgIF9nb3RvU2xpZGUoZG90SW5kZXgsIHNsaWRlcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9wYXNzIGRhdGFcclxuICAgICAgICAgICAgc2xpZGVCdG5OYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0QnRuICAgICAgPSBldi50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVEaXJlY3Rpb24gPSB0YXJnZXRCdG4uZGF0YXNldC5kaXJlY3Rpb247XHJcblxyXG4gICAgICAgICAgICAgICAgX3ByZXZOZXh0KHNsaWRlRGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9zbGlkZSBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgZnVuY3Rpb24gX3NsaWRlKHNsaWRlcikge1xyXG4gICAgXHRcdGxldCB0cmFuc2xhdGVWYWwgPSAtMSAqIGN1cnJlbnRJbmRleCAqIDEwMCAvIHNsaWRlc0NvdW50LFxyXG4gICAgICAgICAgICAgICAgdGhlU2xpZGVyICAgID0gc2xpZGVyO1xyXG5cclxuICAgICAgICAgICAgdGhlU2xpZGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgdHJhbnNsYXRlVmFsICsgJyUsIDAsIDApJztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL1RPRE86IGlmIGVuZCBvZiBzbGlkZXNcclxuICAgICAgICBmdW5jdGlvbiBfcHJldk5leHQoc2xpZGVEaXJlY3Rpb24pIHtcclxuXHJcbiAgICAgICAgICAgIGxhc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcclxuXHJcbiAgICAgICAgICAgIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBjdXJyZW50SW5kZXggPCBzbGlkZXNDb3VudCAtIDEgKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggc2xpZGVEaXJlY3Rpb24gPT09ICdwcmV2aW91cycgJiYgY3VycmVudEluZGV4ID4gMCApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfc2xpZGUoc2xpZGVyKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL2RvdCBpbmRleFxyXG4gICAgICAgIGZ1bmN0aW9uIF9nb3RvU2xpZGUoIGluZGV4LCBzbGlkZXIgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIGluZGV4ID09PSBjdXJyZW50SW5kZXggKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaXMgY3VycmVudCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3Bhc3MgY3VycmVudEluZGV4IHRvIGxhc3RJbmRleFxyXG4gICAgICAgICAgICBsYXN0SW5kZXggPSBjdXJyZW50SW5kZXg7XHJcbiAgICAgICAgICAgIC8vcGFzcyB0aGUgY2xpY2tlZCBpbmRleCBpbnRvIGN1cnJlbnRJbmRleFxyXG5cdFx0XHRjdXJyZW50SW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAgICAgICAgIF9zbGlkZShzbGlkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vVE9ETzogcmVmYWN0b3JcclxuICAgICAgICAvL2NyZWF0ZSB0aGUgZG90IG5hdmlnYXRpb24gZWxlbWVudHMgYW5kIGFwcGVuZFxyXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVQZWVrRG90cyAoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJhZyAgID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxyXG4gICAgICAgICAgICAgICAgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxyXG4gICAgICAgICAgICAgICAgZG90TmF2ID0gX2NyZWF0ZUVsZW1lbnQoJ25hdicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAncGVlay1kb3RzJ1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBpID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIGkgOyBpIDwgc2xpZGVzQ291bnQ7IGkgKz0gMSApIHtcclxuICAgICAgICAgICAgICAgIGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgICAgIGFuY2hvci5jbGFzc05hbWUgPSAoIGkgPT09IGN1cnJlbnRJbmRleCApID8gJ3BlZWstZG90IGRvdC1jdXJyZW50JzogJ3BlZWstZG90JztcclxuICAgICAgICAgICAgICAgIGRvdE5hdi5hcHBlbmRDaGlsZChhbmNob3IuY2xvbmVOb2RlKGZhbHNlKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsaWRlci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKCBmcmFnLmFwcGVuZENoaWxkKGRvdE5hdikgKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlUHJldk5leHRCdG4oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJhZyA9IF9lbGVtZW50RnJhZyhcclxuICAgICAgICAgICAgICAgICAgICBfY3JlYXRlRWxlbWVudCgnbmF2Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3NsaWRlLWJ0bi1uYXYnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuICAgPSBfY3JlYXRlRWxlbWVudCgnYScsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAncHJldi1idG4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZSA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnICA6ICdkYXRhLWRpcmVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScgOiAncHJldmlvdXMnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgbmV4dEJ0biAgID0gX2NyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ25leHQtYnRuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJyAgOiAnZGF0YS1kaXJlY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnIDogJ25leHQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKHByZXZCdG4pO1xyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKG5leHRCdG4pO1xyXG4gICAgICAgICAgICBzbGlkZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggZnJhZyApO1xyXG4gICAgICAgIH1cblxuXG4gICAgICAgIGZ1bmN0aW9uIF9lbGVtZW50RnJhZyhlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnJhZy5hcHBlbmRDaGlsZCggZWxlbWVudCApO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vVE9ETzogYXR0cmlidXRlIHNldHRlclxyXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHRhZywgb3B0aW9uKSB7XHJcblxyXG4gICAgICAgIFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIFx0aWYgKG9wdGlvbikge1xyXG4gICAgICAgIFx0XHRpZiAoIG9wdGlvbi5jbGFzc05hbWUgKSBlbGVtZW50LmNsYXNzTmFtZSA9IG9wdGlvbi5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIG9wdGlvbi5zZXRBdHRyaWJ1dGUgKSBlbGVtZW50LnNldEF0dHJpYnV0ZShvcHRpb24uc2V0QXR0cmlidXRlLmRhdGEsIG9wdGlvbi5zZXRBdHRyaWJ1dGUudmFsdWUpO1xyXG4gICAgICAgIFx0fVxyXG5cclxuICAgICAgICBcdHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vZ2V0IHRoZSBwYXJlbnQgZWxlbWVudCdzIGNoaWxkcmVuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldENoaWxkcmVuKGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpID0gMCxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gW10sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbk5vZGVzID0gZWxlbWVudC5jaGlsZE5vZGVzLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpOyBpIDwgY2hpbGRyZW5Ob2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZHJlbk5vZGVzW2ldLm5vZGVUeXBlID09PSAxICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGRyZW5Ob2Rlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICAgICAgICAgIGluaXQgOiBpbml0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSh3aW5kb3csIGRvY3VtZW50KSk7XHJcbiJdfQ==
