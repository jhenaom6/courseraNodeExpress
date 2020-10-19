var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req , res){
    res.render('bicicletas/index', {bicis: Bicicleta.allBicis});
}

exports.bicicleta_create_get = function(req , res){
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req , res){
    var bici = new Bicicleta(req.body.ID, req.body.Color, req.body.Modelo);
    bici.ubicacion = [req.body.Latitud, req.body.Longitud];
    Bicicleta.add(bici);

    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = function(req, res){
    Bicicleta.delete(req.body.ID);

    res.redirect('/bicicletas');
}

exports.bicicleta_update_get = function(req , res){
    var bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas/update', {bici});
}

exports.bicicleta_update_post = function(req , res){
    var bici = Bicicleta.findById(req.params.id);
    
    bici.id = req.body.ID;
    bici.color = req.body.Color;
    bici.modelo = req.body.Modelo;
    bici.ubicacion = [req.body.Latitud, req.body.Longitud];
   
    res.redirect('/bicicletas');
}