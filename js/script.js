// TODO: infinite scroll

;(function(window, document){
    'use strict';

    document.addEventListener('DOMContentLoaded', function(ev){
        let peek = _Peek( document.querySelector('.peek') );
        peek.init();
    });

    function _Peek(element) {

        let slider       = element,
            slides       = Array.from(element.querySelectorAll('.slide')),
            slidesCount  = slides.length,
            currentIndex = 0,
            lastIndex    = 0,
            slideBtnNav,
            dotNav,
            dots;


        //transitionend prefix
        let transitionEndPrefixes = {
            'WebkitTransition' : 'webkitTransitionEnd',
               'MozTransition' : 'transitionend',
                'msTransition' : 'MSTransitionEnd',
                 'OTransition' : 'oTransitionEnd',
                  'transition' : 'transitionend'
        };


        function init() {
            //create dot nav and prev/button if more than 1 slide
            if ( slidesCount > 1 ) {
                _createNavElements();
            }

            dotNav      = document.querySelector('.peek-dots');
            dots        = _getChildren(dotNav);
            slideBtnNav = document.querySelector('.slide-btn-nav');

            dotNav.addEventListener('click', function(ev){

                ev.preventDefault();

                let targetDot = ev.target,
                    dotIndex  = [].indexOf.call(dots, targetDot);

                if ( targetDot === this) return;

                _gotoSlide(dotIndex, dots);
            });

            slideBtnNav.addEventListener('click', function(ev) {

                ev.preventDefault();

                let targetBtn      = ev.target,
                    slideDirection = targetBtn.dataset.direction;

                if ( targetBtn === this) return;


                _slideToDirection( slideDirection, slides, dots );
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


        function _gotoSlide( index, dots ) {
            if ( index === currentIndex ) return false;

            lastIndex    = currentIndex;
            currentIndex = index;

            _slide( slides, dots );
        }


        /**
         * Determine which nav button and slide
         * @param  {[type]} slideDirection [description]
         * @return {[type]}                [description]
         */
        function _slideToDirection( slideDirection, slides, dots ) {

            lastIndex = currentIndex;

            if ( slideDirection === 'next' && currentIndex < slidesCount - 1 ) {
                currentIndex += 1;
            } else if ( slideDirection === 'previous' && currentIndex > 0 ) {
                currentIndex -= 1;
            }

            // _slide( slides, 'selected' );
            _slide( slides, dots );
        }


        function _slide( slides, dots ) {
            _setCurrentIndexElementClass( slides[lastIndex], slides[currentIndex], 'selected' );
            _setCurrentIndexElementClass( dots[lastIndex], dots[currentIndex], 'dot-current' );
        }


        /**
         * Handles slide classes for slide functionality
         * @param  {[type]} targetSlide [description]
         * @return {[type]}             [description]
         */
        function _setCurrentIndexElementClass( lastSelected, currentSelected, klassname ) {
            if ( !currentSelected.classList.contains(klassname) ) {
                currentSelected.classList.add(klassname);
                currentSelected.classList.add('animating');

                _removeLastIndexElementClass(lastSelected, currentSelected, klassname);
            }

        }


        /**
         * Used in lieu with _setCurrentIndexElementClass() to remove previous element class
         * and then halt transitionend events by removing it
         * @param  {[type]} targetSlide [description]
         * @return {[type]}             [description]
         */
        function _removeLastIndexElementClass( lastSelected, currentSelected, klassname ) {
            currentSelected.addEventListener( _applyTransitionEndPrefix(currentSelected), function callback(ev) {
                if ( ev.propertyName === 'transform' && currentSelected.classList.contains('animating') ) {
                    currentSelected.classList.remove('animating');
                }

                if ( lastSelected.classList.contains(klassname) && !currentSelected.classList.contains('animating') ) {
                    lastSelected.classList.remove(klassname);
                    currentSelected.removeEventListener( _applyTransitionEndPrefix(currentSelected), callback, false );
                }
            });
        }


        function _applyTransitionEndPrefix( element ) {

            let transition;

            //TODO: possibly a better method to do this
            for (transition in transitionEndPrefixes) {
              if ( element.style[transition] !== undefined ) {
                return transitionEndPrefixes[transition];
              }
            }
        }


        /**
         * creates the dot navigation elements
         * @return
         */
        function _createPeekDots() {

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
