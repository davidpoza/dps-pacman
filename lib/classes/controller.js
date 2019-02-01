/*
Clase que gestiona los controles del juego, contiene un objeto boton por cada tecla que 
gestiona.
*/
function Controller() {
    this.down  = new Controller.ButtonInput();
    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();
    this.touchstartX = 0;
    this.touchstartY = 0;
    this.touchendX = 0;
    this.touchendY = 0;
    this.gesture_zone = document.getElementById('canvas');
    this.threshold = SWIPE_THRESHOLD, //distancia minima requerida para considerar un swipe
    this.restraint = SWIPE_RESTRAINT, // distancia máxima permitida en la perpendicular a la dirección del swipe. Es decir lo recto que debemos hacer el swipe
    this.allowedTime = SWIPE_ALLOWEDTIME, // tiempo maximo para realizar el swipe
    this.startTime = 0;

    this.handleKeyDownUp = function(event){
        let down;
        if(event.type == "keydown")
            down = true;
        else
            down = false;

        switch(event.keyCode){
            case 37: this.left.getInput(down); break;
            case 38: this.up.getInput(down); break;
            case 39: this.right.getInput(down); break;
            case 40: this.down.getInput(down); break;
        }

        //console.log("has presionado la tecla "+ event.keyCode);
    };

    this.handleGesture = function(event) {        
        this.left.active = false;
        this.right.active = false;
        this.up.active = false;
        this.down.active = false;
        if(event.type =="touchstart"){
            this.startTime = new Date().getTime();
            this.touchstartX = event.changedTouches[0].screenX;
            this.touchstartY = event.changedTouches[0].screenY;
        }
        else if(event.type =="touchmove"){
            event.preventDefault();
        }
        else if(event.type =="touchend"){
            this.touchendX = event.changedTouches[0].screenX;
            this.touchendY = event.changedTouches[0].screenY;

            let elapsedTime = new Date().getTime() - this.startTime;
            let distX =  this.touchendX - this.touchstartX;
            let distY =  this.touchendY - this.touchstartY;
            let swipedir = "none";

            if(elapsedTime <= this.allowedTime){
                if (Math.abs(distX) >= this.threshold && Math.abs(distY) <= this.restraint){ 
                    swipedir = (distX < 0)? 'left' : 'right';
                }
                else if (Math.abs(distY) >= this.threshold && Math.abs(distX) <= this.restraint){ 
                    swipedir = (distY < 0)? 'up' : 'down';
                }
                var swiped = 'swiped: ';
                if (swipedir == "left") {
                    this.left.active = true;
                }
                if (swipedir == "right") {
                    this.right.active = true;
                }
                if (swipedir == "up") {
                    this.up.active = true;
                }
                if (swipedir == "down") {
                    this.down.active = true;
                }

            }

            
        }

        
    }

};

  

Controller.ButtonInput = function() {
    this.active = false
};

Controller.ButtonInput.prototype.getInput =  function(down) {  
    if (this.active != down) this.active = down;
};