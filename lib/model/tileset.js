function TileSet(columns, tile_size) {

    this.columns    = columns;
    this.tile_size  = tile_size;
  
    let f = Frame; //referencia al constructor de Frame para abreviar
  
    /* Aquí cargamos cada uno de los sprites como un frame */
    this.frames = [/*0*/new f(144, 71, 24, 24, 0, 0),  /*1*/new f(96, 71, 24, 24, 0, 0),// right
                   /*2*/new f(48, 71, 24, 24, 0, 0),  /*3*/new f(0, 71, 24, 24, 0, 0),// left
                   /*4*/new f(72, 71, 24, 24, 0, 0),  /*5*/new f(24, 71, 24, 24, 0, 0),// up
                   /*6*/new f(168, 71, 24, 24, 0, 0), /*7*/new f(120, 71, 24, 24, 0, 0),// down
                  ];
  
  };