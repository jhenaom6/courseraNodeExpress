var Usuario = require('../../models/usuario');

exports.usuarios_list = function(req, res){
    Usuario.find({}, function(error, usuarios){
        res.status(200).json({
            usuarios: usuarios
        });
    });    
};

exports.usuario_create = function(req, res){

    var usuario = new Usuario({ nombre: req.body.nombre, email: req.body.email, password: req.body.password});
    usuario.save(function(error){
        if(error) return res.status(500).json( error );
        return res.status(200).json( usuario );
    });
};

exports.usuario_reservar = function(req, res){
    Usuario.findById(req.body.id, function(error, usuario){
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function(error){
            console.log('Reservado');
            res.status(200).send();
        });

    });
};

