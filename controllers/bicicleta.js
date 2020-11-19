var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req , res){
    Bicicleta.allBicis(function(error, bici){
        res.render('bicicletas/index', {bicis: bici});
    });    
}

exports.bicicleta_create_get = function(req , res){
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req , res){
    var bici = new Bicicleta({
        code: req.body.ID,
        color: req.body.Color, 
        modelo: req.body.Modelo,
        ubicacion: [req.body.Latitud, req.body.Longitud]
    });

    Bicicleta.add(bici, function(error){
        if (error) console.log('Error al crear la bicicleta');
        res.redirect('/bicicletas');
    });     
}

exports.bicicleta_delete_post = function(req, res){
    Bicicleta.deleteByCode(req.body.ID, function(error){
        if (error) console.log('Error al eliminar la bicicleta');
        res.redirect('/bicicletas');
    });
}

exports.bicicleta_update_get = function(req , res){
    Bicicleta.findByCode(req.params.id, function(error, bici){
        res.render('bicicletas/update', {bici});
    });
}

exports.bicicleta_update_post = function(req , res){
    Bicicleta.update(req.body.ID, req.body.Color, req.body.Modelo, req.body.Latitud, req.body.Longitud, function(error){
        if (error) console.log('Error al editar la bicicleta');
        res.redirect('/bicicletas');
    }); 
}