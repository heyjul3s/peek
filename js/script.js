
(function(window, document){
    'use strict';

    document.addEventListener('DOMContentLoaded', function(){
        let peek = _Peek(document.querySelector('.peek'));
        peek.init();
    });

    //default parametes
    function _Peek(element) {

            let slider      = element,
                slides      = Array.from(element.querySelectorAll('.slider')),
                slidesCount = slides.length;

        function init() {
            console.log(slidesCount);
        }

        //peek width: 100 * slidesCount + '%'

        function peekSlides() {
        }

        function peekButtons() {
        }

        function peekDots() {
        }

        return Object.freeze({
            init : init
        });

    }

}(window, document));
