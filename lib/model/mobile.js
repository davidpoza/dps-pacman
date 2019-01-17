/*
Clase para objetos que se mueven con ujn path
*/
function Mobile(world){    
    this.next_dir = ""; //dirección deseada
    this.dir = ""; //dirección del movimiento actual
    this.logical_map = world.logical_map;
    this.path = world.path;
}

/*
Comprobamos si podemos movernos a la posición indicada
*/
Mobile.prototype.checkNextPosition = function(dir){
    let next_x = this.x;
    let next_y = this.y;
    let offset_x = 24; //un desplazamiento para hacer coincidir las rejillas de canvas para el mapa y el canvas para el path
    let offset_y = 0;
    if(dir == "left"){
        next_x -= this.speed; 
    }
    else if(dir == "right"){
        next_x += this.speed; 
    }
    else if(dir == "up"){
        next_y -= this.speed; 
    }
    else if(dir == "down"){
        next_y += this.speed; 
    }

    let pixel = this.path.getImageData(next_x+offset_x,next_y+offset_y,1,1); //el +1 es porque la posicion comienza en 0 y la funcion en 1
    if(pixel.data[0] == PATH_COLOR_R && 
        pixel.data[1] == PATH_COLOR_G &&
        pixel.data[2] == PATH_COLOR_B){

        return true;    
    }
    else
        return false;
}

/*
Comprueba si el tile contiene un camino
*/
Mobile.prototype.isValidPoint = function(tile){
    if(this.logical_map[tile[0]*NCOLS + tile[1]] == 1 || this.logical_map[tile[0]*NCOLS + tile[1]] == 2 || this.logical_map[tile[0]*NCOLS + tile[1]] == 3)
        return true;    
    return false;
}

/*
Comprueba si el tile contiene un punto de decisión especial
*/
Mobile.prototype.isSpecialPoint = function(tile){
    if(this.logical_map[tile[0]*NCOLS + tile[1]] == 3)
        return true;
    return false;
}


/*
Comprobamos si podemos movernos a la posición indicada o en su defecto vamos probando con desplazamientos menores.
Devuelve el número de pixeles que ha podido desplazarse finalmente.
Devuelve 0 si no puede desplazarse.
*/
Mobile.prototype.checkNextPositionTry = function(dir){
    
    let offset_x = 24; //un desplazamiento para hacer coincidir las rejillas de canvas para el mapa y el canvas para el path
    let offset_y = 0;
    let speed_to_try = this.speed; // probamos primero con el mayor desplazamiento posible
    while(speed_to_try>0){
        let next_x = this.x;
        let next_y = this.y;

        if(dir == "left"){
            next_x -= speed_to_try; 
        }
        else if(dir == "right"){
            next_x += speed_to_try; 
        }
        else if(dir == "up"){
            next_y -= speed_to_try; 
        }
        else if(dir == "down"){
            next_y += speed_to_try; 
        }
    
        let pixel = this.path.getImageData(next_x+offset_x,next_y+offset_y,1,1); //el +1 es porque la posicion comienza en 0 y la funcion en 1
        if(pixel.data[0] == PATH_COLOR_R && 
            pixel.data[1] == PATH_COLOR_G &&
            pixel.data[2] == PATH_COLOR_B){
    
            return speed_to_try;    
        }
        speed_to_try--;
    }
    return 0;

    
}

Mobile.prototype.moveLeft = function(){
    let can = this.checkNextPositionTry("left");
    if(can>0){
        this.x -= can;
        if(this.behaviour != "frightened" && this.behaviour != "returning")        
            this.changeFrameSet(this.frame_sets["left"], "loop" );
        else if(this.behaviour == "returning")
            this.changeFrameSet(this.frame_sets["returning_left"], "loop" );
        if(this.x < -23) //si entramos en el tuner de la izquierda
            this.x = SCREEN_WIDTH;
    }
    else
        this.mode = "pause";
}

Mobile.prototype.moveRight = function(){
    let can = this.checkNextPositionTry("right");
    if(can>0){
        this.x += can;
        if(this.behaviour != "frightened" && this.behaviour != "returning")
            this.changeFrameSet(this.frame_sets["right"], "loop" );
        else if(this.behaviour == "returning")
            this.changeFrameSet(this.frame_sets["returning_right"], "loop" );
    }
    else
        this.mode = "pause";
    if(this.x > SCREEN_WIDTH) //si entramos en el tuner de la izquierda
        this.x = -23;
}

Mobile.prototype.moveUp = function(){
    let can = this.checkNextPositionTry("up");
    if(can>0){        
        this.y -= can;
        if(this.behaviour != "frightened" && this.behaviour != "returning")
            this.changeFrameSet(this.frame_sets["up"], "loop" );
        else if(this.behaviour == "returning")
            this.changeFrameSet(this.frame_sets["returning_up"], "loop" );
    }
    else
        this.mode = "pause";

}

Mobile.prototype.moveDown = function(){
    let can = this.checkNextPositionTry("down");
    if(can>0){        
        this.y += can;
        if(this.behaviour != "frightened" && this.behaviour != "returning")
            this.changeFrameSet(this.frame_sets["down"], "loop" );
        else if(this.behaviour == "returning")
            this.changeFrameSet(this.frame_sets["returning_down"], "loop" );
    }
    else
        this.mode = "pause";

}

/*
Si tiene un cambio de dirección pendiente, comprueba si es posible y en
caso afirmativo, realiza dicho cambio.
*/
Mobile.prototype.changeDir = function(){
    if(this.next_dir != ""){
        if(this.next_dir == "left" && this.checkNextPosition("left")){
            //console.log("ahora a la izq");
            this.dir = "left";
            this.next_dir = "";
        } 
        else if(this.next_dir == "right" && this.checkNextPosition("right")){
            //console.log("ahora a la der");
            this.dir = "right";
            this.next_dir = "";
        } 
        else if(this.next_dir == "up" && this.checkNextPosition("up")){
            //console.log("ahora a arriba");
            this.dir = "up";
            this.next_dir = "";
        } 
        else if(this.next_dir == "down" && this.checkNextPosition("down")){
            //console.log("ahora abajo");
            this.dir = "down";
            this.next_dir = "";
        } 
        
    }
}