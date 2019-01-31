/**
Esta clase no debe usarse de forma independiente sino heredando de ella
 */
function Ghost(world){
    Mobile.call(this, world);
    Object.assign(Ghost.prototype, Mobile.prototype);

    this.mode = "loop";
    this.behaviour = "waiting"; //scatter, chase, frightened, waiting, returning, entering
    this.in_home = true;
    this.current_sequence = [];

    this.dir = "left"; //inicialmente todos salen hacia la izquierda
    this.logical_map = world.logical_map;

    this.has_decided = false;
    this.render_delay = 1;
    this.speed_divisor = 2;
}

/**
 Realiza todas las acciones de su ciclo de vida
 */
Ghost.prototype.live = function(game){
    this.render_delay++;
    if(this.render_delay>=this.speed_divisor) this.render_delay=0;
    if(this.render_delay == 1 || this.speed_divisor == 1){
        if(!this.in_home && this.behaviour != "frightened" && this.behaviour != "returning")
        this.applyBehaviourWaves(game);   
    
        if(this.inHomeEntrance() && this.behaviour == "returning"){
            this.dir = "left";
            this.behaviour = "";
            this.speed_divisor = 2;
        }
        
                
        this.changeDir(); 
        this.move();

        

        if(this.in_home){
            if(this.behaviour == "waiting")
                this.rebound();
            else
                this.getOutHome();
        }        
        else
        this.think(game.pacman);
        
        this.animate();
    }   
    
}


/**
Cambia el modo de los fantasmas segun la oleada que corresponda por el tiempo transcurrido
 */
Ghost.prototype.applyBehaviourWaves = function(game){
    if(game.current_level==1){
        //oleada 1
        if(game.frames_rendered >= 1 && game.frames_rendered <= 7*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 7*FPS && game.frames_rendered < 27*FPS) 
            this.inChaseMode(game.pacman);

        //oleada 2
        else if(game.frames_rendered >= 27*FPS && game.frames_rendered < 32*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 32*FPS && game.frames_rendered < 52*FPS) 
            this.inChaseMode(game.pacman);

        //oleada 3
        else if(game.frames_rendered >= 52*FPS && game.frames_rendered < 58*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 58*FPS && game.frames_rendered < 78*FPS) 
            this.inChaseMode(game.pacman);

        //oleada 4
        else if(game.frames_rendered >= 78*FPS && game.frames_rendered < 84*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 84*FPS) 
            this.inChaseMode(game.pacman);
    }
    else if(game.current_level==2 && game.current_level<5){
        //oleada 1
        if(game.frames_rendered >= 1 && game.frames_rendered <= 7*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 7*FPS && game.frames_rendered < 27*FPS) 
            this.inChaseMode(game.pacman);

        //oleada 2
        else if(game.frames_rendered >= 27*FPS && game.frames_rendered < 32*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 32*FPS && game.frames_rendered < 52*FPS) 
            this.inChaseMode(game.pacman);

        //oleada 3
        else if(game.frames_rendered >= 52*FPS && game.frames_rendered < 58*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 58*FPS && game.frames_rendered < 1091*FPS) 
            this.inChaseMode(game.pacman);

        //oleada 4
        else if(game.frames_rendered >= 1091*FPS && game.frames_rendered < 1093*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 1093*FPS) 
            this.inChaseMode(game.pacman);
    }
    else if(game.current_level>=5){
        //oleada 1
        if(game.frames_rendered >= 1 && game.frames_rendered <= 5*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 5*FPS && game.frames_rendered < 25*FPS) 
            this.inChaseMode(game.pacman);

        //oleada 2
        else if(game.frames_rendered >= 25*FPS && game.frames_rendered < 29*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 29*FPS && game.frames_rendered < 49*FPS) 
            this.inChaseMode(game.pacman);

        //oleada 3
        else if(game.frames_rendered >= 49*FPS && game.frames_rendered < 53*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 53*FPS && game.frames_rendered < 1086*FPS) 
            this.inChaseMode(game.pacman);

        //oleada 4
        else if(game.frames_rendered >= 1086*FPS && game.frames_rendered < 1088*FPS) 
            this.inScatterMode(game.pacman);
        else if(game.frames_rendered > 1088*FPS) 
            this.inChaseMode(game.pacman);
    }
    
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
    if(this.inDecisionPoint() && !this.has_decided){
        if(this.behaviour == "frightened"){
            // en este modo escoge las direcciones aleatoriamente.
            this.next_dir = this.getRandomDir();
            this.has_decided = true;
        }
        else
            this.next_dir = this.getShortestStrightPath();
    }
    else if(!this.inDecisionPoint()){
        this.has_decided = false;
        if(this.mode == "pause"){ //si se ha quedado bloqueado en una esquina busca el único camino posible y lo sigue
            let pos = this.getPositionAsTile();
            if(this.isValidPoint([pos[0]-1, pos[1]]) && this.dir!="down"){ //no vale volver por donde venia
                this.dir = "up";
                this.mode = "loop";
            }
            else if(this.isValidPoint([pos[0]+1, pos[1]]) && this.dir!="up"){
                this.dir = "down";
                this.mode = "loop";
            }
            else if(this.isValidPoint([pos[0], pos[1]-1]) && this.dir!="right"){
                this.dir = "left";
                this.mode = "loop";
            }
            else if(this.isValidPoint([pos[0], pos[1]+1]) && this.dir!="left"){
                this.dir = "right";
                this.mode = "loop";
            }
        
        }
    }
    
    
}

/**
 Función que va cambiando la dirección entre arriba y abajo continuamente cada vez que choca 
 dentro del home. Mientras espera.
 */
