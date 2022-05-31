const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { MY_API_KEY } = process.env;
const { Dog, Temperament } = require('../db')
const router = Router();
require('dotenv').config();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// Armo un funcion controladora para traer la info de la api y despues desde la ruta las controlo
const getApiInfo = async () => {
    const apiURL = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`)
    const apiInfo = await apiURL.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            heightMin: e.height.metric.split('-')[0],
            heightMax: e.height.metric.split('-')[1],
            weightMin: e.weight.metric.split('-')[0],
            weightMax: e.weight.metric.split('-')[1],
            life_span: e.life_span,
            temperaments: e.temperament,
            image: e.image.url,
        }
    });
    return apiInfo
};

// Misma funcion controladora pero para la DB
const getDBInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            throught: {
                attributes: [],
            },
        }
    })
};

//Unifico la informacion de DB y API
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}


// Esta ruta contiene /dogs y /dogs?name= . en el primer caso nos trae todos los dogs en el segundo solo el que coincida con el query pasado.

router.get('/dogs', async (req, res, next) => {
    try {
        const name = req.query.name
        let fullDogs = await getAllDogs();
        if (name) {
            let nameDog = await fullDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            nameDog.length ?
                res.status(200).send(nameDog) :
                res.send([{
                    name: `Sorry, the breed '${name}' is not in our data.`, id: '', temperaments: 'You can create the breed in our Dog Creator', imagen: 'https://c.tenor.com/TUJ_WGkQ6pcAAAAC/dog-computer.gif'
                }]);
        } else {
            res.status(200).send(fullDogs)
        }
    } catch (err) {
        next(err);
    }
})

// Segun el ID que recibo por parametros nos devuelve el perro o el error

router.get('/dogs/:razaId', async (req, res, next) => {
    const { razaId } = req.params;
    const fullRaza = await getAllDogs();
    if (razaId) {
        let raza = await fullRaza.filter(e => e.id == razaId);
        raza.length ?
            res.status(200).json(raza) :
            res.status(404).send(`Sorry, The ID '${razaId}' does not correspond to any race`)
    }
})




router.get('/temperament', async (req, res, next) => {
    let apiInfo = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`)
    let sepTempers = apiInfo.data.map(e => e.temperament).toString();
    sepTempers = await sepTempers.split(',')
    const tempsSpaced = await sepTempers.map(e => {
        if (e[0] == ' ') {
            return e.split('');
        }
        return e;
    });
    const tempsNotSpace = await tempsSpaced.map(e => {
        if (Array.isArray(e)) {
            e.shift();
            return e.join('');
        }
        return e;
    })
    await tempsNotSpace.forEach(e => {
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
        CreatedInDB,
        temperaments,

    } = req.body
    let dogCreated = await Dog.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span: life_span + ' years',
        image,
        CreatedInDB
    })
    let temperamentDB = await Temperament.findAll({
        where: {
            name: temperaments
        }
    })
    dogCreated.addTemperament(temperamentDB)
    res.send('Congratulations, Mr. Stark, you have created a new Dog')
})

module.exports = router;
