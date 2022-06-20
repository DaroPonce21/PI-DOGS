// Nos traemos lo de la DB (origin es extra)

const {Race, Temperament, Origin} = require('../db')


const getDbInfo = async () =>{
    return await Race.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            throught:{
                attributes:[]
            }
        },
       /*
        include:{
            model: Origin,
            attributes: ['name'],
            throught:{
                attributes:[]
            }
        }
      */
    })
   
}

module.exports={ getDbInfo}