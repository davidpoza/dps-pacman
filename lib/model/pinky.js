/*
Fantasma rosa
 */
function Pinky(world){
    this.x = PINKY_INIT_POS[0];
    this.y = PINKY_INIT_POS[1];

    this.speed = 0.5;
    this.targetTile = PINKY_SCATTER_MODE_TARGET;

    Animator.call(this, Pinky.prototype.frame_sets["up"], 10); 
    Object.assign(Pinky.prototype, Animator.prototype); 

    Ghost.call(this, world); 
    Object.assign(Pinky.prototype, Ghost.prototype);

}


Pinky.prototype.frame_sets = {
    "right" : [87, 88], //estos son los indices del array Game.tileset.frames
    "down"  : [89, 90], 
    "left"  : [91, 92], 
    "up"  : [93, 94], 
};


Pinky.prototype.getOutHome = function(){
    this.makeSequence(["up"]);
    if(this.x == POS_CONSIDERED_OUT_HOME[0] && this.y == POS_CONSIDERED_OUT_HOME[1]) //si hemos completado la secuencia
    {
        this.in_home = false;
        this.speed = 1;
        this.current_sequence = [];
    }    
}

Pinky.prototype.inChaseMode = function(pacman){    
    this.targetTile = [...pacman.getPositionAsTile()];
    if(this.behaviour != "chase"){
        this.reverseDir();
        this.behaviour = "chase";
    }
    
}

Pinky.prototype.inScatterMode = function(){
    this.behaviour = "scatter";
    this.targetTile = [...PINKY_SCATTER_MODE_TARGET];
    if(this.behaviour != "scatter"){
        this.reverseDir();
        this.behaviour = "scatter";
    }
}