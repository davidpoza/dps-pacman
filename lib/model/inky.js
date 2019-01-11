/*
Fantasma azul
 */
function Inky(world){
    this.x = 133;
    this.y = 158;

    this.speed = 1;

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