Ghost.prototype.rebound = function(){
    let can_up = this.checkNextPositionTry("up");
    let can_down = this.checkNextPositionTry("down");
    if(can_up && this.dir != "down"){
        this.dir = "up";
    }
    else if(can_up && this.dir == "up"){
        this.dir = "up";
    }
    else if(can_down && this.dir == "down")
        this.dir = "down";
    else if(!can_up ){
        this.dir = "down";
    }
    else if(!can_down ){
        this.dir = "up";
    }
}


/*
Escoge la direccion de forma aleatoria
Devuelve up,down,left o right;
*/
Ghost.prototype.getRandomDir = function(){
    let pos = this.getPositionAsTile();
    let random_index = Math.floor((Math.random() * 2));
    let dirs = [];
    if(this.isValidPoint([pos[0]-1, pos[1]]) && this.dir != "down")
        dirs.push("up");
    if(this.isValidPoint([pos[0]+1, pos[1]]) && this.dir != "up")
        dirs.push("down");
    if(this.isValidPoint([pos[0], pos[1]-1]) && this.dir != "right")
        dirs.push("left");
    if(this.isValidPoint([pos[0], pos[1]+1]) && this.dir != "left")
        dirs.push("right");
    //aqui habremos seleccionado dos direcciones
    return dirs[random_index];
}

/*
Calcula que camino seguir en una intersección, eligiendo el 
camino más corto en línea recta.
Devuelve up,down,left o right;
*/
Ghost.prototype.getShortestStrightPath = function(){
    /*entre los adyacentes válidos (que son camino) elegimos el que proporciona la linea recta más corta al objetivo.
    Devolvemos un objeto tile*/
    let distances = [ ];
    
    let pos = this.getPositionAsTile();

    if(this.isSpecialPoint(pos)){ //prohibido ir hacia arriba en estos tiles, segun juego original
        if(this.dir == "left")
            return "left";
        else if(this.dir == "right")
            return "right";
    }

    //no vale volver por donde venia
    if(this.isValidPoint([pos[0]-1, pos[1]]) && this.dir != "down")
        distances.push({dir: "up", value: this.distanceFromAdjacentTile("up")});
    if(this.isValidPoint([pos[0]+1, pos[1]]) && this.dir != "up")
        distances.push({dir: "down", value: this.distanceFromAdjacentTile("down")});
    if(this.isValidPoint([pos[0], pos[1]-1]) && this.dir != "right")
        distances.push({dir: "left", value: this.distanceFromAdjacentTile("left")});
    if(this.isValidPoint([pos[0], pos[1]+1]) && this.dir != "left")
        distances.push({dir: "right", value: this.distanceFromAdjacentTile("right")});

    distances.sort((a,b)=>{
        if(a.value == b.value){ //a igual distancia se elige en el siguiente orden: up>left>down
            if(a.dir =="right") //la derecha no queremos que sea la opción primera
                return 1;
            else if(a.dir=="up" && b.dir=="left")
                return -1;
            else if(a.dir=="left" && b.dir=="down")
                return -1;
            else
                return 1;

        }
        else
            return (a.value-b.value);
    });
    

    return distances[0].dir;

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
Comprueba si la posición actual es la entrada al home
*/
Ghost.prototype.inHomeEntrance = function(){

    if(this.x == POS_CONSIDERED_OUT_HOME[0] &&  this.y >=126 && this.y <=157) 
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

/**
 Realiza la secuencia de cambios de dirección indicada como array de cadenas.
 ej: ["left", "up", "left"]
 */
Ghost.prototype.makeSequence = function(sequence){
    if(this.current_sequence.length == 0)
        this.current_sequence = [...sequence]; //si es la primera invocación cargamos la secuencia en el fantasma
    if(this.next_dir == "" || this.mode == "pause"){
        let dir = this.current_sequence.shift();
        this.next_dir = dir;
    }
}

/**
Pone en modo waiting al fantasma
 */
Ghost.prototype.wait = function(){
    this.makeSequence(["up", "down"]);
}

/**
 Realiza un cambio a la dirección opuesta.
 Lo usamos en el cambio de modo de comportamiento.
 */
Ghost.prototype.reverseDir = function(){
    //lo mandamos por donde ha venido
    let pos = this.getPositionAsTile();
    if(this.isValidPoint([pos[0]-1, pos[1]]) && this.dir == "down")
        this.dir = "up"
    else if(this.isValidPoint([pos[0]+1, pos[1]]) && this.dir == "up")
        this.dir = "down"
    else if(this.isValidPoint([pos[0], pos[1]-1]) && this.dir == "right")
        this.dir = "left"
    else if(this.isValidPoint([pos[0], pos[1]+1]) && this.dir == "left")
        this.dir = "right"
}

/**
 Recibe coordenada top-left de un rectangulo con el que vamos a intersectar.
 Ambos rectangulos (el del fantasma y el de pacman son de tamaño COLLISION_SIZE)
 */
Ghost.prototype.collides = function(ax,ay){
    //calculamos los rectangulos de colision centrados dentro de los rectangulos de sprite.
    let offset = SPRITE_SIZE / 2 - COLLISION_SIZE / 2;

    let xOverlap = valueInRange(ax+offset, this.x+offset, this.x+offset+COLLISION_SIZE) || valueInRange(this.x+offset, ax+offset, ax+offset+COLLISION_SIZE);
    let yOverlap = valueInRange(ay+offset, this.y+offset, this.y+offset+COLLISION_SIZE) || valueInRange(this.y+offset, ay+offset, ay+offset+COLLISION_SIZE);

    return xOverlap && yOverlap;
}