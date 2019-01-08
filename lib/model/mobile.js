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
        this.path.canvas.width = this.path_image.width;
        this.path.canvas.height = this.path_image.height;
        this.path.drawImage(this.path_image,0,0, this.path_image.width, this.path_image.height);
    });
    
    
       
}

/*
Comprobamos si podemos movernos a la posición indicada
*/
Mobile.prototype.checkNextPosition = function(dir){
    let next_x = this.x;
    let next_y = this.y;
    let offset_x = 24; //un desplazamiento para hacer coincidir las rejillas de canvas para el mapa y el canvas para el path
    let offset_y = 0;
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

    let pixel = this.path.getImageData(next_x+offset_x+1,next_y+offset_y+1,1,1); //el +1 es porque la posicion comienza en 0 y la funcion en 1
    if(pixel.data[0] == PATH_COLOR_R && 
        pixel.data[1] == PATH_COLOR_G &&
        pixel.data[2] == PATH_COLOR_B){

        return true;    
    }
    else
        return false;
}

