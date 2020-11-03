var Bicicleta = require('../../models/bicicleta');
const usuario = require('../../models/usuario');

exports.bicicleta_list = function(req, res){
    Bicicleta.find({}, function(error, allBicis){
        res.status(200).json({
            bicicletas: allBicis
        });
    });   
};

exports.bicicleta_create = function(req, res){
    var bici = new Bicicleta({
        code: req.body.id,
        color: req.body.color, 
        modelo: req.body.modelo,
        ubicacion: [req.body.latitud, req.body.longitud]
    });
    
    Bicicleta.add(bici, function(error){
        if (error) res.status(400).send('Error al crear la bicicleta');
        res.status(200).json({
            bicicletas: bici
        });
    });    
};

exports.bicicleta_delete = function(req, res){
    Bicicleta.deleteByCode(req.body.code, function(error, bici){
        if (error) res.status(400).send('Error al eliminar la bicicleta');
        res.status(200).send("Eliminado");
    });
};

exports.bicicleta_update = function(req, res){
    Bicicleta.update(req.body.id, req.body.color, req.body.modelo, req.body.latitud, req.body.longitud, function(error){
        if (error) res.status(400).send('Error al actualizar la bicicleta');
        res.status(200).send("Actualizado");
    });
};


/*
exports.bicicleta_list = function(req, res){
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.bicicleta_create = function(req, res){
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.latitud, req.body.longitud];

    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta: bici
    });
}

exports.bicicleta_delete = function(req, res){
    Bicicleta.delete(req.body.id);

    res.status(200).send("Eliminado");
}

exports.bicicleta_update = function(req, res){
    Bicicleta.update(req.body.id, req.body.color, req.body.modelo, req.body.latitud, req.body.longitud);

    res.status(200).send("Actualiazado");
}
*/