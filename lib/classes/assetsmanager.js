/*
Esta clase gestiona la carga de la imagen de sprites.
*/

function AssetsManager() {
    this.tile_set_image = undefined;
    this.path_image = undefined;
    this.game_over = undefined;
    this.ready = undefined;
    this.checkerboard = undefined;
    this.count = 0;
    let _all_loaded = new Event('all_loaded');
    this.getEvent = function(){
      return _all_loaded;
    }
  };

AssetsManager.prototype.loadImages = function(callback) {
    this.tile_set_image = new Image();
    this.path_image = new Image();
    this.checkerboard = new Image();
    this.ready = new Image();
    this.game_over = new Image();
    this.tile_set_image.src = ASSETS_SPRITES;
    this.path_image.src = ASSETS_PATH;
    this.checkerboard.src = ASSETS_CHECKERBOARD;
    this.ready.src = ASSETS_READY;
    this.game_over.src = ASSETS_GAMEOVER;
    
    function count(event){
      this.count++;
      if(this.count==5)
        dispatchEvent(event); 
    }

    this.tile_set_image.addEventListener("load", count.bind(this, this.getEvent()));

    this.path_image.addEventListener("load", count.bind(this, this.getEvent())); 
    
    this.checkerboard.addEventListener("load", count.bind(this, this.getEvent()));  

    this.ready.addEventListener("load", count.bind(this, this.getEvent()));  

    this.game_over.addEventListener("load", count.bind(this, this.getEvent()));  
    
    addEventListener("all_loaded", function(){
      callback();
    });

    
}
