var Bicicleta = function(id, color, modelo, ubicacion){
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function(){
    return 'id: '+this.id+ "  |  color: "+ this.color;
}

Bicicleta.allBicis = [];

Bicicleta.add = function(bici){
    Bicicleta.allBicis.push(bici);
}

Bicicleta.findById = function(aBiciId){
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if (aBici)
        return aBici
    else
        throw new Error(`No existe una bici con el id: ${aBiciId}`); 
}

Bicicleta.delete = function(aBiciId){
    for(var i=0; i<Bicicleta.allBicis.length;i++){
        if(Bicicleta.allBicis[i].id == aBiciId){
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}

var bici1 = new Bicicleta(1, "Blanco", 2019, [6.217, -75.567]);
var bici2 = new Bicicleta(2, "Negro", 2018, [6.246173, -75.568185]);

Bicicleta.add(bici1);
Bicicleta.add(bici2);




module.exports = Bicicleta;