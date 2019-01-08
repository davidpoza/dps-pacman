/*
Clase para objetos que se mueven con ujn path
*/
function Mobile(){
    let assets_manager = new AssetsManager();
    this.path_image = new Image();
    this.path_image.src = ASSETS_PATH;
    this.next_dir = "";
    this.dir = "";

    this.path_image.crossOrigin = "Anonymous"
    assets_manager.loadTileSetImage(ASSETS_PATH, ()=>{ 
        this.path = document.createElement("canvas").getContext("2d"); 
        //this.path = document.getElementById("path").getContext("2d");
        this.path.canvas.width = SCREEN_WIDTH;
        this.path.canvas.height = SCREEN_HEIGHT;
        this.path.drawImage(this.path_image,0,0, this.path_image.width, this.path_image.height);
    });
    
    
       
}

/*
Comprobamos si podemos movernos a la posición indicada
*/
Mobile.prototype.checkNextPosition = function(dir){
    let next_x = this.x;
    let next_y = this.y;
    if(dir == "left"){
        next_x -= this.speed; 
    }
    else if(dir == "right"){
        next_x += this.speed; 
    }
    else if(dir == "up"){
        next_y -= this.speed; 
    }
    else if(dir == "down"){
        next_y += this.speed; 
    }

    let pixel = this.path.getImageData(next_x+1,next_y+1,1,1); //el +1 es porque la posicion comienza en 0 y la funcion en 1
    if(pixel.data[0] == PATH_COLOR_R && 
        pixel.data[1] == PATH_COLOR_G &&
        pixel.data[2] == PATH_COLOR_B){

        return true;    
    }
    else
        return false;
}

