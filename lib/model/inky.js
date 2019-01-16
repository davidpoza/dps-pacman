/*
Fantasma azul
 */
function Inky(world){
    this.x = INKY_INIT_POS[0];
    this.y = INKY_INIT_POS[1];

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
    "frightened" : [119,120,121,122],
    "returning_right" : [111, 112], 
    "returning_down"  : [113, 114], 
    "returning_left"  : [115, 116], 
    "returning_up"  : [117, 118],
};

Inky.prototype.getOutHome = function(){
    this.makeSequence(["up", "right", "up"]);
    if(this.y <= POS_CONSIDERED_OUT_HOME[1]) //si hemos completado la secuencia
    {
        this.in_home = false;
        this.speed = 1;
        this.current_sequence = [];
    }    
}

Inky.prototype.inChaseMode = function(pacman){    
    this.targetTile = [...pacman.getPositionAsTile()];
    if(this.behaviour != "chase"){
        this.reverseDir();
        this.behaviour = "chase";
    }
    
}

Inky.prototype.inScatterMode = function(){
    this.behaviour = "scatter";
    this.targetTile = [...INKY_SCATTER_MODE_TARGET];
    if(this.behaviour != "scatter"){
        this.reverseDir();
        this.behaviour = "scatter";
    }
}