/*
Objeto juego, que controla el bucle principal de dibujado y
la lógica del juego, además de contener todos los objetos de elementos del juego (pacman, ghosts, walls, etc)
*/
function Game(path_image) {
    this.world = new World(path_image);
    this.pacman = new Pacman(this.world);
    this.pinky = new Pinky(this.world);
    this.clyde = new Clyde(this.world);
    this.blinky = new Blinky(this.world);
    this.inky = new Inky(this.world);
    this.tile_set = new TileSet();
    this.score = 0;
    this.time = 0;  //tiempo de juego transcurrido en segundos
    this.frames_rendered = 0; //ciclos de juego ejecutados
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
    this.frames_rendered++;
    if(this.frames_rendered % FPS == 0){
        this.time++;
        console.log(this.time);
    }
    updateCallback();
    renderCallback();
}

Game.prototype.incScore = function(value){
    this.score += value;
    let elem = document.getElementById("score");
    elem.innerHTML = this.score;
}