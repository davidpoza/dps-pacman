/*
Fantasma rojo
 */
function Blinky(world){
    this.x = BLINKY_INIT_POS[0];
    this.y = BLINKY_INIT_POS[1];

    this.speed = 1;
    this.targetTile = BLINKY_SCATTER_MODE_TARGET;
    
    
    Animator.call(this, Blinky.prototype.frame_sets["up"], 10); 
    Object.assign(Blinky.prototype, Animator.prototype); 

    Ghost.call(this,world); 
    Object.assign(Blinky.prototype, Ghost.prototype);
    
    this.in_home = false;
}


Blinky.prototype.frame_sets = {
    "right" : [95, 96], //estos son los indices del array Game.tileset.frames
    "down"  : [97, 98], 
    "left"  : [99, 100], 
    "up"  : [101, 102], 
};

Blinky.prototype.getOutHome = function(){
    this.makeSequence(["up", "right", "up"]);
    if(this.current_sequence.length == 0) //si hemos completado la secuencia
        this.in_home = false;
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