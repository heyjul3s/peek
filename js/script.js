;(function(window, document){
    'use strict';

    document.addEventListener('DOMContentLoaded', function(){
        let peek = _Peek(document.querySelector('.peek'));
        peek.init();
    });

    //needs default parametes
    function _Peek(element) {

        //vars
        let slider       = element,
            slides       = Array.from(element.querySelectorAll('.slide')),
            slidesCount  = slides.length,
            currentIndex = 0,
            lastIndex    = 0;

        function init() {
            slider.style.width = 100 * slidesCount + '%';

            slides.forEach(function(slide){
                slide.style.width = 100 / slidesCount + '%';
            });

            peekDotNavigation();
        }


        //actual slide functionality
        function peekSlide() {

        }


        //callback
        function peekDotNavigation() {
            createPeekDots();
        }


        function createPeekDots () {
            let frag   = document.createDocumentFragment(),
                dotNav = document.createElement('nav'),
                anchor;

            //offset index by 1, for naming purposes
            for ( let i = 1; i < slidesCount + 1; i += 1 ) {
                anchor = document.createElement('a');
                anchor.className = 'peek-dot dot-' + i;

                dotNav.appendChild(anchor);
            }

            dotNav.className = 'peek-dots';

            frag.appendChild(dotNav);
            slider.parentNode.appendChild(frag);
        }


        return Object.freeze({
            init : init
        });

    }

}(window, document));
