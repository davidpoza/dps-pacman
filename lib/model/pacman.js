function Pacman(world){
    this.x = PACMAN_INIT_POS[0];
    this.y = PACMAN_INIT_POS[1];
    this.speed = 1;
    this.blocked = false;

    Animator.call(this, Pacman.prototype.frame_sets["right"], 10); //pacman es un animator, y arranca con el frameset de moverse a la derecha
    Object.assign(Pacman.prototype, Animator.prototype); //concatenamos los métodos de animator

    Mobile.call(this, world);
    Object.assign(Pacman.prototype, Mobile.prototype);

    this.mode = "loop";
}

Pacman.prototype.frame_sets = {
    "right" : [0, 1], //estos son los indices del array Game.tileset.frames
    "left"  : [2, 3], 
    "up"  : [4, 5], 
    "down"  : [6, 7],
    "die":  [123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133],
};


/**
 Realiza todas las acciones de su ciclo de vida
 */
Pacman.prototype.live = function(game, controller){
    //lo primero es ver si hemos marcado una nueva dirección
    this.changeDir();    

    //movemos en función de la dirección actual
    this.move(); 

    this.eatBall(game);  

    //ahora aplicamos las teclas pulsadas
    if(!this.blocked)
        this.reaction2Keys(controller);

    //aqui tiene que ir el cambio de frameset segun el movimiento que lleve pacman
    this.animate();
}


/**
 Efectua el movimiento en función de su dirección actual establecida
 */
Pacman.prototype.move = function(){
    if(this.dir == "left") this.moveLeft();
    else if(this.dir == "right") this.moveRight();
    else if(this.dir == "up") this.moveUp();
    else if(this.dir == "down") this.moveDown();
}


/*
Reacciona a las teclas pulsadas
*/
Pacman.prototype.reaction2Keys = function(controller){
    if (controller.left.active && this.checkNextPosition("left"))            
        this.dir = "left";
    else if (controller.left.active ){
        //console.log("no puede moverse a izq, en la siguiente oportunidad");       
        this.next_dir = "left";
    }

    else if (controller.right.active && this.checkNextPosition("right"))           
        this.dir = "right";
    else if (controller.right.active ){
        //console.log("no puede moverse a derec, en la siguiente oportunidad");       
        this.next_dir = "right";
    }    

    else if (controller.up.active && this.checkNextPosition("up"))           
        this.dir = "up";
    else if (controller.up.active ){
        //console.log("no puede moverse arriba, en la siguiente oportunidad");
        this.next_dir = "up";
    }    

    else if (controller.down.active && this.checkNextPosition("down"))           
        this.dir = "down";
    else if (controller.down.active )
    {
        //console.log("no puede moverse abajo, en la siguiente oportunidad");
        this.next_dir = "down";
    }
}


/*
Consume una bola si existe en su posición y aumenta la puntuación en tal caso.
*/
Pacman.prototype.eatBall = function(game){
    if(this.mode == "pause")
        game.sounds["eat_ball"].pause();
    if(this.dir == "")
        game.sounds["eat_ball"].pause();
    let eated_ball = game.world.balls.setBall(this.x, this.y, 0);
    
    if(eated_ball == 1){ //bola normal vale 10pts
        game.incScore(BALL_1_SCORE);
        game.world.balls.remaining--;
        if(game.sound)
            game.sounds["eat_ball"].play();
    }
    else if(eated_ball == 2){ //bola grande vale 50pts
        game.incScore(BALL_2_SCORE);
        game.world.balls.remaining--;
        if(game.sound)
            game.sounds["eat_ball"].play();       
        if(game.blinky.behaviour != "waiting" && game.blinky.behaviour != "returning"){
            game.blinky.behaviour = "frightened";
            if(game.sound)
                game.sounds["frightened"].play();
            game.blinky.changeFrameSet(game.blinky.frame_sets["frightened"], "loop" );
            if(game.blinky.timeout == undefined)
                game.blinky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.blinky.behaviour == "frightened"){
                        game.blinky.behaviour = "";
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            else{
                clearTimeout(game.blinky.timeout);
                game.blinky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.blinky.behaviour == "frightened"){
                        game.blinky.behaviour = "";
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            }
        }
        if(game.inky.behaviour != "waiting" && game.inky.behaviour != "returning"){
            game.inky.behaviour = "frightened";
            if(game.sound)
                game.sounds["frightened"].play();
            game.inky.changeFrameSet(game.inky.frame_sets["frightened"], "loop" );
            if(game.inky.timeout == undefined)
                game.inky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.inky.behaviour == "frightened"){
                        game.inky.behaviour = "";
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            else{
                clearTimeout(game.inky.timeout);
                game.inky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.inky.behaviour == "frightened"){
                        game.inky.behaviour = "";
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            }
        }

        if(game.clyde.behaviour != "waiting" && game.clyde.behaviour != "returning"){
            game.clyde.behaviour = "frightened";
            if(game.sound)
                game.sounds["frightened"].play();
            game.clyde.changeFrameSet(game.clyde.frame_sets["frightened"], "loop" );
            if(game.clyde.timeout == undefined)
                game.clyde.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.clyde.behaviour == "frightened"){
                        game.clyde.behaviour = "";
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            else{
                clearTimeout(game.clyde.timeout);
                game.clyde.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.clyde.behaviour == "frightened"){
                        game.clyde.behaviour = "";
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            }
        }

        if(game.pinky.behaviour != "waiting" && game.pinky.behaviour != "returning"){
            game.pinky.behaviour = "frightened";
            if(game.sound)
                game.sounds["frightened"].play();
            game.pinky.changeFrameSet(game.pinky.frame_sets["frightened"], "loop" );
            if(game.pinky.timeout == undefined)
                game.pinky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.pinky.behaviour == "frightened"){
                        game.pinky.behaviour = "";
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            else{
                clearTimeout(game.pinky.timeout);
                game.pinky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.pinky.behaviour == "frightened"){
                        game.pinky.behaviour = "";
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            }
        }


    }
}


/*
Obtiene la posicion actual como tile.
Devuelve el tile como array de coordenadas fila,col
*/
Pacman.prototype.getPositionAsTile = function(){
    let col = Math.floor(this.x / TILE_SIZE) +1;
    let row = Math.floor(this.y / TILE_SIZE) +1;
    return [row,col];
}


/*
Obtiene la posicion actual como tile.
Devuelve el tile como array de coordenadas fila,col
*/
Pacman.prototype.die = function(game){
    //animación de muerte
    this.dir = "";
    this.next_dir = "";
    this.changeFrameSet(this.frame_sets["die"], "loop" );
    this.blocked = true;
    if(game.sound)
        game.sounds["die"].play();
}