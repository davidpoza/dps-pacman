/*
Fantasma azul
 */
function Inky(game){
    this.x = INKY_INIT_POS[0];
    this.y = INKY_INIT_POS[1];
    this.game = game;
    this.speed = 1;
    this.targetTile = INKY_SCATTER_MODE_TARGET;

    Animator.call(this, Inky.prototype.frame_sets["up"], 10); 
    Object.assign(Inky.prototype, Animator.prototype); 

    Ghost.call(this, game.world); 
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
        this.game.closeHome();
        this.speed = 1;
        this.speed_divisor = 2;
        this.current_sequence = [];
        this.dir = "left";
    }    
}



Inky.prototype.inChaseMode = function(pacman){    
    let pacman_position = [...pacman.getPositionAsTile()];
    let blinky_position = this.game.blinky.getPositionAsTile();
    if(pacman.dir == "up"){
        pacman_position[0]-=2;
        if(pacman_position[0]<0) pacman_position[0] = 0;
    }
    else if(pacman.dir == "down"){
        pacman_position[0]+=2;
        if(pacman_position[0]>(NROWS-1)) pacman_position[0] = NROWS-1;
    }
    else if(pacman.dir == "left"){
        pacman_position[1]-=2;
        if(pacman_position[1]<0) pacman_position[1] = 0;
    }
    else if(pacman.dir == "right"){
        pacman_position[1]+=2;
        if(pacman_position[1]>(NCOLS-1)) pacman_position[1] = NCOLS-1;
    }

    let dif_rows = pacman_position[0] - blinky_position[0];
    let dif_cols = pacman_position[1] - blinky_position[1];

    this.targetTile = [...pacman_position];
    this.targetTile[0] += dif_rows;
    this.targetTile[1] += dif_cols;
    if(this.targetTile[0]>(NROWS-1)) this.targetTile[0] = NROWS-1;
    if(this.targetTile[1]>(NCOLS-1)) this.targetTile[1] = NCOLS-1;
    if(this.targetTile[0]<0) this.targetTile[0] = 0;
    if(this.targetTile[1]<0) this.targetTile[1] = 0;

    console.log("inky: "+this.targetTile);

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