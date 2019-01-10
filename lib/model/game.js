/*
Objeto juego, que controla el bucle principal de dibujado y
la lógica del juego, además de contener todos los objetos de elementos del juego (pacman, ghosts, walls, etc)
*/
function Game(path_image) {
    this.world = new World();
    this.pacman = new Pacman(path_image);
    this.pinky = new Pinky(path_image);
    this.clyde = new Clyde(path_image);
    this.blinky = new Blinky(path_image);
    this.inky = new Inky(path_image);
    this.tile_set = new TileSet();
    this.score = 0;
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

Game.prototype.incScore = function(value){
    this.score += value;
    let elem = document.getElementById("score");
    elem.innerHTML = this.score;
}