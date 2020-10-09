var Bicicleta = function(id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicación;
}

Bicicleta.prototype.toString = function(){
    return 'id: '+this.id+ "  |  color: "+ this.color;
}

Bicicleta.allBicis = [];
Bicicleta.add = function(bici){
    Bicicleta.allBicis.push(bici);
}

Bicicleta.delete = function(){


}

Bicicleta.


module.exports = Bicicleta;