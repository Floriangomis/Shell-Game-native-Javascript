/*
*
* View of the Board.
*
*/
define(
	'./public/js/view/Board/board',

	[],

	function(){
		// Config object
		var opts = {
			instructionId: 'instruction',
			scoreId: 'score',
			memeBox: 'meme-box',
			memeActivationScore: 3
		};

		var BoardView = function( presenter ){
			this.presenter = presenter;
			this.initialize();
		};

		BoardView.prototype = (function(){

            var initialize = function(){
				this.instruction = document.querySelector( '#' + opts.instructionId );
				this.score = document.querySelector( '#' + opts.scoreId );
				this.memeBox = document.querySelector( '.' + opts.memeBox );
				
				renderScore.call( this );
            };
			
			// setter for instruction span
			var setInstruction = function( value ){
				this.instruction.innerHTML = value;
			};
			
			var renderScore = function(){
				if( this.presenter.score && this.presenter.score >= opts.memeActivationScore ){
					this.memeBox.style.opacity = 1;
				} else {
					this.memeBox.style.opacity = 0;
				}
				
				this.score.innerHTML = this.presenter.score ? 'Score : ' + this.presenter.score : 'Score : ' + 0 ;
			}
			
			//public API
			return {
				initialize: initialize,
				setInstruction: setInstruction,
				renderScore: renderScore
			};
        })();
		
		return BoardView;
});

