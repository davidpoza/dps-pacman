function Pacman(path_image){
    this.x = 6;
    this.y = 6;
    this.speed = 1;


    Animator.call(this, Pacman.prototype.frame_sets["right"], 10); //pacman es un animator, y arranca con el frameset de moverse a la derecha
    Object.assign(Pacman.prototype, Animator.prototype); //concatenamos los métodos de animator

    Mobile.call(this, path_image);
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
    let can = this.checkNextPositionTry("left");
    if(can>0){
        this.x -= can;
        this.changeFrameSet(this.frame_sets["left"], "loop" );
        if(this.x < -24) //si entramos en el tuner de la izquierda
            this.x = SCREEN_WIDTH;
    }
    else
        this.mode = "pause";
}

Pacman.prototype.moveRight = function(){
    let can = this.checkNextPositionTry("right");
    if(can>0){
        this.x += can;
        this.changeFrameSet(this.frame_sets["right"], "loop" );
    }
    else
        this.mode = "pause";
    if(this.x > SCREEN_WIDTH) //si entramos en el tuner de la izquierda
        this.x = -24;
}

Pacman.prototype.moveUp = function(){
    let can = this.checkNextPositionTry("up");
    if(can>0){        
        this.y -= can;
        this.changeFrameSet(this.frame_sets["up"], "loop" );
    }
    else
        this.mode = "pause";

}

Pacman.prototype.moveDown = function(){
    let can = this.checkNextPositionTry("down");
    if(can>0){        
        this.y += can;
        this.changeFrameSet(this.frame_sets["down"], "loop" );
    }
    else
        this.mode = "pause";

}



Pacman.prototype.updateAnimation = function(){
    //aqui tiene que ir el cambio de frameset segun el movimiento que lleve pacman
    this.animate();
}