(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//TODO: easing func for huge steps
//TODO: prev/next

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
            //TODO: if more than 1 slide, trigger
            slider.style.width = 100 * slidesCount + '%';

            slides.forEach(function (slide) {
                slide.style.width = 100 / slidesCount + '%';
            });

            if (slidesCount > 1) {
                createPeekDots();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNHQSxDQUFFLFdBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEwQjtBQUN4Qjs7QUFFQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxVQUFTLEVBQVQsRUFBWTtBQUN0RCxZQUFJLE9BQU8sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBTixDQUFYO0FBQ0EsYUFBSyxJQUFMO0FBQ0gsS0FIRDs7O0FBTUEsYUFBUyxLQUFULENBQWUsT0FBZixFQUF3Qjs7O0FBR3BCLFlBQUksU0FBZSxPQUFuQjtZQUNJLFNBQWUsTUFBTSxJQUFOLENBQVcsUUFBUSxnQkFBUixDQUF5QixRQUF6QixDQUFYLENBRG5CO1lBRUksY0FBZSxPQUFPLE1BRjFCO1lBR0ksZUFBZSxDQUhuQjtZQUlJLFlBQWUsQ0FKbkI7O0FBT0EsaUJBQVMsSUFBVCxHQUFnQjs7QUFFWixtQkFBTyxLQUFQLENBQWEsS0FBYixHQUFxQixNQUFNLFdBQU4sR0FBb0IsR0FBekM7O0FBRUEsbUJBQU8sT0FBUCxDQUFlLFVBQVMsS0FBVCxFQUFlO0FBQzFCLHNCQUFNLEtBQU4sQ0FBWSxLQUFaLEdBQW9CLE1BQU0sV0FBTixHQUFvQixHQUF4QztBQUNILGFBRkQ7O0FBSUEsZ0JBQUssY0FBYyxDQUFuQixFQUF1QjtBQUNuQjtBQUNIOztBQUVELGdCQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQWI7O0FBRUEsbUJBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBUyxFQUFULEVBQVk7QUFDekMsbUJBQUcsY0FBSDs7QUFFQSxvQkFBSSxZQUFZLEdBQUcsTUFBbkI7OztBQUVJLHVCQUFZLGFBQWMsSUFBZCxDQUZoQjs7O0FBSUksMkJBQVksR0FBRyxPQUFILENBQVcsSUFBWCxDQUFnQixJQUFoQixFQUFzQixTQUF0QixDQUpoQjs7QUFNQSxvQkFBSyxjQUFjLElBQW5CLEVBQXlCOzs7QUFHekIsMEJBQVUsUUFBVixFQUFvQixNQUFwQjtBQUNILGFBYkQ7QUFjSDs7O0FBR0QsaUJBQVMsS0FBVCxDQUFlLE1BQWYsRUFBdUI7QUFDekIsZ0JBQUksZUFBZSxDQUFDLENBQUQsR0FBSyxZQUFMLEdBQW9CLEdBQXBCLEdBQTBCLFdBQTdDO2dCQUNVLFlBQWUsTUFEekI7O0FBR00sc0JBQVUsS0FBVixDQUFnQixTQUFoQixHQUE0QixpQkFBaUIsWUFBakIsR0FBZ0MsVUFBNUQ7QUFDSDs7O0FBR0QsaUJBQVMsU0FBVCxDQUFvQixLQUFwQixFQUEyQixNQUEzQixFQUFvQztBQUNoQyxnQkFBSyxVQUFVLFlBQWYsRUFBOEI7QUFDMUIsd0JBQVEsR0FBUixDQUFZLFlBQVo7QUFDSDs7O0FBR0Qsd0JBQVksWUFBWjs7QUFFVCwyQkFBZSxLQUFmOztBQUVTLGtCQUFNLE1BQU47QUFDSDs7O0FBSUQsaUJBQVMsY0FBVCxHQUEyQjtBQUN2QixnQkFBSSxPQUFTLFNBQVMsc0JBQVQsRUFBYjtnQkFDSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQURiO2dCQUVJLGVBRko7O0FBSUEsaUJBQU0sSUFBSSxJQUFJLENBQWQsRUFBaUIsSUFBSSxXQUFyQixFQUFrQyxLQUFLLENBQXZDLEVBQTJDO0FBQ3ZDLHlCQUFTLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFUO0FBQ0EsdUJBQU8sU0FBUCxHQUFxQixNQUFNLFlBQVIsR0FBeUIsc0JBQXpCLEdBQWlELFVBQXBFOztBQUVBLHVCQUFPLFdBQVAsQ0FBbUIsTUFBbkI7QUFDSDs7QUFFRCxtQkFBTyxTQUFQLEdBQW1CLFdBQW5COztBQUVBLGlCQUFLLFdBQUwsQ0FBaUIsTUFBakI7QUFDQSxtQkFBTyxVQUFQLENBQWtCLFdBQWxCLENBQThCLElBQTlCO0FBQ0g7OztBQUlELGlCQUFTLGNBQVQsR0FBMEIsQ0FDekI7OztBQUlELGlCQUFTLFlBQVQsQ0FBc0IsT0FBdEIsRUFBK0I7QUFDM0IsZ0JBQUksSUFBSSxDQUFSO2dCQUNJLFdBQVcsRUFEZjtnQkFFSSxnQkFBZ0IsUUFBUSxVQUY1QjtnQkFHSSxjQUhKOztBQUtBLGlCQUFNLENBQU4sRUFBUyxJQUFJLGNBQWMsTUFBM0IsRUFBbUMsS0FBSyxDQUF4QyxFQUEyQztBQUN2QyxvQkFBSyxjQUFjLENBQWQsRUFBaUIsUUFBakIsS0FBOEIsQ0FBbkMsRUFBdUM7QUFDbkMsNkJBQVMsSUFBVCxDQUFjLGNBQWMsQ0FBZCxDQUFkO0FBQ0g7QUFDSjs7QUFFRCxtQkFBTyxRQUFQO0FBQ0g7O0FBR0QsZUFBTyxPQUFPLE1BQVAsQ0FBYztBQUNqQixrQkFBTztBQURVLFNBQWQsQ0FBUDtBQUlIO0FBRUosQ0F4SEMsRUF3SEEsTUF4SEEsRUF3SFEsUUF4SFIsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL1RPRE86IGVhc2luZyBmdW5jIGZvciBodWdlIHN0ZXBzXHJcbi8vVE9ETzogcHJldi9uZXh0XHJcblxyXG47KGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgbGV0IHBlZWsgPSBfUGVlayhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGVlaycpKTtcclxuICAgICAgICBwZWVrLmluaXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vbmVlZHMgZGVmYXVsdCBwYXJhbWV0ZXJzXHJcbiAgICBmdW5jdGlvbiBfUGVlayhlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIC8vdmFyc1xyXG4gICAgICAgIGxldCBzbGlkZXIgICAgICAgPSBlbGVtZW50LFxyXG4gICAgICAgICAgICBzbGlkZXMgICAgICAgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlJykpLFxyXG4gICAgICAgICAgICBzbGlkZXNDb3VudCAgPSBzbGlkZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSAwLFxyXG4gICAgICAgICAgICBsYXN0SW5kZXggICAgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgLy9UT0RPOiBpZiBtb3JlIHRoYW4gMSBzbGlkZSwgdHJpZ2dlclxyXG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUud2lkdGggPSAxMDAgKiBzbGlkZXNDb3VudCArICclJztcclxuXHJcbiAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uKHNsaWRlKXtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gMTAwIC8gc2xpZGVzQ291bnQgKyAnJSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBzbGlkZXNDb3VudCA+IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQZWVrRG90cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZG90TmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlZWstZG90cycpO1xyXG5cclxuICAgICAgICAgICAgZG90TmF2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0RG90ID0gZXYudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ2V0IGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgZG90cyAgICAgID0gX2dldENoaWxkcmVuKCB0aGlzICksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9nZXQgaW5kZXggb2YgZG90c1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdEluZGV4ICA9IFtdLmluZGV4T2YuY2FsbChkb3RzLCB0YXJnZXREb3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0RG90ID09PSB0aGlzKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgLy9wYXNzIHRoZSBkb3QgaW5kZXhcclxuICAgICAgICAgICAgICAgIGdvdG9TbGlkZShkb3RJbmRleCwgc2xpZGVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3NsaWRlIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICBmdW5jdGlvbiBzbGlkZShzbGlkZXIpIHtcclxuICAgIFx0XHRsZXQgdHJhbnNsYXRlVmFsID0gLTEgKiBjdXJyZW50SW5kZXggKiAxMDAgLyBzbGlkZXNDb3VudCxcclxuICAgICAgICAgICAgICAgIHRoZVNsaWRlciAgICA9IHNsaWRlcjtcclxuXHJcbiAgICAgICAgICAgIHRoZVNsaWRlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHRyYW5zbGF0ZVZhbCArICclLCAwLCAwKSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2RvdCBpbmRleFxyXG4gICAgICAgIGZ1bmN0aW9uIGdvdG9TbGlkZSggaW5kZXgsIHNsaWRlciApIHtcclxuICAgICAgICAgICAgaWYgKCBpbmRleCA9PT0gY3VycmVudEluZGV4ICkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2lzIGN1cnJlbnQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wYXNzIGN1cnJlbnRJbmRleCB0byBsYXN0SW5kZXhcclxuICAgICAgICAgICAgbGFzdEluZGV4ID0gY3VycmVudEluZGV4O1xyXG4gICAgICAgICAgICAvL3Bhc3MgdGhlIGNsaWNrZWQgaW5kZXggaW50byBjdXJyZW50SW5kZXhcclxuXHRcdFx0Y3VycmVudEluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgICBzbGlkZShzbGlkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vY3JlYXRlIHRoZSBkb3QgbmF2aWdhdGlvbiBlbGVtZW50cyBhbmQgYXBwZW5kXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlUGVla0RvdHMgKCkge1xyXG4gICAgICAgICAgICBsZXQgZnJhZyAgID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxyXG4gICAgICAgICAgICAgICAgZG90TmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2JyksXHJcbiAgICAgICAgICAgICAgICBhbmNob3I7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBzbGlkZXNDb3VudDsgaSArPSAxICkge1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yLmNsYXNzTmFtZSA9ICggaSA9PT0gY3VycmVudEluZGV4ICkgPyAncGVlay1kb3QgZG90LWN1cnJlbnQnOiAncGVlay1kb3QnO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvdE5hdi5hcHBlbmRDaGlsZChhbmNob3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkb3ROYXYuY2xhc3NOYW1lID0gJ3BlZWstZG90cyc7XHJcblxyXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGRvdE5hdik7XHJcbiAgICAgICAgICAgIHNsaWRlci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGZyYWcpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vY3JlYXRlRWxlbWVudCB3LyBvcHQgdG8gc2hvcnRlbiBlbGVtZW50IGNyZWF0aW9uIHByb2Nlc3NcclxuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCgpIHtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL2dldCB0aGUgcGFyZW50IGVsZW1lbnQncyBjaGlsZHJlblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRDaGlsZHJlbihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gMCxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gW10sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbk5vZGVzID0gZWxlbWVudC5jaGlsZE5vZGVzLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBpOyBpIDwgY2hpbGRyZW5Ob2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZHJlbk5vZGVzW2ldLm5vZGVUeXBlID09PSAxICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGRyZW5Ob2Rlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICAgICAgICAgIGluaXQgOiBpbml0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSh3aW5kb3csIGRvY3VtZW50KSk7XHJcbiJdfQ==
