function Pacman(world){
    this.x = PACMAN_INIT_POS[0];
    this.y = PACMAN_INIT_POS[1];
    this.speed = 1;
    this.render_delay = 1;
    this.speed_divisor = 2;
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
    this.render_delay++;
    if(this.render_delay>=this.speed_divisor) this.render_delay=0;
    if(this.render_delay == 1 || this.speed_divisor == 1){
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
        game.prize_launched = false;
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
            game.blinky.speed_divisor = 3;
            if(game.blinky.timeout == undefined)
                game.blinky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.blinky.behaviour == "frightened"){
                        game.blinky.behaviour = "";
                        game.blinky.speed_divisor = 2;
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            else{
                clearTimeout(game.blinky.timeout);
                game.blinky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.blinky.behaviour == "frightened"){
                        game.blinky.behaviour = "";
                        game.blinky.speed_divisor = 2;
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
            game.inky.speed_divisor = 3;
            if(game.inky.timeout == undefined)
                game.inky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.inky.behaviour == "frightened"){
                        game.inky.behaviour = "";
                        game.inky.speed_divisor = 2;
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            else{
                clearTimeout(game.inky.timeout);
                game.inky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.inky.behaviour == "frightened"){
                        game.inky.behaviour = "";
                        game.inky.speed_divisor = 2;
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
            game.clyde.speed_divisor = 3;
            if(game.clyde.timeout == undefined)
                game.clyde.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.clyde.behaviour == "frightened"){
                        game.clyde.behaviour = "";
                        game.clyde.speed_divisor = 2;
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            else{
                clearTimeout(game.clyde.timeout);
                game.clyde.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.clyde.behaviour == "frightened"){
                        game.clyde.behaviour = "";
                        game.clyde.speed_divisor = 2;
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
            game.pinky.speed_divisor = 3;
            if(game.pinky.timeout == undefined)
                game.pinky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.pinky.behaviour == "frightened"){
                        game.pinky.behaviour = "";
                        game.pinky.speed_divisor = 2;
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            else{
                clearTimeout(game.pinky.timeout);
                game.pinky.timeout = setTimeout(function(){
                    game.points_per_ghost = 200;
                    if(game.pinky.behaviour == "frightened"){
                        game.pinky.behaviour = "";
                        game.pinky.speed_divisor = 2;
                        game.sounds["frightened"].pause();
                    }
                },FRIGHTENED_DURATION*1000);
            }
        }


    }
    else if(eated_ball == 3){ //cereza
        if(game.sound)
                game.sounds["eat_fruit"].play();
        game.incScore(CHERRY_SCORE);
        if(game.points_notification.length == 0){
            game.points_notification = [this.x, this.y+SPRITE_SIZE, CHERRY_SCORE];
            game.paused = true;
            setTimeout(game.removePointsNotification.bind(game), 1000);
        }
    }
    else if(eated_ball == 4){ //fresa
        if(game.sound)
                game.sounds["eat_fruit"].play();
        game.incScore(STRAWBERRY_SCORE);
        if(game.points_notification.length == 0){
            game.points_notification = [this.x, this.y+SPRITE_SIZE, STRAWBERRY_SCORE];
            game.paused = true;
            setTimeout(game.removePointsNotification.bind(game), 1000);
        }
    }
    else if(eated_ball == 5){ //naranja
        if(game.sound)
                game.sounds["eat_fruit"].play();
        game.incScore(ORANGE_SCORE);
        if(game.points_notification.length == 0){
            game.points_notification = [this.x, this.y+SPRITE_SIZE, ORANGE_SCORE];
            game.paused = true;
            setTimeout(game.removePointsNotification.bind(game), 1000);
        }
    }
    else if(eated_ball == 7){ //manzana
        if(game.sound)
                game.sounds["eat_fruit"].play();
        game.incScore(APPLE_SCORE);
        if(game.points_notification.length == 0){
            game.points_notification = [this.x, this.y+SPRITE_SIZE, APPLE_SCORE];
            game.paused = true;
            setTimeout(game.removePointsNotification.bind(game), 1000);
        }
    }
    else if(eated_ball == 8){ //uvas
        if(game.sound)
                game.sounds["eat_fruit"].play();
        game.incScore(GRAPES_SCORE);
        if(game.points_notification.length == 0){
            game.points_notification = [this.x, this.y+SPRITE_SIZE, GRAPES_SCORE];
            game.paused = true;
            setTimeout(game.removePointsNotification.bind(game), 1000);
        }
    }
    else if(eated_ball == 9){ //galaxian
        if(game.sound)
                game.sounds["eat_fruit"].play();
        game.incScore(GALAXIAN_SCORE);
        if(game.points_notification.length == 0){
            game.points_notification = [this.x, this.y+SPRITE_SIZE, GALAXIAN_SCORE];
            game.paused = true;
            setTimeout(game.removePointsNotification.bind(game), 1000);
        }
    }
    else if(eated_ball == 6){ //campana
        if(game.sound)
                game.sounds["eat_fruit"].play();
        game.incScore(GALAXIAN_SCORE);
        if(game.points_notification.length == 0){
            game.points_notification = [this.x, this.y+SPRITE_SIZE, GALAXIAN_SCORE];
            game.paused = true;
            setTimeout(game.removePointsNotification.bind(game), 1000);
        }
    }
    else if(eated_ball == 10){ //llave
        if(game.sound)
                game.sounds["eat_fruit"].play();
        game.incScore(BELL_SCORE);
        if(game.points_notification.length == 0){
            game.points_notification = [this.x, this.y+SPRITE_SIZE, BELL_SCORE];
            game.paused = true;
            setTimeout(game.removePointsNotification.bind(game), 1000);
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