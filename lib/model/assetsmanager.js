/*
Esta clase gestiona la carga de la imagen de sprites.
*/

function AssetsManager() {
    this.tile_set_image = undefined;
    this.path_image = undefined;
    this.count = 0;
    let _all_loaded = new Event('all_loaded');
    this.getEvent = function(){
      return _all_loaded;
    }
  };

AssetsManager.prototype.loadImages = function(callback) {
    this.tile_set_image = new Image();
    this.path_image = new Image();
    this.tile_set_image.src = ASSETS_SPRITES;
    this.path_image.src = ASSETS_PATH;
    
    function count(event){
      this.count++;
      if(this.count==2)
        dispatchEvent(event); 
    }

    this.tile_set_image.addEventListener("load", count.bind(this, this.getEvent()));

    this.path_image.addEventListener("load", count.bind(this, this.getEvent()));      
    
    addEventListener("all_loaded", function(){
      callback();
    });

    
}
