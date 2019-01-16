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
    this.ready_notification = false;
    this.game_over_notification = false;
    this.time = 0;  //tiempo de juego transcurrido en segundos
    this.frames_rendered = 0; //ciclos de juego ejecutados
    this.is_reseting = false;
}

Game.prototype.initialize = function() {
    this.wait(3);
    this.showReadyNotification(3);
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



/*
Muestra letrero de ready durante x segundos. Si es -1 se muestra indefinido
*/
Game.prototype.showReadyNotification = function(seconds) {
    this.setReadyNotification(true);
    if(seconds == -1) return;
    setTimeout(this.setReadyNotification.bind(this, false), seconds*1000);
}

/*
Muestra letrero de gameover durante x segundos. Si es -1 se muestra indefinido
*/
Game.prototype.showGameOverNotification = function(seconds) {
    this.setGameOverNotification(true);
    if(seconds == -1) return;
    setTimeout(this.setGameOverNotification.bind(this, false), seconds*1000);
}


Game.prototype.setPaused = function(value){
    this.paused = value;
}

Game.prototype.setReadyNotification = function(value){
    this.ready_notification = value;
}

Game.prototype.setGameOverNotification = function(value){
    this.game_over_notification = value;
}

/*
recoloca los fantasmas y pacman
*/
Game.prototype.reset = function(){
    this.lives--;
    this.pacman.x = PACMAN_INIT_POS[0];
    this.pacman.y = PACMAN_INIT_POS[1];
    this.pacman.dir = "right";

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
    this.inky.speed = 1;

    this.clyde.x = CLYDE_INIT_POS[0];
    this.clyde.y = CLYDE_INIT_POS[1];
    this.clyde.in_home = true;
    this.clyde.behaviour = "waiting";
    this.clyde.mode = "loop";
    this.clyde.speed = 1;

    this.pinky.x = PINKY_INIT_POS[0];
    this.pinky.y = PINKY_INIT_POS[1];
    this.pinky.in_home = true;
    this.pinky.behaviour = "waiting";
    this.pinky.mode = "loop";
    this.pinky.speed = 1;

    this.drawLives();

    if(this.lives == 0){
        this.paused = true;
        this.showGameOverNotification(-1);
    }
    else{
        this.wait(3);
        this.showReadyNotification(3);
        
        this.frames_rendered = 0;
        this.closeHome();
    }     
    this.pacman.changeFrameSet(this.pacman.frame_sets["right"], "loop" );
    this.blinky.changeFrameSet(this.blinky.frame_sets["right"], "loop" );
    this.inky.changeFrameSet(this.inky.frame_sets["right"], "loop" );
    this.clyde.changeFrameSet(this.clyde.frame_sets["right"], "loop" );
    this.pacman.blocked = false;
    this.is_reseting = false;
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
    let clyde = this.clyde.getPositionAsTile();
    if(pacman[0] == blinky[0] && pacman[1] == blinky[1]){
        if(this.blinky.behaviour != "frightened"){
            this.pacman.die();
            if(!this.is_reseting){
                this.is_reseting = true;
                setTimeout(this.reset.bind(this), 1600);
            }                
        }
        else{

        }
    }
    if(pacman[0] == inky[0] && pacman[1] == inky[1]){
        if(this.inky.behaviour != "frightened"){
            this.pacman.die();            
            if(!this.is_reseting){
                this.is_reseting = true;
                setTimeout(this.reset.bind(this), 1600);
            }
        }
        else{
            
        }
    }
    if(pacman[0] == clyde[0] && pacman[1] == clyde[1]){
        if(this.clyde.behaviour != "frightened"){
            this.pacman.die();
            if(!this.is_reseting){
                this.is_reseting = true;
                setTimeout(this.reset.bind(this), 1600);
            }
        }
        else{
            
        }
    }
    if(pacman[0] == pinky[0] && pacman[1] == pinky[1]){
        if(this.pinky.behaviour != "frightened"){
            this.pacman.die();
            if(!this.is_reseting){
                this.is_reseting = true;
                setTimeout(this.reset.bind(this), 1600);
            }
        }
        else{
            
        }
    }
  
}

Game.prototype.closeHome = function (){
    //aqui debo modificar el path para cerrar el recinto y que no salgan los ghosts
    this.world.path.fillStyle = "#000000";
    this.world.path.fillRect(157, 159, 1, 1); //inky
    this.world.path.fillRect(181, 159, 1, 1); //pinky
    this.world.path.fillRect(205, 159, 1, 1); //clyde

    this.world.path.fillRect(181, 128, 1, 1); //cierre de fuera
}

Game.prototype.openHome = function (ghost){
    //aqui debo modificar el path para abrir  el recinto y que puedan salir los ghosts
    this.world.path.fillStyle = "#00fc1e";
    if(ghost == "inky")
        this.world.path.fillRect(157, 159, 1, 1); //inky
    else if(ghost == "pinky")
        this.world.path.fillRect(181, 159, 1, 1); //pinky
    else if(ghost == "clyde")    
        this.world.path.fillRect(205, 159, 1, 1); //clyde
    this.world.path.fillRect(181, 128, 1, 1); //cierre de fuera
}