function Pacman(){
    this.width = PACMAN_WIDTH;
    this.height = PACMAN_HEIGHT;
    this.x = 0;
    this.y = 0;
    this.speed = 1;
}


Pacman.prototype.moveLeft = function(){
    this.x -= this.speed;

}

Pacman.prototype.moveRight = function(){
    this.x += this.speed;
}

Pacman.prototype.moveUp = function(){
    this.y -= this.speed;
}

Pacman.prototype.moveDown = function(){
    this.y += this.speed;
}

Pacman.prototype.update = function(){
    
}