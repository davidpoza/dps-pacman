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
    this.closed_home = true;
}

Game.prototype.initialize = function() {
    this.wait(3);
    this.drawLives();
    this.closeHome();
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
    setTimeout(this.setPaused.bind(this, false), seconds*1000);
  }


Game.prototype.setPaused = function(value){
    this.paused = value;
}

/*
recoloca los fantasmas y pacman
*/
Game.prototype.reset = function(){
    this.pacman.x = PACMAN_INIT_POS[0];
    this.pacman.y = PACMAN_INIT_POS[1];
    this.pacman.dir = "right";
    this.pacman.frame_value = this.pacman.frame_sets["right"][0]; 

    this.blinky.x = BLINKY_INIT_POS[0];
    this.blinky.y = BLINKY_INIT_POS[1];
    this.blinky.in_home = false;
    this.blinky.behaviour = "";
    this.blinky.mode = "loop";

    this.inky.x = INKY_INIT_POS[0];
    this.inky.y = INKY_INIT_POS[1];
    this.inky.in_home = true;
    this.inky.behaviour = "waiting";
    this.inky.mode = "loop";
    this.inky.speed = 0.5;

    this.clyde.x = CLYDE_INIT_POS[0];
    this.clyde.y = CLYDE_INIT_POS[1];
    this.clyde.in_home = true;
    this.clyde.behaviour = "waiting";
    this.clyde.mode = "loop";
    this.clyde.speed = 0.5;

    this.pinky.x = PINKY_INIT_POS[0];
    this.pinky.y = PINKY_INIT_POS[1];
    this.pinky.in_home = true;
    this.pinky.behaviour = "waiting";
    this.pinky.mode = "loop";
    this.pinky.speed = 0.5;

    this.wait(3);
    this.drawLives();
    this.frames_rendered = 0;
    this.closeHome();
}


/*
La función que actualiza _la lógica del juego_ en cada pasada del bucle
*/
Game.prototype.update = function(updateCallback, renderCallback){
    //console.log("actualizando elementos del juego...");
    if(!this.paused)
    this.frames_rendered++;
    if(this.frames_rendered % FPS == 0 && !this.paused){
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
    lives.innerHTML = "";
    for(let i =0; i<this.lives; i++){
        let live = document.createElement("img");
        live.src = "assets/pacman_live.png";
        lives.appendChild(live);
    }
    
}

/*
controla la salida de los diferentes fantasmas
*/
Game.prototype.manageGhostDeparture = function(){
    if(this.frames_rendered == 5*FPS && this.pinky.behaviour=="waiting")  //sale pinky
    {
        this.pinky.behaviour = "";
        this.openHome("pinky");
    }    
    if(this.frames_rendered == 10*FPS && this.inky.behaviour=="waiting")  //sale inky
    {
        this.inky.behaviour = "";
        this.openHome("inky");
    }   
    if(this.frames_rendered == 15*FPS && this.clyde.behaviour=="waiting")  //sale clyde
    {
        this.clyde.behaviour = "";
        this.openHome("clyde");
    }    

}

/*
alcance de fantasmas a pacman
*/
Game.prototype.checkPacmanGhostsCollision = function(){
    let pacman = this.pacman.getPositionAsTile();
    let blinky = this.blinky.getPositionAsTile();
    let pinky = this.pinky.getPositionAsTile();
    let inky = this.inky.getPositionAsTile();
    let clyde = this.clyde.getPositionAsTile()
    if((pacman[0] == blinky[0] && pacman[1] == blinky[1]) ||
         (pacman[0] == inky[0] && pacman[1] == inky[1]) ||
         (pacman[0] == clyde[0] && pacman[1] == clyde[1]) ||
         (pacman[0] == pinky[0] && pacman[1] == pinky[1]) ){
            
            this.pacman.die();
            this.lives--;
            this.reset();
        }   
}

Game.prototype.closeHome = function (){
    //aqui debo modificar el path para cerrar el recinto y que no salgan los ghosts
    this.closed_home = true;
}

Game.prototype.openHome = function (){
    //aqui debo modificar el path para abrir  el recinto y que puedan salir los ghosts
    this.closed_home = false;
}