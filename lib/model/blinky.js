/*
Fantasma rojo
 */
function Blinky(path_image){
    this.x = 157;
    this.y = 127;

    this.speed = 1;

    Animator.call(this, Blinky.prototype.frame_sets["up"], 10); 
    Object.assign(Blinky.prototype, Animator.prototype); 

    Ghost.call(this, path_image); 
    Object.assign(Blinky.prototype, Ghost.prototype);
    
}


Blinky.prototype.frame_sets = {
    "right" : [95, 96], //estos son los indices del array Game.tileset.frames
    "down"  : [97, 98], 
    "left"  : [99, 100], 
    "up"  : [101, 102], 
};

