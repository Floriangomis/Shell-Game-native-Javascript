define(
	'./public/js/helper/transition-listener',

	[],

	function(){
        
        // List of transition used in transition manager
        var transitionsList = {
            'transition'		: 'transitionend',
            'OTransition'		: 'oTransitionEnd',
            'MSTransition'		: 'msTransitionEnd',
            'MozTransition'		: 'transitionend',
            'webkitTransition'	: 'webkitTransitionEnd'
        };

		var TransitionListener = (function(){

            var whichTransitionEvent = function( element ){
                for( var i in transitionsList){
                    if( element.style[ i ] !== undefined ){
                        return transitionsList[ i ];
                    }
                }
            };

            var onTransitionEndOnce = function( element, callback ){
                var transitionEvent = whichTransitionEvent( element );

                var handleTransitionEnd = function( event ){
					element.removeEventListener( transitionEvent, handleTransitionEnd );
                    if( event.target === element ){
                        callback( event );
                    }
                };
                element.addEventListener( transitionEvent, handleTransitionEnd );
            };
            
            return {
                onTransitionEndOnce: onTransitionEndOnce
            };
        })();
		
		return TransitionListener;
});

