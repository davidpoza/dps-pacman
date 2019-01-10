function Pacman(path_image){
    this.x = 157;
    this.y = 198;
    this.speed = 1;


    Animator.call(this, Pacman.prototype.frame_sets["right"], 10); //pacman es un animator, y arranca con el frameset de moverse a la derecha
    Object.assign(Pacman.prototype, Animator.prototype); //concatenamos los métodos de animator

    Mobile.call(this, path_image);
    Object.assign(Pacman.prototype, Mobile.prototype);

    this.mode = "loop";
}

Pacman.prototype.frame_sets = {
    "right" : [0, 1], //estos son los indices del array Game.tileset.frames
    "left"  : [2, 3], 
    "up"  : [4, 5], 
    "down"  : [6, 7], 
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
        console.log("no puede moverse a izq, en la siguiente oportunidad");       
        this.next_dir = "left";
    }

    else if (controller.right.active && this.checkNextPosition("right"))           
        this.dir = "right";
    else if (controller.right.active ){
        console.log("no puede moverse a derec, en la siguiente oportunidad");       
        this.next_dir = "right";
    }    

    else if (controller.up.active && this.checkNextPosition("up"))           
        this.dir = "up";
    else if (controller.up.active ){
        console.log("no puede moverse arriba, en la siguiente oportunidad");
        this.next_dir = "up";
    }    

    else if (controller.down.active && this.checkNextPosition("down"))           
        this.dir = "down";
    else if (controller.down.active )
    {
        console.log("no puede moverse abajo, en la siguiente oportunidad");
        this.next_dir = "down";
    }
}


Pacman.prototype.moveLeft = function(){
    let can = this.checkNextPositionTry("left");
    if(can>0){
        this.x -= can;        
        this.changeFrameSet(this.frame_sets["left"], "loop" );
        if(this.x < -24) //si entramos en el tuner de la izquierda
            this.x = SCREEN_WIDTH;
    }
    else
        this.mode = "pause";
}

Pacman.prototype.moveRight = function(){
    let can = this.checkNextPositionTry("right");
    if(can>0){
        this.x += can;
        this.changeFrameSet(this.frame_sets["right"], "loop" );
    }
    else
        this.mode = "pause";
    if(this.x > SCREEN_WIDTH) //si entramos en el tuner de la izquierda
        this.x = -24;
}

Pacman.prototype.moveUp = function(){
    let can = this.checkNextPositionTry("up");
    if(can>0){        
        this.y -= can;
        this.changeFrameSet(this.frame_sets["up"], "loop" );
    }
    else
        this.mode = "pause";

}

Pacman.prototype.moveDown = function(){
    let can = this.checkNextPositionTry("down");
    if(can>0){        
        this.y += can;
        this.changeFrameSet(this.frame_sets["down"], "loop" );
    }
    else
        this.mode = "pause";

}


Pacman.prototype.eatBall = function(game){
    let eated_ball = game.world.balls.setBall(this.x, this.y, 0);
    if(eated_ball == 1) //bola normal vale 10pts
        game.incScore(BALL_1_SCORE);
    else if(eated_ball == 2) //bola grande vale 50pts
        game.incScore(BALL_2_SCORE);
}


/*
Si tiene un cambio de dirección pendiente, comprueba si es posible y en
caso afirmativo, realiza dicho cambio.
*/
Pacman.prototype.changeDir = function(){
    if(this.next_dir != ""){
        if(this.next_dir == "left" && this.checkNextPosition("left")){
            console.log("ahora a la izq");
            this.dir = "left";
            this.next_dir = "";
        } 
        else if(this.next_dir == "right" && this.checkNextPosition("right")){
            console.log("ahora a la der");
            this.dir = "right";
            this.next_dir = "";
        } 
        else if(this.next_dir == "up" && this.checkNextPosition("up")){
            console.log("ahora a arriba");
            this.dir = "up";
            this.next_dir = "";
        } 
        else if(this.next_dir == "down" && this.checkNextPosition("down")){
            console.log("ahora abajo");
            this.dir = "down";
            this.next_dir = "";
        } 
        
    }
}