var Bicicleta = require('../../models/bicicleta');

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
});