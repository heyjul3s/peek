;(function(window, document){
    'use strict';

    document.addEventListener('DOMContentLoaded', function(){
        let peek = _Peek(document.querySelector('.peek'));
        peek.init();
    });

    //needs default parameters
    function _Peek(element) {

        //vars
        let slider       = element,
            slides       = Array.from(element.querySelectorAll('.slide')),
            slidesCount  = slides.length,
            currentIndex = 0,
            lastIndex    = 0;


        function init() {
            //TODO: if more than 1 slide, trigger

            slider.style.width = 100 * slidesCount + '%';

            slides.forEach(function(slide){
                slide.style.width = 100 / slidesCount + '%';
            });

            createPeekDots();

            let dotNav = document.querySelector('.peek-dots');

            dotNav.addEventListener('click', function(ev){
                ev.preventDefault();

                let targetDot = ev.target,
                    dots      = _getChildren( this ),
                    dotIndex  = [].indexOf.call(dots, targetDot);

                if ( targetDot === this) return;

                gotoSlide(dotIndex);
            });
        }

        //slide functionality
        function slide() {

        }

        //dot index
        function gotoSlide( index ) {
            //pass currentIndex to lastIndex
            lastIndex = currentIndex;
            //pass the clicked index into currentIndex
			currentIndex = index;
        }


        //create the dot navigation elements and append
        function createPeekDots () {
            let frag   = document.createDocumentFragment(),
                dotNav = document.createElement('nav'),
                anchor;

            for ( let i = 0; i < slidesCount; i += 1 ) {
                anchor = document.createElement('a');
                anchor.className = ( i === currentIndex ) ? 'peek-dot dot-current': 'peek-dot';

                dotNav.appendChild(anchor);
            }

            dotNav.className = 'peek-dots';

            frag.appendChild(dotNav);
            slider.parentNode.appendChild(frag);
        }


        //createElement w/ opt to shorten element creation process
        function _createElement() {
        }


        //get the parent element's children
        function _getChildren(element) {
            let i = 0,
                children = [],
                childrenNodes = element.childNodes,
                child;

            for ( i; i < childrenNodes.length; i += 1) {
                if ( childrenNodes[i].nodeType === 1 ) {
                    children.push(childrenNodes[i]);
                }
            }

            return children;
        }


        return Object.freeze({
            init : init
        });

    }

}(window, document));
