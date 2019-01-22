/*
Fantasma rojo
 */
function Blinky(game){
    this.x = BLINKY_INIT_POS[0];
    this.y = BLINKY_INIT_POS[1];
    this.game = game;
    this.speed = 1;
    this.targetTile = BLINKY_SCATTER_MODE_TARGET;
    
    
    Animator.call(this, Blinky.prototype.frame_sets["up"], 10); 
    Object.assign(Blinky.prototype, Animator.prototype); 

    Ghost.call(this,game.world); 
    Object.assign(Blinky.prototype, Ghost.prototype);
    
    this.in_home = false;
    this.behaviour = "";
}


Blinky.prototype.frame_sets = {
    "right" : [95, 96], //estos son los indices del array Game.tileset.frames
    "down"  : [97, 98], 
    "left"  : [99, 100], 
    "up"  : [101, 102],
    "frightened" : [119,120,121,122],
    "returning_right" : [111, 112], 
    "returning_down"  : [113, 114], 
    "returning_left"  : [115, 116], 
    "returning_up"  : [117, 118],
};

Blinky.prototype.getOutHome = function(){
    this.makeSequence(["up"]);
    if(this.y <= POS_CONSIDERED_OUT_HOME[1]) //misma forma de salir que pinky
    {
        this.in_home = false;
        this.game.closeHome();
        this.current_sequence = [];
        this.dir = "left";
        this.speed = 1;
        this.speed_divisor = 2;
    }    
}





Blinky.prototype.inChaseMode = function(pacman){    
    this.targetTile = [...pacman.getPositionAsTile()];
    if(this.behaviour != "chase"){
        this.reverseDir();
        this.behaviour = "chase";
    }
    
}

Blinky.prototype.inScatterMode = function(){
    this.behaviour = "scatter";
    this.targetTile = [...BLINKY_SCATTER_MODE_TARGET];
    if(this.behaviour != "scatter"){
        this.reverseDir();
        this.behaviour = "scatter";
    }
}