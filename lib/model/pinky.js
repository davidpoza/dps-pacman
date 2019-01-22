/*
Fantasma rosa
 */
function Pinky(game){
    this.x = PINKY_INIT_POS[0];
    this.y = PINKY_INIT_POS[1];
    this.game = game;
    this.speed = 1;
    this.targetTile = PINKY_SCATTER_MODE_TARGET;

    Animator.call(this, Pinky.prototype.frame_sets["up"], 10); 
    Object.assign(Pinky.prototype, Animator.prototype); 

    Ghost.call(this, game.world); 
    Object.assign(Pinky.prototype, Ghost.prototype);

}


Pinky.prototype.frame_sets = {
    "right" : [87, 88], //estos son los indices del array Game.tileset.frames
    "down"  : [89, 90], 
    "left"  : [91, 92], 
    "up"  : [93, 94],
    "frightened" : [119,120,121,122],
    "returning_right" : [111, 112], 
    "returning_down"  : [113, 114], 
    "returning_left"  : [115, 116], 
    "returning_up"  : [117, 118],
};


Pinky.prototype.getOutHome = function(){
    this.makeSequence(["up"]);
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


Pinky.prototype.inChaseMode = function(pacman){
    // su target se coloca 4 tiles por delante de pacman    
    this.targetTile = [...pacman.getPositionAsTile()];
    if(pacman.dir == "up"){
        this.targetTile[0]-=4;
        if(this.targetTile[0]<0) this.targetTile[0] = 0;
    }
    else if(pacman.dir == "down"){
        this.targetTile[0]+=4;
        if(this.targetTile[0]>(NROWS-1)) this.targetTile[0] = NROWS-1;
    }
    else if(pacman.dir == "left"){
        this.targetTile[1]-=4;
        if(this.targetTile[1]<0) this.targetTile[1] = 0;
    }
    else if(pacman.dir == "right"){
        this.targetTile[1]+=4;
        if(this.targetTile[1]>(NCOLS-1)) this.targetTile[1] = NCOLS-1;
    }
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