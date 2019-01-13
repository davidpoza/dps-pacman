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
    this.lives = 3;
    this.paused = true;
    this.time = 0;  //tiempo de juego transcurrido en segundos
    this.frames_rendered = 0; //ciclos de juego ejecutados
}

Game.prototype.initialize = function() {
    this.wait(5);
    this.drawLives();
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
Espera seconds
*/
Game.prototype.wait = function(seconds) {
    this.paused = true;
    setInterval(this.setPaused.bind(this, false), seconds*1000);
  }


Game.prototype.setPaused = function(value){
    this.paused = value;
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

/*
Incrementa la puntuación con el valor pasado como parámetro.
*/
Game.prototype.incScore = function(value){
    this.score += value;
    let elem = document.getElementById("score");
    elem.innerHTML = this.score;
}

/*
Pinta el numero de vidas
*/
Game.prototype.drawLives = function(){
    let lives = document.getElementById("lives");
    for(let i =0; i<this.lives; i++){
        let live = document.createElement("img");
        live.src = "assets/pacman_live.png";
        lives.appendChild(live);
    }
    
}