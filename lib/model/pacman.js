function Pacman(){
    this.x = 6;
    this.y = 6;
    this.speed = 1;
    Animator.call(this, Pacman.prototype.frame_sets["right"], 10); //pacman es un animator, y arranca con el frameset de moverse a la derecha
    Object.assign(Pacman.prototype, Animator.prototype); //concatenamos los métodos de animator

    Mobile.call(this);
    Object.assign(Pacman.prototype, Mobile.prototype);

    this.mode = "loop";
}

Pacman.prototype.frame_sets = {
    "right" : [0, 1], //estos son los indices del array Game.tileset.frames
    "left"  : [2, 3], 
    "up"  : [4, 5], 
    "down"  : [6, 7], 
};

Pacman.prototype.moveLeft = function(){
    let can = this.checkPosition(this.x-this.speed,this.y);
    if(can){
        this.x -= this.speed;
        this.changeFrameSet(this.frame_sets["left"], "loop" );
    } 
}

Pacman.prototype.moveRight = function(){
    let can = this.checkPosition(this.x+this.speed,this.y);
    if(can){
        this.x += this.speed;
        this.changeFrameSet(this.frame_sets["right"], "loop" );
    }    
}

Pacman.prototype.moveUp = function(){
    let can = this.checkPosition(this.x,this.y-this.speed);
    if(can){
        this.y -= this.speed;
        this.changeFrameSet(this.frame_sets["up"], "loop" );
    }
}

Pacman.prototype.moveDown = function(){
    let can = this.checkPosition(this.x,this.y+this.speed);
    if(can){
        this.y += this.speed;
        this.changeFrameSet(this.frame_sets["down"], "loop" );
    }    
}



Pacman.prototype.updateAnimation = function(){
    //aqui tiene que ir el cambio de frameset segun el movimiento que lleve pacman
    this.animate();
}