/*
Objeto juego, que controla el bucle principal de dibujado y
la lógica del juego, además de contener todos los objetos de elementos del juego (pacman, ghosts, walls, etc)
*/
function Game() {
    this.world = {
        background_color: BACKGROUND_COLOR,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    }
    this.pacman = new Pacman();
    
}

Game.prototype.initialize = function() {
    console.log("Iniciando juego...");
}


/*
El bucle del juego
*/
Game.prototype.start = function(updateCallback, renderCallback) {
    this._timer = setInterval(function() {
      this.update(updateCallback, renderCallback);
    }.bind(this), TIME_DELTA);
  }

/*
La función que actualiza _la lógica del juego_ en cada pasada del bucle
*/
Game.prototype.update = function(updateCallback, renderCallback){
    //console.log("actualizando elementos del juego...");
    updateCallback();
    renderCallback();
}