define(
	'./public/js/view/Cup/cup',

	[],

	function(){
		// Config object
		var opts = {
			one: 'one',
			two: 'two',
			three: 'three',
			
			ball: 'ball'
		};

		var CupView = function( attrs, cupPresenter ){
			this.presenter = cupPresenter;
			this.initialize( attrs );
		};

		CupView.prototype = (function(){

            var initialize = function( attrs ){
				this.getElement.call( this, attrs );
				this.bindClickOnElement.call( this );
				this.ball = document.querySelector( '#' + opts.ball );
				//Boolean to prevent some bomb clicking
				this.cupClicked = false;
            };
			
			var getElement = function( attrs ){
				switch ( attrs.number ) {
                    case opts.one:
                        this.element = document.querySelector( '#' + opts.one );
                        break;
                    case opts.two:
                    	this.element = document.querySelector( '#' + opts.two );
                        break;
                    case opts.three:
                    	this.element = document.querySelector( '#' + opts.three );
                        break;
                    default:
                        return false;
                }
			};

			var handleClickOnElement = function( event ){
				// TO-DO: Find another way to do this
				if( !this.cupClicked ){
					this.cupClicked = true;
				}else{ 
					return;
				}

				if( this.presenter.getBallPlaced() ){
					if( event.target === this.presenter.getGoodCup() ){
						this.presenter.upScore();
						this.presenter.setInstruction( 'Win' );
						this.cupClicked = false;
					}else{
						this.presenter.resetScore();
						this.presenter.setInstruction( 'Loose' );
						this.cupClicked = false;
					}
					putBallInGoodCup.call( this );
					this.presenter.unbindElementsClick();
					setTimeout(function () {
						this.cupClicked = false;
						reset();
						this.presenter.reset();
					}.bind( this ), 1000 );
				}else{
					this.presenter.BoardPresenter.goodCup = event.target;
					animationBallToCup.call( this );
					setTimeout(function () {
						this.presenter.ballPlaced( this.element );
						this.cupClicked = false;
					}.bind( this ), 1000);
				}
			};

			var putBallInGoodCup = function(){
				this.ball.style.left = ( this.presenter.BoardPresenter.goodCup.getBoundingClientRect().left + this.presenter.BoardPresenter.goodCup.getBoundingClientRect().width/2 - this.ball.getBoundingClientRect().width/2 ) + 'px';
				this.ball.style.top = ( this.presenter.BoardPresenter.goodCup.getBoundingClientRect().top + this.presenter.BoardPresenter.goodCup.getBoundingClientRect().height/2 - this.ball.getBoundingClientRect().height/2 )+ 'px';
				this.ball.style.visibility = 'hidden';	
			};

			var animationBallToCup = function(){
				this.ball.style.left = ( event.target.getBoundingClientRect().left + event.target.getBoundingClientRect().width/2 - this.ball.getBoundingClientRect().width/2 ) + 'px';
				this.ball.style.top = ( event.target.getBoundingClientRect().top + event.target.getBoundingClientRect().height/2 - this.ball.getBoundingClientRect().height/2 )+ 'px';
				this.ball.style.visibility = 'hidden';
			}

			var unbindClickOnElement = function(){
				this.element.removeEventListener( 'click', this.handleClickOnElementBind );
			};

			var bindClickOnElement = function(){
				this.handleClickOnElementBind = handleClickOnElement.bind( this );

				if( !this.cupClicked ){
					this.element.addEventListener( 'click', this.handleClickOnElementBind );
				}
			};
			
			var increaseSpeed = function(){
				this.element.style.transitionDuration = '200ms';
			};

			var decreaseSpeed = function(){
				this.element.style.transitionDuration = '500ms';
			};

			var reset = function(){
				this.cupClicked = false;
				this.ball.style.left = 350 + 'px'; 
				this.ball.style.top = 150 + 'px';
				this.ball.style.visibility = 'visible';
			};

			// Public API
			return {
				initialize: initialize,
				getElement: getElement,
				bindClickOnElement: bindClickOnElement,
				unbindClickOnElement: unbindClickOnElement,
				increaseSpeed: increaseSpeed,
				decreaseSpeed: decreaseSpeed
			};
            
        })();
		
		return CupView;
});

