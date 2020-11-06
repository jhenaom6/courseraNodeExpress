var Usuario = require('../models/usuario');

exports.list = function(req , res){
    Usuario.find({}, function(error, usuarios){
        res.render('usuarios/index', {usuarios: usuarios});
    });    
}

exports.create_get = function(req , res, next){
    res.render('usuarios/create', {errors: {}, usuario: new Usuario()});
}

exports.create_post = function(req , res){
    if(req.body.password != req.body.confpassword){
        res.render('usuarios/create', {errors: {password: {message: 'Las contraseñas no coinciden'}}, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})});
        return ;
    }

    Usuario.create({ 
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    }, function(error, nuevoUsuario){
        if(error){
            res.render('usuarios/create', {errors: error.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})});
        }else{
            nuevoUsuario.enviar_email_bienvenida();
            res.redirect('/usuarios');
        }
    });
}


exports.delete = function(req, res){
    Usuario.findByIdAndDelete(req.body.id, function(error){
        if (error) console.log('Error al eliminarel usuario');
        res.redirect('/usuarios');
    });
}

exports.update_get = function(req , res){
    Usuario.findById(req.params.id, function(error, usuario){
        res.render('usuarios/update', {errors:{}, usuario: usuario});
    });
}

exports.update_post = function(req , res){
    Usuario.findByIdAndUpdate(req.params.id, {nombre: req.body.nombre}, function(error){
        if (error){
            console.log('Error al editar el usuario');
            res.render('usuarios/update', {errors: error.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})});
        }else{
            res.redirect('/usuarios');
        }        
    }); 
}