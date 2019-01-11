/*
Fantasma rosa
 */
function Pinky(world){
    this.x = 157;
    this.y = 158;

    this.speed = 1;
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
    if(this.current_sequence.length == 0) //si hemos completado la secuencia
        this.in_home = false;
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