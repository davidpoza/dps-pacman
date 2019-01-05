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
        display.fill(game.world.background_color);
        display.render();
    }

    function resize() {
        //restamos 32px para que el canvas no sobresalga del viewport
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.width / game.world.height);
        display.render();    
      };

    let display = new Display(document.getElementById("canvas"));
    let controller = new Controller();
    let game = new Game();

    resize(); //el primer resize lo provocamos nosotros para ajustar el canvas a la ventana
    window.addEventListener("resize",  resize);
    window.addEventListener("keydown", controller.handleKeyDownUp.bind(controller));
    window.addEventListener("keyup",   controller.handleKeyDownUp.bind(controller));

    game.initialize();
    game.start(render); //arranca el bucle principal del juego

    
};


