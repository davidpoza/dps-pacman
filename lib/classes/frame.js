function Frame(x, y, width, height, offset_x, offset_y) {

    this.x        = x;
    this.y        = y;
    this.width    = width;
    this.height   = height;
    
    /*el offset nos permite compensar el tamaño de un sprite menor que el resto, para que la animación
    siga quedando centrada y al mismo tiempo no estemos obligados a tener el pack de sprites con espacios vacios.*/
    this.offset_x = offset_x;
    this.offset_y = offset_y; 
  
  };