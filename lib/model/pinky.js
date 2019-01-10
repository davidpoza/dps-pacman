/*
Fantasma rosa
 */
function Pinky(path){
    this.x = 157;
    this.y = 158;

    this.speed = 1;

    Animator.call(this, Pinky.prototype.frame_sets["up"], 10); 
    Object.assign(Pinky.prototype, Animator.prototype); 

    Ghost.call(this, path); 
    Object.assign(Pinky.prototype, Ghost.prototype);
}


Pinky.prototype.frame_sets = {
    "right" : [87, 88], //estos son los indices del array Game.tileset.frames
    "down"  : [89, 90], 
    "left"  : [91, 92], 
    "up"  : [93, 94], 
};