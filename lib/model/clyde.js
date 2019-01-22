/*
Fantasma naranja
 */
function Clyde(game){
    this.x = CLYDE_INIT_POS[0];
    this.y = CLYDE_INIT_POS[1];
    this.game = game;
    this.speed = 1;
    this.targetTile = CLYDE_SCATTER_MODE_TARGET;

    Animator.call(this, Clyde.prototype.frame_sets["up"], 10); 
    Object.assign(Clyde.prototype, Animator.prototype); 

    Ghost.call(this, game.world); 
    Object.assign(Clyde.prototype, Ghost.prototype);

}


Clyde.prototype.frame_sets = {
    "right" : [79, 80], //estos son los indices del array Game.tileset.frames
    "down"  : [81, 82], 
    "left"  : [83, 84], 
    "up"  : [85, 86],
    "frightened" : [119,120,121,122],
    "returning_right" : [111, 112], 
    "returning_down"  : [113, 114], 
    "returning_left"  : [115, 116], 
    "returning_up"  : [117, 118],};

Clyde.prototype.getOutHome = function(){
    this.makeSequence(["up", "left", "up"]);
    if(this.y <= POS_CONSIDERED_OUT_HOME[1]) //si hemos completado la secuencia
    {
        this.in_home = false;
        this.game.closeHome();
        this.speed = 1;
        this.speed_divisor = 2;
        this.current_sequence = [];
        this.dir = "left";
    }    
}


Clyde.prototype.inChaseMode = function(pacman){    
    let distance = this.distanceFromTile2Tile(pacman.getPositionAsTile(), this.getPositionAsTile());
    if(distance > 8){
        this.targetTile = [...pacman.getPositionAsTile()];
    }
    else{
        this.targetTile = [...CLYDE_SCATTER_MODE_TARGET];
    }
    if(this.behaviour != "chase"){
        this.reverseDir();
        this.behaviour = "chase";
    }
    
}

Clyde.prototype.inScatterMode = function(){
    this.behaviour = "scatter";
    this.targetTile = [...CLYDE_SCATTER_MODE_TARGET];
    if(this.behaviour != "scatter"){
        this.reverseDir();
        this.behaviour = "scatter";
    }
}