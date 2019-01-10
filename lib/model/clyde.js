/*
Fantasma naranja
 */
function Clyde(world){
    this.x = 181;
    this.y = 158;

    this.speed = 1;

    Animator.call(this, Clyde.prototype.frame_sets["up"], 10); 
    Object.assign(Clyde.prototype, Animator.prototype); 

    Ghost.call(this, world); 
    Object.assign(Clyde.prototype, Ghost.prototype);
}


Clyde.prototype.frame_sets = {
    "right" : [79, 80], //estos son los indices del array Game.tileset.frames
    "down"  : [81, 82], 
    "left"  : [83, 84], 
    "up"  : [85, 86], 
};