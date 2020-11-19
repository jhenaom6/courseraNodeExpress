var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', function(){

    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/test_bicicleta';
        mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.Promise = global.Promise;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error al conectar la base de datos'));
        db.once('open', function(){
            console.log('La base de datos del test está conectada');
            done();
        });        
    });

    afterEach(function(done){
        Reserva.deleteMany({}, function(error, success){
            if(error) console.log(error);
            Usuario.deleteMany({}, function(error, success){
                if(error) console.log(error);
                Bicicleta.deleteMany({}, function(error, success){
                    if(error) console.log(error);
                    mongoose.disconnect(error);
                    done();
                });
            });
        });        
    });

    describe('Cuando un usuario reserva una bici', () => {
        it('Debe existir la reserva', (done) => {
            var usuario = new Usuario({ nombre: "Juan" });
            usuario.save();

            var bici1 = new Bicicleta({
                code: 1,
                color: "Blanco",
                modelo: 2019, 
                ubicacion: [6.217, -75.5987]
            });
            bici1.save();

            var hoy = new Date();
            var manana = new Date();
            manana.setDate(hoy.getDate()+1);

            usuario.reservar(bici1.id, hoy, manana, function(error, reserva){
               //Promise -->
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(error, reservas){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(bici1.code);
                    expect(reservas[0].usuario.nombre).toBe("Juan");
                    done();
                });
            });
        });
    });

});