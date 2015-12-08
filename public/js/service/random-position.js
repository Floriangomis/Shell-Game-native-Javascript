define(
	'./public/js/service/random-position',

	[],

	function(){
        
    var RandomPosition = (function(){

        var getRandomPosition = function( random ){
            randomPosition[ random ].call( this );
        };
        
        var getRandomPositionLength = function(){
            return randomPosition.length;
        };

        var randomPosition = [
            function() {
              this.cups[0].view.element.className = "";
              this.cups[1].view.element.className = "";
              this.cups[2].view.element.className = "";
              this.cups[0].view.element.classList.add("positionA");
              this.cups[1].view.element.classList.add("positionC");
              this.cups[2].view.element.classList.add("positionB");
            },
            function() {
              this.cups[0].view.element.className = "";
              this.cups[1].view.element.className = "";
              this.cups[2].view.element.className = "";
              this.cups[0].view.element.classList.add("positionB");
              this.cups[1].view.element.classList.add("positionA");
              this.cups[2].view.element.classList.add("positionC");
            },
            function() {
              this.cups[0].view.element.className = "";
              this.cups[1].view.element.className = "";
              this.cups[2].view.element.className = "";
              this.cups[0].view.element.classList.add("positionB");
              this.cups[1].view.element.classList.add("positionC");
              this.cups[2].view.element.classList.add("positionA");
            },
            function() {
              this.cups[0].view.element.className = "";
              this.cups[1].view.element.className = "";
              this.cups[2].view.element.className = "";
              this.cups[0].view.element.classList.add("positionC");
              this.cups[1].view.element.classList.add("positionA");
              this.cups[2].view.element.classList.add("positionB");
            },
            function() {
              this.cups[0].view.element.className = "";
              this.cups[1].view.element.className = "";
              this.cups[2].view.element.className = "";
              this.cups[0].view.element.classList.add("positionC");
              this.cups[1].view.element.classList.add("positionB");
              this.cups[2].view.element.classList.add("positionA");
            }
        ];
        
        return {
            getRandomPosition: getRandomPosition,
            getRandomPositionLength: getRandomPositionLength
        };
    })();
		
		return RandomPosition;
});

