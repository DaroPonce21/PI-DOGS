const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Race, Temperament } = require('../db')
require('dotenv').config();

const { getAllDogs } = require('../controllers/getAllDogs')

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res, next) => {
    try {
        const name = req.query.name
        let allDogs = await getAllDogs();
        if (name) {
            let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?
                res.status(200).send(dogName) :
                res.send([{
                    name: 'Perdon, la raza no esta en nuestra base de datos.', id: '', temperaments: 'Puede crearla en nuestro "Creador de Perros"', imagen: 'https://c.tenor.com/TUJ_WGkQ6pcAAAAC/dog-computer.gif'
                }]);
        } else {
            res.status(200).send(allDogs)
        }
    } catch (err) {
        next(err);
    }
})

// Segun el ID que recibo por parametros nos devuelve el perro o el error

router.get('/dogs/:raceId', async (req, res, next) => {
    const { raceId } = req.params;
    const allRaces = await getAllDogs();
    if (raceId) {
        let race = await allRaces.filter(e => e.id == raceId);
        race.length ?
            res.status(200).json(race) :
            res.status(404).send(`Perdon, el ID '${raceId}' No aparece`)
    }
})


//Nos devuelve los Temperamentos

router.get('/temperament', async (req, res, next) => {
    let infoApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    let tempsRepeated = infoApi.data.map(e => e.temperament).toString();
    tempsRepeated = await tempsRepeated.split(',')
    const tempsConEspacios = await tempsRepeated.map(e => {
        if (e[0] == ' ') {
            return e.split('');
        }
        return e;
    });
    const tempsSinEspacios = await tempsConEspacios.map(e => {
        if (Array.isArray(e)) {
            e.shift();
            return e.join('');
        }
        return e;
    })
    await tempsSinEspacios.forEach(e => {
        if (e != '') {
            Temperament.findOrCreate({
                where: {
                    name: e,
                }
            })
        }
    });
    const allTemps = await Temperament.findAll()
    res.status(200).send(allTemps)
});



// Nos permite crear el perro

router.post('/dogs', async (req, res) => {
    let {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        image,
        temperaments,

    } = req.body
    let raceCreated = await Race.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span: life_span + ' años',
        image,
    })
    let temperamentDB = await Temperament.findAll({
        where: {
            name: temperaments
        }
    })
    raceCreated.addTemperament(temperamentDB)
    res.status(200).send('Felicitaciones, Mr. Stark, ha creado una nueva raza')
})

module.exports = router;
