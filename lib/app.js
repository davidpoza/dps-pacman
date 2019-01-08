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
        if (controller.left.active)  { game.pacman.moveLeft();  }
        else if (controller.right.active) { game.pacman.moveRight(); }
        else if (controller.up.active) { game.pacman.moveUp(); }
        else if (controller.down.active) { game.pacman.moveDown(); }  
    };

    function resize() {
        //restamos 32px para que el canvas no sobresalga del viewport
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.width / game.world.height);
        display.render();    
    };

    let assets_manager = new AssetsManager();
    let display = new Display(document.getElementById("canvas"));
    let controller = new Controller();
    let game = new Game();

    
    window.addEventListener("resize",  resize);
    window.addEventListener("keydown", controller.handleKeyDownUp.bind(controller));
    window.addEventListener("keyup",   controller.handleKeyDownUp.bind(controller));

    assets_manager.loadTileSetImage(ASSETS_SPRITES, ()=>{ //cuando carga el fichero de sprites arranca la carga del juego
        resize(); //el primer resize lo provocamos nosotros para ajustar el canvas a la ventana
        game.initialize();
        game.start(update, render); //arranca el bucle principal del juego
    });
    

    
};


