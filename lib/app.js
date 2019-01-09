/*
Script principal.
Inicializa los objetos y configura los eventos
*/

window.onload = function() {

    /*
    renderizamos todos los elementos antes de dibujar el canvas,
    como por ejemplo el pacman, los ghost, las paredes, las bolitas, etc.
    */
    function render(){

        //dibujamos fondo
        display.fill(game.world.background_color);
        
        display.drawMap(assets_manager.tile_set_image, game);

        display.drawBalls(assets_manager.tile_set_image, game);

        //dibujamos pacman
        //cogemos el frame que tenga actualmente el objeto pacman  
        let frame = game.tile_set.frames[game.pacman.frame_value];
        display.drawObject(assets_manager.tile_set_image,
            frame.x, frame.y,
            game.pacman.x + frame.offset_x,
            game.pacman.y + frame.offset_y,
            frame.width, frame.height);


        display.render(); //volcamos el buffer al canvas final
    }


    function update() {
        //lo primero es ver si hemos marcado una nueva dirección
        if(game.pacman.next_dir != ""){
            if(game.pacman.next_dir == "left" && game.pacman.checkNextPosition("left")){
                console.log("ahora a la izq");
                game.pacman.dir = "left";
                game.pacman.next_dir = "";
            } 
            else if(game.pacman.next_dir == "right" && game.pacman.checkNextPosition("right")){
                console.log("ahora a la der");
                game.pacman.dir = "right";
                game.pacman.next_dir = "";
            } 
            else if(game.pacman.next_dir == "up" && game.pacman.checkNextPosition("up")){
                console.log("ahora a arriba");
                game.pacman.dir = "up";
                game.pacman.next_dir = "";
            } 
            else if(game.pacman.next_dir == "down" && game.pacman.checkNextPosition("down")){
                console.log("ahora abajo");
                game.pacman.dir = "down";
                game.pacman.next_dir = "";
            } 
            
        }

        //movemos en función de la dirección actual
        if(game.pacman.dir == "left") game.pacman.moveLeft();
        else if(game.pacman.dir == "right") game.pacman.moveRight();
        else if(game.pacman.dir == "up") game.pacman.moveUp();
        else if(game.pacman.dir == "down") game.pacman.moveDown();
        
        game.pacman.eatBall(game);

        //ahora aplicamos las teclas pulsadas
        if (controller.left.active && game.pacman.checkNextPosition("left"))            
            game.pacman.dir = "left";
        else if (controller.left.active ){
            console.log("no puede moverse a izq, en la siguiente oportunidad");       
            game.pacman.next_dir = "left";
        }

        else if (controller.right.active && game.pacman.checkNextPosition("right"))           
            game.pacman.dir = "right";
        else if (controller.right.active ){
            console.log("no puede moverse a derec, en la siguiente oportunidad");       
            game.pacman.next_dir = "right";
        }    

        else if (controller.up.active && game.pacman.checkNextPosition("up"))           
            game.pacman.dir = "up";
        else if (controller.up.active ){
            console.log("no puede moverse arriba, en la siguiente oportunidad");
            game.pacman.next_dir = "up";
        }    

        else if (controller.down.active && game.pacman.checkNextPosition("down"))           
            game.pacman.dir = "down";
        else if (controller.down.active )
        {
            console.log("no puede moverse abajo, en la siguiente oportunidad");
            game.pacman.next_dir = "down";
        }       

    };

    function resize() {
        //restamos CANVAS_MARGIN_TOP para que el canvas deje espacio a marcador
        display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - CANVAS_MARGIN_TOP, game.world.width / game.world.height);
        display.render();    
    };

    let assets_manager = new AssetsManager();
    let display = new Display(document.getElementById("canvas"));
    let controller = new Controller();
    let game;

    
    window.addEventListener("resize",  resize);
    window.addEventListener("keydown", controller.handleKeyDownUp.bind(controller));
    window.addEventListener("keyup",   controller.handleKeyDownUp.bind(controller));

    assets_manager.loadImages(()=>{ //cuando carga todos los assets arranca la carga del juego
        game = new Game(assets_manager.path_image);
        resize(); //el primer resize lo provocamos nosotros para ajustar el canvas a la ventana
        game.initialize();
        game.start(update, render); //arranca el bucle principal del juego
    });
    

    
};


