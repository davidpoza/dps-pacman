/*
Clase que gestiona los controles del juego, contiene un objeto boton por cada tecla que 
gestiona.
*/
function Controller() {
    this.down  = new Controller.ButtonInput();
    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();

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

        console.log("has presionado la tecla "+ event.keyCode);
    };

};

  

Controller.ButtonInput = function() {
    this.active = false
};

Controller.ButtonInput.prototype.getInput =  function(down) {  
    if (this.active != down) this.active = down;
};