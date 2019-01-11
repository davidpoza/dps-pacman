/**
Esta clase no debe usarse de forma independiente sino heredando de ella
 */
function Ghost(world){
    

    Mobile.call(this, world);
    Object.assign(Ghost.prototype, Mobile.prototype);

    this.mode = "loop";
    this.behaviour = ""; //scatter, chase, frightened
    this.targetTile = [1,26]; //fila,col
    this.dir = "left"; //inicialmente todos salen hacia la izquierda
    this.logical_map = world.logical_map;
}

/**
 Realiza todas las acciones de su ciclo de vida
 */
Ghost.prototype.live = function(game){
    
    this.move();

    this.think(game.pacman);

    //aqui tiene que ir el cambio de frameset segun el movimiento que lleve pacman
    this.animate();
}


/**
 Efectua el movimiento en función de su dirección actual establecida
 */
Ghost.prototype.move = function(){
    if(this.dir == "left") this.moveLeft();
    else if(this.dir == "right") this.moveRight();
    else if(this.dir == "up") this.moveUp();
    else if(this.dir == "down") this.moveDown();
}


/*
Piensa a donde quiere ir en función de la posición de pacman
*/
Ghost.prototype.think = function(pacman){
    //if(this.inDecisionPoint())
    //    this.getShortestStrightPath()
}

/*
Calcula que camino seguir en una intersección, eligiendo el 
camino más corto en línea recta.
*/
Ghost.prototype.getShortestStrightPath = function(){
    /*entre los adyacentes válidos (que son camino) elegimos el que proporciona la linea recta más corta al objetivo.
    Devolvemos un objeto tile*/

 }

/*
Obtiene la posicion actual como tile.
Devuelve el tile como array de coordenadas fila,col
*/
Ghost.prototype.getPositionAsTile = function(){
    let col = Math.floor(this.x / TILE_SIZE) +1;
    let row = Math.floor(this.y / TILE_SIZE) +1;
    return [row,col];
}

/*
Comprueba si la posición actual es un punto de decisión
*/
Ghost.prototype.inDecisionPoint = function(){
    let tile = this.getPositionAsTile();
    if(this.logical_map[tile[0]*NCOLS + tile[1]] == 2 || this.logical_map[tile[0]*NCOLS + tile[1]] == 3) 
        return true;
    return false;
}


/*
Comprueba si el tile contiene un camino
*/
Ghost.prototype.isValidPoint = function(tile){
    if(this.logical_map[tile[0]*NCOLS + tile[1]] == 1 || this.logical_map[tile[0]*NCOLS + tile[1]] == 2)
        return true;
    return false;
}


/*
Comprueba si el tile contiene un punto de decisión especial
*/
Ghost.prototype.isSpecialPoint = function(tile){
    if(this.logical_map[tile[0]*NCOLS + tile[1]] == 3)
        return true;
    return false;
}

/*
Distancia en linea recta desde un tile adyacente ("up", "down", "left" o "right")
de la posicion actual hasta el targetTile.
*/
Ghost.prototype.distanceFromAdjacentTile = function(adj){
    let res = 0;
    let pos = this.getPositionAsTile();
    switch(adj){
        case "up": pos[0]--; break;
        case "down": pos[0]++; break;
        case "left": pos[1]--; break;
        case "right": pos[1]++; break;
    }

    res = this.distanceFromTile2Tile(pos, this.targetTile);
    return res;
}


/*
Distancia en px desde un tile A a otro tile B. Usando teorema Pitágoras.
*/
Ghost.prototype.distanceFromTile2Tile = function(a,b){
   return (Math.sqrt(Math.pow((b[0]-a[0]),2) + Math.pow((b[1]-a[1]),2)) );
}