/**
* Presenter for the "Board"
*/
define(
	'./public/js/presenter/Cup/cup',

	[ '../../view/Cup/cup' ],

	function( CupView ){
		
		// Config object
        var opts = {
		};

		var CupPresenter = function( attrs ){
			this.initialize( attrs );
		};

		CupPresenter.prototype = (function(){

            var initialize = function( attrs ){
                this.BoardPresenter = attrs.boardPresenter;
                this.view = new CupView( attrs, this );
            };

			var resetScore = function(){
				this.BoardPresenter.resetScore();
			};

			var decreaseSpeed = function(){
				this.view.decreaseSpeed();
			}
			
			var increaseSpeed = function(){
				this.view.increaseSpeed();
			};

            var upScore = function(){
				this.BoardPresenter.upScore();
			};

            var ballPlaced = function( element ){
                this.BoardPresenter.ballGetPlaced = true;
                this.BoardPresenter.goodCup = element;
                this.BoardPresenter.moveCups();
            };

			var getGoodCup = function(){
				return this.BoardPresenter.getGoodCup();
			};

			var setInstruction = function( value ){
				this.BoardPresenter.setInstruction( value );
			};

            var getBallPlaced = function(){
                return this.BoardPresenter.ballGetPlaced;
            }

			var unbindElementsClick = function(){
				for (var i = 0; i < this.BoardPresenter.cups.length; i++) {
					this.BoardPresenter.cups[ i ].view.unbindClickOnElement();
				}
			};

			var reset = function(){
				this.BoardPresenter.reset();
			};

			// Public API
			return {
				initialize: initialize,
                ballPlaced: ballPlaced,
                getBallPlaced: getBallPlaced,
				getGoodCup: getGoodCup,
				setInstruction: setInstruction,
				unbindElementsClick: unbindElementsClick,
				reset: reset,
				upScore: upScore,
				resetScore: resetScore,
				increaseSpeed: increaseSpeed,
				decreaseSpeed: decreaseSpeed
			};
            
        })();
		
		return CupPresenter;
});

