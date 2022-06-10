const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Race, Temperament, /*Origin*/ } = require('../db')
require('dotenv').config();



const { getAllDogs } = require('../controllers/getAllDogs');


const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Nos trae todos los perros o el que llega por nombre en el Query

router.get('/dogs', async (req, res, next) => {
    try {
        const name = req.query.name
        let allDogs = await getAllDogs();
        if (name) {
            let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?
                res.status(200).send(dogName) :
                res.send([{
                    name: 'Perdon, la raza no esta en nuestra base de datos.', id: '', temperaments: 'Puede crearla en nuestro "Creador de Perros"', image: 'https://e7.pngegg.com/pngimages/741/723/png-clipart-adult-white-and-brown-jack-russell-terrier-using-magnifying-glass-search-and-rescue-dog-puppy-dog-training-pet-pets-animals-dog-like-mammal.png'
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
            res.status(404).json(`Perdon, el ID '${raceId}' No aparece`)
    }
})


//Nos devuelve los Temperamentos

router.get('/temperament', async (req, res, next) => {
    let infoApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    try {
        let allTemperament = infoApi.data.map(allDogs => allDogs.temperament ? allDogs.temperament : 'no temperament').join(',').split(',')
        let filterTemperament = allTemperament.filter(temper => temper !== 'no temperament')
        let eTemper = [... new Set(filterTemperament)]
        eTemper.forEach(temper =>{
            Temperament.findOrCreate({
                where:{name: temper}
            })
        })
        let temperDB = await Temperament.findAll()
        res.status(200).send(temperDB)
    } catch (error) {
        res.status(404).send(error)
        
    }
})



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
        //origins,
        //bredFor,
        //breedGroups,

    } = req.body
    let raceCreated = await Race.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span: life_span + ' años',
        image,
        //bredFor,
        //breedGroups,
    })
    let temperamentDB = await Temperament.findAll({
        where: {
            name: temperaments
        }
    })


    raceCreated.addTemperament(temperamentDB)
    res.status(200).send('Raza creada')



})

module.exports = router;


 

/*
router.get('/origin', async (req, res, next) => {
    let infoApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    let oringisRepeated = infoApi.data.map(e => e.origin).toString();
    oringisRepeated = await oringisRepeated.split(',')
    const originsConEspacios = await oringisRepeated.map(e => {
        if (e[0] == ' ') {
            return e.split('');
        }
        return e;
    });
    const originsSinEspacios = await originsConEspacios.map(e => {
        if (Array.isArray(e)) {
            e.shift();
            return e.join('');
        }
        return e;
    })
    await originsSinEspacios.forEach(e => {
        if (e != '') {
            Origin.findOrCreate({
                where: {
                    name: e,
                }
            })
        }
    });
    const allOrigins = await Origin.findAll()
    res.status(200).send(allOrigins)

});
*/


/*
    let originsDB = await Origin.findAll({
        where:{
            name: origins
        }
    })
*/

 
//   raceCreated.addOrigin(originsDB)
//   res.status(200).send('Raza creada')












































/*
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
*/


/*


router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    try {
      if (id) {
        await Race.destroy({
          where: { id: id },
        });
        res.send({ msg: "Dog deleted" });
      }
    } catch (error) {
      console.log(error);
    }
  });

  */