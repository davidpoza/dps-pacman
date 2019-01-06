function Pacman(){
    this.width = PACMAN_WIDTH;
    this.height = PACMAN_HEIGHT;
    this.x = 0;
    this.y = 0;
    this.speed = 1;
    Animator.call(this, Pacman.prototype.frame_sets["right"], 10); //pacman es un animator, y arranca con el frameset de moverse a la derecha
    Object.assign(Pacman.prototype, Animator.prototype); //concatenamos los métodos de animator
    this.mode = "loop";
}

Pacman.prototype.frame_sets = {
    "right" : [0, 1], //estos son los indices del array Game.tileset.frames
    "left"  : [2, 3], 
    "up"  : [4, 5], 
    "down"  : [6, 7], 
};

Pacman.prototype.moveLeft = function(){
    this.x -= this.speed;
    this.changeFrameSet(this.frame_sets["left"], "loop" );
}

Pacman.prototype.moveRight = function(){
    this.x += this.speed;
    this.changeFrameSet(this.frame_sets["right"], "loop" );
}

Pacman.prototype.moveUp = function(){
    this.y -= this.speed;
    this.changeFrameSet(this.frame_sets["up"], "loop" );
}

Pacman.prototype.moveDown = function(){
    this.y += this.speed;
    this.changeFrameSet(this.frame_sets["down"], "loop" );
    
}



Pacman.prototype.updateAnimation = function(){
    //aqui tiene que ir el cambio de frameset segun el movimiento que lleve pacman
    this.animate();
}