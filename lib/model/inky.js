/*
Fantasma azul
 */
function Inky(world){
    this.x = 133;
    this.y = 158;

    this.speed = 1;
    this.targetTile = INKY_SCATTER_MODE_TARGET;

    Animator.call(this, Inky.prototype.frame_sets["up"], 10); 
    Object.assign(Inky.prototype, Animator.prototype); 

    Ghost.call(this, world); 
    Object.assign(Inky.prototype, Ghost.prototype);

    
}


Inky.prototype.frame_sets = {
    "right" : [103, 104], //estos son los indices del array Game.tileset.frames
    "down"  : [105, 106], 
    "left"  : [107, 108], 
    "up"  : [109, 110], 
};

Inky.prototype.getOutHome = function(){
    this.makeSequence(["up", "right", "up"]);
    if(this.current_sequence.length == 0) //si hemos completado la secuencia
        this.in_home = false;
}

Inky.prototype.setChaseMode = function(pacman){
    this.behaviour = "chase";
    this.targetTile = [...pacman.getPositionAsTile()];
    this.reverseDir();
}

Inky.prototype.setScatterMode = function(){
    this.behaviour = "scatter";
    this.targetTile = [...INKY_SCATTER_MODE_TARGET];
    this.reverseDir();
}