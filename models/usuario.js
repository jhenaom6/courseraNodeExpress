var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
const Reserva = require('./reserva');
const crypto = require('crypto');
const Token = require('./token');
const mailer = require('../mailer/mailer');


const saltRounds = 10; //Ayuda a dar aleatoriedad a la encriptación.
const bcrypt = require('bcrypt');

const validateEmail = function(email){
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
};

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trin: true, //No permite espacio vacios al ppio
        required: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String,
        trin: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor ingrese un email válido'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/]
    },
    password: {
        type: String,
        required: [true,'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado:{
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {message: 'El path existe con otro usuario'});

usuarioSchema.pre('save', function(){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({
        usuario: this._id,
        bicicleta: biciId, 
        desde: desde, 
        hasta: hasta 
    });

    console.log(reserva);
    reserva.save(cb);
};

usuarioSchema.methods.enviar_email_bienvenida = function(cb){
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const emailDestination = this.email;
    token.save(function(error){
        if(error){
            return console.log(error.message);            
        }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: emailDestination,
            subject: 'Verificacion de Cuenta',
            text: 'Hola, \n\n Por favor, para verificar su cuenta haga clic en el link \n\n' + 'http://localhost:8000' + '\/token/confirmation\/' + token.token + '\n'
        };

        mailer.sendMail(mailOptions, function(error){
            if(error){return console.log(error.message);}

            console.log('Se ha enviado un email de verificacion a: '+ emailDestination);
        });
    });
};

usuarioSchema.methods.resetPassword = function(cb){
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const emailDestination = this.email;
    token.save(function(error){
        if(error){
            return console.log(error.message);            
        }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: emailDestination,
            subject: 'Resetear Password/Contrasena',
            text: 'Hola, \n\n Para resetear su contraseña, por favor haga clic en el link \n\n' + 'http://localhost:8000' + '\/token/resetPassword\/' + token.token + '\n'
        };

        mailer.sendMail(mailOptions, function(error){
            if(error){return console.log(error.message);}

            console.log('Se ha enviado un email de reset a: '+ emailDestination);
        });

    });
};

module.exports = mongoose.model('Usuario', usuarioSchema);