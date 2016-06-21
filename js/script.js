
;(function(window, document){
    'use strict';

    document.addEventListener('DOMContentLoaded', function(ev){
        let peek = _Peek(document.querySelector('.peek'));
        peek.init();
    });

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
                _gotoSlide(dotIndex, slider, dots);
            });

            //pass the data
            slideBtnNav.addEventListener('click', function(ev) {
                ev.preventDefault();

                let targetBtn      = ev.target,
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
    		let translateVal = -1 * currentIndex * 100 / slidesCount,
                theSlider    = slider;

            theSlider.style.transform = 'translate3d(' + translateVal + '%, 0, 0)';
        }


        /**
         * controls direction of content slide
         * @param  {[string]} slideDirection : data attribute acquired from slider nav buttons
         * @return
         */
        function _prevNext(slideDirection) {

            lastIndex = currentIndex;

            if ( slideDirection === 'next' && currentIndex < slidesCount - 1 ) {
                currentIndex += 1;
            } else if ( slideDirection === 'previous' && currentIndex > 0 ) {
                currentIndex -= 1;
            }

            //initate slide functionality
            _slide(slider);
        }


        //dot index
        function _gotoSlide( index, slider, dots ) {

            //don't do anything if is the current dot
            if ( index === currentIndex ) {
                return false;
            }

            //pass currentIndex to lastIndex
            lastIndex = currentIndex;
            //pass the clicked index into currentIndex
			currentIndex = index;

            if ( dots[lastIndex].classList.contains('dot-current') ) {
                dots[lastIndex].classList.remove('dot-current');
            }

            if ( !dots[currentIndex].classList.contains('dot-current') ) {
                dots[currentIndex].classList.add('dot-current');
            }

            //initate slide functionality
            _slide(slider);
        }


        /**
         * creates the dot navigation elements
         * @return
         */
        function _createPeekDots () {

            let frag   = document.createDocumentFragment(),
                anchor = document.createElement('a'),
                dotNav = _createElement('nav', {
                    className : 'peek-dots'
                }),
                i = 0;

            for ( i ; i < slidesCount; i += 1 ) {
                anchor = document.createElement('a');

                //set initial dot with "dot-current" class
                anchor.className = ( i === currentIndex ) ? 'peek-dot dot-current': 'peek-dot';
                //set to false, no need for deep cloning
                dotNav.appendChild(anchor.cloneNode(false));
            }

            slider.parentNode.appendChild( frag.appendChild(dotNav) );
        }


        /**
         * creates the next/prev buttons for the slider
         * @return
         */
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


        /**
         * appends element to document fragment
         * @param  {[type]} element : target element to append
         * @return {[type]}         : document fragment
         */
        function _elementFrag(element) {
            let frag = document.createDocumentFragment();
            return frag.appendChild( element );
        }


        /**
         * create an element with additional options like adding classnames
         * @param  {[type]} tag    : the tag to create
         * @param  {[type]} option : options to set, accommodates className and attributes
         * @return {[type]}        : element
         */
        function _createElement(tag, option) {

        	let element = document.createElement(tag);

        	if (option) {
        		if ( option.className ) element.className = option.className;
                if ( option.setAttribute ) element.setAttribute(option.setAttribute.data, option.setAttribute.value);
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
