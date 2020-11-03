var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: Number,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparce: true}
    }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.methods.toString = function(){
    return 'code: '+this.code + "  |  color: "+ this.color;
};

bicicletaSchema.statics.allBicis = function(cb){
    return this.find({}, cb);
};

bicicletaSchema.statics.add = function(bici, cb){
    this.create(bici, cb);
};

bicicletaSchema.statics.findByCode = function(biciCode, cb){
    return this.findOne({code: biciCode}, cb);
};

bicicletaSchema.statics.deleteByCode = function(biciCode, cb){
    return this.deleteOne({code: biciCode}, cb);
};

bicicletaSchema.statics.update = function(newID, newColor, newModelo, newLatitud, newLongitud, cb){
    return this.updateOne(
        { code: newID }, 
        { 
            color: newColor, 
            modelo: newModelo,
            ubicacion: [newLatitud, newLongitud]        
        }, cb);
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema);


/*
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

Bicicleta.update = function(newID, newColor, newModelo, newLatitud, newLongitud){
    var bici = Bicicleta.findById(newID);
    
    bici.id = newID;
    bici.color = newColor;
    bici.modelo = newModelo;
    bici.ubicacion = [newLatitud, newLongitud];
}


var bici1 = new Bicicleta(1, "Blanco", 2019, [6.217, -75.5987]);
var bici2 = new Bicicleta(2, "Negro", 2018, [6.246173, -75.568185]);

Bicicleta.add(bici1);
Bicicleta.add(bici2);

module.exports = Bicicleta;*/