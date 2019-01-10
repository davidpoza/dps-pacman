/**
Esta clase no debe usarse de forma independiente sino heredando de ella
 */
function Ghost(path){
    

    Mobile.call(this, path);
    Object.assign(Ghost.prototype, Mobile.prototype);

    this.mode = "loop";
}

/**
 Realiza todas las acciones de su ciclo de vida
 */
Ghost.prototype.live = function(game){
    
    //aqui tiene que ir el cambio de frameset segun el movimiento que lleve pacman
    this.animate();
}