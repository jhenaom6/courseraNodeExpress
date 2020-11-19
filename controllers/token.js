var Usuario = require('../models/usuario');
var Token = require('../models/token');

exports.confirmationGet = function(req, res){
    Token.findOne({token: req.params.token}, function(error, token){
        if(!token){
            return res.status(400).send({type: 'not-verificated', msg: 'No encontramos un usuario con este token. Quizá a expirado el tiempo para verificación del mismo.'});
        }

        Usuario.findById(token._userId, function(error, usuario){
            if(!usuario) return res.status(400).send({msg: 'No encontramos un usuario con este token'});
            if(usuario.verificado) return res.redirect('/usuarios');
            usuario.verificado = true;
            usuario.save(function(error){
                if(error) return res.status(400).send({msg: error.message});

                res.redirect('/');
            });
        })
    });
}