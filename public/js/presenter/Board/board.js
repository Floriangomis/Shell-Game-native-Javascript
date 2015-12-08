/**
* Presenter for the "Board"
* The transition listener is not used yet but the goal is to use promised with it
*/
define(
	'./public/js/presenter/Board/board',
	[ 
		'../Cup/cup',
		'../../view/Board/board',
		'../../lib/es6-promise',
		'../../helper/transition-listener',
		'../../service/random-position'
		
	],
	function( CupPresenter, BoardView, Promise, TransitionListener, RandomPosition ){
		// Config object
        var opts = {
			scoreActivationSpeed: 3
		};

		// constructor
		var BoardPresenter = function(){
			this.initialize();
		};

		BoardPresenter.prototype = (function(){

            var initialize = function(){
				this.counter = 0;
				this.ballGetPlaced = false;
                this.goodCup = null;
				this.cups = [];
				this.combiUsed = [];

				this.view = new BoardView( this );
				this.view.setInstruction( 'Choose where to put the ball' );

				initCups.call( this );
				bindTransitionEvents.call( this );
            };

			var resetScore = function(){
				this.score = 0;
				for (var i = 0; i < this.cups.length; i++) {
					this.cups[i].decreaseSpeed();
				}
				this.view.renderScore();
			};

			var upScore = function(){
				if( this.score === undefined )
					this.score = 1;
				else
					this.score++;
					
				if( this.score >= opts.scoreActivationSpeed ){
					for (var i = 0; i < this.cups.length; i++) {
						this.cups[i].increaseSpeed();
					}
				}
				this.view.renderScore();
			};

			// setter for instruction span
			var setInstruction = function( value ){
				this.view.setInstruction( value );
			};

			var getGoodCup = function(){
				return this.goodCup;
			};

			var initCups = function(){
				this.cups.push( new CupPresenter( { number: 'one', boardPresenter: this } ) );
				this.cups.push( new CupPresenter( { number: 'two', boardPresenter: this } ) ) ;
				this.cups.push( new CupPresenter( { number: 'three', boardPresenter: this } ) );
			};

			var bindTransitionEvents = function(){
				this.handleTransitionBind = handleTransition.bind( this );
			};

			var moveCups = function(){
				animateCups.call( this );
			};

			var animateCups = function(){
				var rand = Math.floor( Math.random() * RandomPosition.getRandomPositionLength() );
				if( this.combiUsed.indexOf( rand ) !== -1 ){
					if( RandomPosition.getRandomPositionLength() === this.combiUsed.length ){
						return
					}
					animateCups.call( this );
				}else{
					this.combiUsed.push( rand );
					this.cups[0].view.element.addEventListener( 'transitionend', this.handleTransitionBind );
					this.cups[1].view.element.addEventListener( 'transitionend', this.handleTransitionBind );
					this.cups[2].view.element.addEventListener( 'transitionend', this.handleTransitionBind );

					RandomPosition.getRandomPosition.call( this, rand );
				}
			};

			var handleTransition = function( element ){
				this.cups[0].view.element.removeEventListener( 'transitionend', this.handleTransitionBind );
				this.cups[1].view.element.removeEventListener( 'transitionend', this.handleTransitionBind );
				this.cups[2].view.element.removeEventListener( 'transitionend', this.handleTransitionBind );
				if( this.counter === 4 ){
					this.view.setInstruction( 'Where is the ball ?' );
					return true;
				}
				animateCups.call( this );
				this.counter++;	
			};

			var reset = function(){
			  this.cups[0].view.element.className = "";
			  this.cups[1].view.element.className = "";
			  this.cups[2].view.element.className = "";
			  this.cups[0].view.element.classList.add("positionA");
			  this.cups[1].view.element.classList.add("positionB");
			  this.cups[2].view.element.classList.add("positionC");
			  this.initialize();
			};

			// Public API
			return {
				initialize: initialize,
				moveCups: moveCups,
				getGoodCup: getGoodCup,
				setInstruction: setInstruction,
				TransitionListener: TransitionListener,
				reset: reset,
				upScore: upScore,
				resetScore: resetScore
			};

        })();
		
		return BoardPresenter;
		
});