/*
Clase que se encarga de dibujar cada elemento del juego en el buffer auxiliar(no visualizado en pantalla) y
cuando llamamos a render volcarlo al canvas final que sí visualizamos en pantalla.
También gestiona el tamaño y la proporción del canvas.
*/
function Display(canvas) {
    this.context = canvas.getContext("2d"); //canvas principal
    /*
    buffer para mejorar el rendimiento.
    Todo se dibuja aquí y cuando todo se ha dibujado,
    entonces ya se vacia en el canvas que mostramos por pantalla.
    */
    this.buffer  = document.createElement("canvas").getContext("2d"); 
    this.buffer.canvas.width = SCREEN_WIDTH;
    this.buffer.canvas.height = SCREEN_HEIGHT;

    this.render = function() {
        //console.log("renderizando frame");
        /*
        - origen de la imagen, el buffer en este caso
        - rectangulo origen, todo el buffer en este caso
        - rectangulo destino, todo el canvas en este caso

        como los rectangulos origen y destino son distintos se produce un escalado
        */
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    /*
    Funcion para rellenar el fondo del canvas.
    Todas las funciones que dibujen algo deben hacerlo _en el buffer_.
    */
    this.fill = function(color) {        
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);    
    };

    /* hacemos los calculos para que el canvas siempre quepa en el navegador
    y mantenga la misma proporcion (ratio) que el que define el juego*/
    this.resize = function(width, height, ratio) {

        if(width/height > ratio){ 
            console.log("el navegador es proporcionalmente mas ancho que el juego");
            /*si el navegador es proporcionalmente mas ancho que el juego,
            entonces el juego tenderá a salirse verticalmente, asi que ajustamos a la altura
            y corregimos la anchura, aumentandola para mantener el ratio*/
            this.context.canvas.height = height; //
            this.context.canvas.width = height * ratio ;

        }
        else{
            console.log("el navegador es proporcionalmente mas alto que el juego");
            /*si el navegador es proporcionalmente mas alto que el juego,
            entonces el juego tenderá a salirse horizontalmente, asi que ajustamos a la anchura
            y corregimos la altura, reduciendola para mantener el ratio*/
            this.context.canvas.height = width / ratio; 
            this.context.canvas.width = width;
        }
        
    
        this.render();    
    };

    /*
    Las coordenadas de destino podrian no ser enteras si hemos estado trabajando con ellas.
    El tamaño de origen y destino se mantiene
    */
    this.drawObject = function(image, source_x, source_y, destination_x, destination_y, width, height) {
        this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
        if(DEBUG){
            this.buffer.fillStyle = "#FF0000";
            this.buffer.fillRect(destination_x+TILE_SIZE/2, destination_y+TILE_SIZE/2, TILE_SIZE, TILE_SIZE);
        }                    
    };


    this.drawMap = function(image, game){
        for (let i=0; i<game.world.graphic_map.length; i++){
            let frame         = game.tile_set.frames[game.world.graphic_map[i]];
            let source_x      = frame.x;
            let source_y      = frame.y;
            let destination_x = (i % NCOLS) * TILE_SIZE;
            let destination_y = Math.floor(i / NCOLS  ) * TILE_SIZE;
            this.buffer.drawImage(image, source_x, source_y, TILE_SIZE, TILE_SIZE, destination_x, destination_y, TILE_SIZE, TILE_SIZE);
        }
    }



    this.drawBalls = function(image, game){
        for (let i=0; i<game.world.balls.matrix.length; i++){
            let frame = undefined;

            if(game.world.balls.matrix[i] == 1) //bola normal
                frame = game.tile_set.frames[77];                
            else if (game.world.balls.matrix[i] == 2) //bola especial
                frame = game.tile_set.frames[78];

            if(frame != undefined){
                let source_x      = frame.x;
                let source_y      = frame.y;
                let destination_x = (i % NCOLS) * TILE_SIZE;
                let destination_y = Math.floor(i / NCOLS  ) * TILE_SIZE;
                this.buffer.drawImage(image, source_x, source_y, TILE_SIZE, TILE_SIZE, destination_x, destination_y, TILE_SIZE, TILE_SIZE);
            }            
        }
    }

}