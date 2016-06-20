
;(function(window, document){
    'use strict';

    document.addEventListener('DOMContentLoaded', function(ev){
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
            //apply slider width
            slider.style.width = 100 * slidesCount + '%';

            //apply slide width
            slides.forEach(function(slide){
                slide.style.width = 100 / slidesCount + '%';
            });

            //create dot nav and prev/button if more than 1 slide
            if ( slidesCount > 1 ) {
                _createPeekDots();
                _createPrevNextBtn();
            }

            let dotNav      = document.querySelector('.peek-dots'),
                slideBtnNav = document.querySelector('.slide-btn-nav');

            dotNav.addEventListener('click', function(ev){
                ev.preventDefault();

                let targetDot = ev.target,
                    //get children
                    dots      = _getChildren( this ),
                    //get index of dots
                    dotIndex  = [].indexOf.call(dots, targetDot);

                if ( targetDot === this) return;

                //pass the dot index
                _gotoSlide(dotIndex, slider);
            });

            //pass data
            slideBtnNav.addEventListener('click', function(ev) {
                ev.preventDefault();

                let targetBtn      = ev.target,
                    slideDirection = targetBtn.dataset.direction;

                _prevNext(slideDirection);
            });
        }


        //slide functionality
        function _slide(slider) {
    		let translateVal = -1 * currentIndex * 100 / slidesCount,
                theSlider    = slider;

            theSlider.style.transform = 'translate3d(' + translateVal + '%, 0, 0)';
        }


        //TODO: if end of slides
        function _prevNext(slideDirection) {

            lastIndex = currentIndex;

            if ( slideDirection === 'next' && currentIndex < slidesCount - 1 ) {
                currentIndex += 1;
            } else if ( slideDirection === 'previous' && currentIndex > 0 ) {
                currentIndex -= 1;
            }

            _slide(slider);
        }


        //dot index
        function _gotoSlide( index, slider ) {

            if ( index === currentIndex ) {
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
        function _createPeekDots () {

            let frag   = document.createDocumentFragment(),
                anchor = document.createElement('a'),
                dotNav = _createElement('nav', {
                    className : 'peek-dots'
                }),
                i = 0;

            for ( i ; i < slidesCount; i += 1 ) {
                anchor = document.createElement('a');
                anchor.className = ( i === currentIndex ) ? 'peek-dot dot-current': 'peek-dot';
                dotNav.appendChild(anchor.cloneNode(false));
            }

            slider.parentNode.appendChild( frag.appendChild(dotNav) );
        }


        function _createPrevNextBtn() {

            let frag = _elementFrag(
                    _createElement('nav', {
                        className : 'slide-btn-nav'
                    })
                ),

                prevBtn   = _createElement('a', {
                    className : 'prev-btn',
                    setAttribute : {
                        'data'  : 'data-direction',
                        'value' : 'previous'
                    }
                }),

                nextBtn   = _createElement('a', {
                    className : 'next-btn',
                    setAttribute : {
                        'data'  : 'data-direction',
                        'value' : 'next'
                    }
                });

            frag.appendChild(prevBtn);
            frag.appendChild(nextBtn);
            slider.parentNode.appendChild( frag );
        }


        function _elementFrag(element) {
            let frag = document.createDocumentFragment();
            return frag.appendChild( element );
        }


        //TODO: attribute setter
        function _createElement(tag, option) {

        	let element = document.createElement(tag);

        	if (option) {
        		if ( option.className ) element.className = option.className;
                if ( option.setAttribute ) element.setAttribute(option.setAttribute.data, option.setAttribute.value);
        	}

        	return element;
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
