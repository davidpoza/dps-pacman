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
        let frame_aux;
        //dibujamos fondo
        display.fill(game.world.background_color);
        
        display.drawMap(assets_manager.tile_set_image, game);

        display.drawBalls(assets_manager.tile_set_image, game);

        //dibujamos rojo
        frame_aux = game.tile_set.frames[game.blinky.frame_value];
        display.drawObject(assets_manager.tile_set_image,
            frame_aux.x, frame_aux.y,
            game.blinky.x + frame_aux.offset_x,
            game.blinky.y + frame_aux.offset_y,
            frame_aux.width, frame_aux.height);

        //dibujamos azul
        frame_aux = game.tile_set.frames[game.inky.frame_value];
        display.drawObject(assets_manager.tile_set_image,
            frame_aux.x, frame_aux.y,
            game.inky.x + frame_aux.offset_x,
            game.inky.y + frame_aux.offset_y,
            frame_aux.width, frame_aux.height);


        //dibujamos naranja
        frame_aux = game.tile_set.frames[game.clyde.frame_value];
        display.drawObject(assets_manager.tile_set_image,
            frame_aux.x, frame_aux.y,
            game.clyde.x + frame_aux.offset_x,
            game.clyde.y + frame_aux.offset_y,
            frame_aux.width, frame_aux.height);


        
        //dibujamos rosa
        frame_aux = game.tile_set.frames[game.pinky.frame_value];
        display.drawObject(assets_manager.tile_set_image,
            frame_aux.x, frame_aux.y,
            game.pinky.x + frame_aux.offset_x,
            game.pinky.y + frame_aux.offset_y,
            frame_aux.width, frame_aux.height);    


        //dibujamos pacman
        //cogemos el frame que tenga actualmente el objeto pacman  
        frame_aux = game.tile_set.frames[game.pacman.frame_value];
        display.drawObject(assets_manager.tile_set_image,
            frame_aux.x, frame_aux.y,
            game.pacman.x + frame_aux.offset_x,
            game.pacman.y + frame_aux.offset_y,
            frame_aux.width, frame_aux.height);

        
        if(game.ready_notification){
            display.drawObject(assets_manager.ready,
                0, 0,
                READY_X,
                READY_Y,
                READY_WIDTH, READY_HEIGHT);
        }

        if(game.game_over_notification){
            display.drawObject(assets_manager.game_over,
                0, 0,
                GAMEOVER_X,
                GAMEOVER_Y,
                GAMEOVER_WIDTH, GAMEOVER_HEIGHT);
        }


        //dibujamos la rejilla de tamaño de tile para depuración
        if(DEBUG)
            display.drawObject(assets_manager.checkerboard,
                0, 0,
                0, 0,
                SCREEN_WIDTH, SCREEN_HEIGHT);
        


        display.render(); //volcamos el buffer al canvas final
    }


    function update() {
        if(!game.paused){
            game.pacman.live(game, controller);
            game.blinky.live(game);
            game.inky.live(game);
            game.clyde.live(game);
            game.pinky.live(game);
            game.world.balls.special_ball_animator.animate();
            game.checkPacmanGhostsCollision();
            game.manageGhostDeparture();
            game.manageGhostReturning();
        }
    };

    function resize() {
        //restamos CANVAS_MARGIN_TOP para que el canvas deje espacio a marcador
        display.resize(document.documentElement.clientWidth - CANVAS_MARGIN_HORIZONTAL, document.documentElement.clientHeight - CANVAS_MARGIN_VERTICAL, game.world.width / game.world.height);
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


