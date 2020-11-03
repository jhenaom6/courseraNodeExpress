var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function(){

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
        Bicicleta.deleteMany({}, function(error, success){
            if(error) console.log(error);
            mongoose.disconnect(error);
            done();
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('Creamos una instacia de bicicleta', () => {
            var bici1 = Bicicleta.createInstance(1, "Blanco", 2019, [6.217, -75.5987]);

            expect(bici1.code).toBe(1);
            expect(bici1.color).toBe("Blanco");
            expect(bici1.ubicacion[0]).toBe(6.217);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('Comienza vacía', (done) => {
            Bicicleta.allBicis(function(error, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });
        
    describe('Bicicleta.add', () => {
        it('Agregamos solo una', (done) => {
            var bici1 = new Bicicleta({
                code: 1,
                color: "Blanco",
                modelo: 2019, 
                ubicacion: [6.217, -75.5987]
            });
            Bicicleta.add(bici1, function(error, newBici){
                if (error) console.log(error);
                Bicicleta.allBicis(function(error, bicis){
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].code).toBe(bici1.code);
                    done();
                });
            }); 
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('Debe devolver la bici con code 1', (done) => {
            
            Bicicleta.allBicis(function(error, bicis){
                expect(bicis.length).toBe(0);

                var bici1 = new Bicicleta({
                    code: 1,
                    color: "Blanco",
                    modelo: 2019,
                    ubicacion: [6.217, -75.5987]
                });
                Bicicleta.add(bici1, function(error, newBici){
                    if (error) console.log(error);

                    var bici2 = new Bicicleta({
                        code: 2,
                        color: "Negro",
                        modelo: 2020,
                        ubicacion: [6.217, -75.5987]
                    });
                    Bicicleta.add(bici2, function(error, newBici){
                        if (error) console.log(error);
                        Bicicleta.findByCode(1, function(error, bici){
                            expect(bici.modelo).toBe(bici1.modelo);
                            expect(bici.color).toBe(bici1.color);
                            done()
                        });
                    });
                });
            });  
        });
    });


});

/*SIN MODELO DE MONGODB
beforeEach(() => {
    Bicicleta.allBicis = [];
});

describe('Bicicleta.allBicis', () => {
    it('Comienza vacía', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('Agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var bici1 = new Bicicleta(1, "Blanco", 2019, [6.217, -75.5987]);
        Bicicleta.add(bici1);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(bici1);
    });
});

describe('Bicicleta.findById', () => {
    it('Debe devolver la bici con Id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var bici1 = new Bicicleta(1, "Blanco", 2019, [6.217, -75.5987]);
        var bici2 = new Bicicleta(2, "Negro", 2020, [6.217, -75.5987]);
        Bicicleta.add(bici1);
        Bicicleta.add(bici2);

        var tarjetBici = Bicicleta.findById(1);
        expect(tarjetBici.id).toBe(1);
        expect(tarjetBici.color).toBe(bici1.color);
    });
});

describe('Bicicleta.delete', () => {
    it('Se crean 2 bicis y se elimina 1. Devuelve 1 bici', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var bici1 = new Bicicleta(1, "Blanco", 2019, [6.217, -75.5987]);
        var bici2 = new Bicicleta(2, "Negro", 2020, [6.217, -75.5987]);
        Bicicleta.add(bici1);
        Bicicleta.add(bici2);

        expect(Bicicleta.allBicis.length).toBe(2);

        Bicicleta.delete(2);
        expect(Bicicleta.allBicis.length).toBe(1);
    });
});

describe('Bicicleta.update', () => {
    it('Se crean 2 bicis y se edita la bici 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var bici1 = new Bicicleta(1, "Blanco", 2019, [6.217, -75.5987]);
        var bici2 = new Bicicleta(2, "Negro", 2020, [6.217, -75.5987]);
        Bicicleta.add(bici1);
        Bicicleta.add(bici2);

        Bicicleta.update(1, "Dorado", 2019, 6.217, -75.5987);
        var tarjetBici = Bicicleta.findById(1);
        expect(tarjetBici.color).toBe("Dorado");
    });
});*/