/*
Esta clase gestiona la carga de la imagen de sprites.
*/

function AssetsManager() {

    this.tile_set_image = undefined;

  };

AssetsManager.prototype.loadTileSetImage = function(url, callback) {
    this.tile_set_image = new Image();
    this.tile_set_image.addEventListener("load", function(event) {
      callback();
    }, { once : true});
    this.tile_set_image.src = url;
}
