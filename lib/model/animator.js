/*
Clase para llevar la animación hecha con varios sprites y con un posible delay entre ellos.

*/

function Animator(frame_set, delay) {
    this.count       = 0; //contador de bucle principal
    this.delay       = (delay >= 1) ? delay : 1; //no puede ser negativo

    // un set de frames es un array de índices de los sprites en Game.tileset.frames. Por lo tanto un frameset determina una animación
    this.frame_set   = frame_set; 
    this.frame_index = 0;
    this.frame_value = frame_set[0];
    this.mode        = "pause";  //por defecto arranca en pausa
};


Animator.prototype.loop = function() {
    this.count ++;
    while(this.count > this.delay) { //solo entra a cambiar de frame cada vez que count acumula más pasadas que indique delay
      this.count -= this.delay;
      this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0; //vamos pasando al siguiente frame hasta llegar al final del array, cuando volvemos de nuevo al principio
      this.frame_value = this.frame_set[this.frame_index]; //tomamos el indice del frame que usaremos en el array Game.tileset.frames para seleccionar el frame que queramos dibujar
    }
};


Animator.prototype.animate = function() {
    switch(this.mode) {
      case "loop" : this.loop(); break;
      case "pause":              break;
    }
};

/*

*/
Animator.prototype.changeFrameSet = function(frame_set, mode, delay = 10, frame_index = 0) {
    //si ya estamos en ese frameset y queremos volver a poner el mismo salimos para no gastar recursos
    if (this.frame_set === frame_set) { return; } 

    this.count       = 0;
    this.delay       = delay;
    this.frame_set   = frame_set;
    this.frame_index = frame_index;
    this.frame_value = frame_set[frame_index];
    this.mode        = mode;
};