var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

describe('Bicicleta API', () =>{

    describe('Conectar BD', () => {
        it('status 200', (done) => {
            var mongoDB = 'mongodb://localhost/test_API_bicicleta';
            mongoose.createConnection(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
            mongoose.Promise = global.Promise;
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'Error al conectar la base de datos'));
            db.once('open', function(){
                console.log('La base de datos del test API está conectada');
                done();
            });
        });
    });
    
    /*beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/test_API_bicicleta';
        mongoose.createConnection(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.Promise = global.Promise;
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error al conectar la base de datos'));
        db.once('open', function(){
            console.log('La base de datos del test API está conectada');
            done();
        });        
    });


    afterEach(function(done){
        Bicicleta.deleteMany({}, function(error, success){
            if(error) console.log(error);
            mongoose.disconnect(error);
            done();
        });
    });*/

    describe('GET Bicicletas /', () => {
        it('status 200', (done) => {
            request.get('http://localhost:8000/api/Bicicletas', function(error, response, body){
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });;           
        });
    });

    describe('POST Bicicletas /create', () => {
        it('status 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var bici1 = '{"id": 10, "color": "Morado", "modelo": 2021, "latitud": -35, "longitud": -75}';

            request.post({
                headers: headers,
                url: 'http://localhost:8000/api/bicicletas/create',
                body: bici1
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);                               
                var result = JSON.parse(body);
                expect(result.bicicletas.color).toBe("Morado"); 
                done();
            });            
        });
    });

    describe('POST Bicicletas /update', () => {
        it('status 200', (done) => {

            var headers = {'content-type' : 'application/json'};
            var bici1 = '{"id": 10, "color": "Negro", "modelo": 2019, "latitud": 6.217, "longitud": -75.5987 }'; 

            request.post({
                headers: headers,
                url: 'http://localhost:8000/api/bicicletas/update',
                body: bici1
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                Bicicleta.findByCode(10, function(error, bici){
                    expect(bici.modelo).toBe(2019);
                    expect(bici.color).toBe("Negro");
                    done()
                });
            });
            
        });
    });

    describe('POST Bicicletas /delete', () => {
        it('status 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var bici1 = '{"id": 10}';

            request.delete({
                headers: headers,
                url: 'http://localhost:8000/api/bicicletas/delete',
                body: bici1
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                console.log(response.body);
                done();

            });
            
        });
    });

    describe('Desconectar BD', () => {
        it('status 200', (done) => {
            Bicicleta.deleteMany({}, function(error, success){
            if(error) 
                console.log(error);
            
            mongoose.disconnect(error);
            done();
            });
         });
    });
});
    
/*
    describe('GET Bicicletas /', () => {
        it('status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            
            var bici1 = new Bicicleta(1, "Blanco", 2019, [6.217, -75.5987]);
            Bicicleta.add(bici1); 

            request.get('http://localhost:8000/api/Bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });;
            
        });
    });

    describe('POST Bicicletas /create', () => {
        it('status 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var bici1 = '{"id": 10, "color": "Morado", "modelo": 2021, "latitud": -35, "longitud": -75}';

            request.post({
                headers: headers,
                url: 'http://localhost:8000/api/bicicletas/create',
                body: bici1
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("Morado");
                done();

            });
            
        });
    });

    describe('POST Bicicletas /delete', () => {
        it('status 200', (done) => {
            expect(Bicicleta.allBicis.length).toBe(2);
            var headers = {'content-type' : 'application/json'};
            var bici1 = '{"id": 10}';

            request.delete({
                headers: headers,
                url: 'http://localhost:8000/api/bicicletas/delete',
                body: bici1
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.allBicis.length).toBe(1);
                done();

            });
            
        });
    });

    describe('POST Bicicletas /update', () => {
        it('status 200', (done) => {

            var headers = {'content-type' : 'application/json'};
            var bici1 = '{"id": 1, "color": "Negro", "modelo": 2019, "latitud": 6.217, "longitud": -75.5987 }'; 

            request.post({
                headers: headers,
                url: 'http://localhost:8000/api/bicicletas/update',
                body: bici1
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(1).color).toBe("Negro");
                expect(Bicicleta.allBicis.length).toBe(1);
                done();

            });
            
        });
    });
*/
