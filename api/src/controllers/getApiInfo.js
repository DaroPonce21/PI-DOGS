//Nos traemos la Info de la API

const axios = require('axios')
const { YOUR_API_KEY } = process.env

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const apiInfo = await apiUrl.data.map(e => {
        return {
            id: e.id
            ,

            name: e.name !== null ? e.name : 'Raza PP'

            ,

            //Chequea que si o si traiga algo, ya sea en medidas metricas o imperiales (convertidas a metricas)

            heightMin: e.height.metric.split('-')[0] && e.height.metric.split('-')[0] !== 'NaN' ?
                e.height.metric.split(' - ')[0] :
                (e.height.imperial.split('-')[0] && e.height.imperial.split('-')[0] !== 'NaN' ?
                    Math.round(e.height.imperial.split('-')[0] / 2.205).toString() :
                    (e.height.metric.split(' - ')[1] && e.height.metric.split(' - ')[1] !== 'NaN' ?
                        Math.round(e.height.metric.split('-')[1] * 0.6).toString() :
                        (e.height.imperial.split('-')[1] && e.height.imperial.split('-')[1] !== 'NaN' ?
                            Math.round(e.height.metric.split('-')[1] * 0.6 / 2.205).toString() :
                            'No tenemos Altura Minima para ese Perro')))
            ,

            //Chequea que si o si traiga algo, ya sea en medidas metricas o imperiales (convertidas a metricas)

            heightMax: e.height.metric.split('-')[1] && e.height.metric.split('-')[1] !== 'NaN' ?
                e.height.metric.split(' - ')[1] :
                (e.height.imperial.split('-')[1] && e.height.imperial.split('-')[1] !== 'NaN' ?
                    Math.round(e.height.imperial.split('-')[1] / 2.205).toString() :
                    (e.height.metric.split(' - ')[0] && e.height.metric.split(' - ')[0] !== 'NaN' ?
                        Math.round(e.height.metric.split('-')[0] * 1.1).toString() :
                        (e.height.imperial.split('-')[0] && e.height.imperial.split('-')[0] !== 'NaN' ?
                            Math.round(e.height.metric.split('-')[0] * 1.1 / 2.205).toString() :
                            'No tenemos Altura Maxima para ese Perro')))

            ,

            //Chequea que si o si traiga algo, ya sea en medidas metricas o imperiales (convertidas a metricas)

            weightMin: e.weight.metric.split('-')[0] && e.weight.metric.split('-')[0] !== 'NaN' ?
                e.weight.metric.split(' - ')[0] :
                (e.weight.imperial.split('-')[0] && e.weight.imperial.split('-')[0] !== 'NaN' ?
                    Math.round(e.weight.imperial.split('-')[0] / 2.205).toString() :
                    (e.weight.metric.split(' - ')[1] && e.weight.metric.split('-')[1] !== 'NaN' ?
                        Math.round(e.weight.metric.split('-')[1] * 0.6).toString() :
                        (e.weight.imperial.split('-')[1] && e.weight.imperial.split('-')[1] !== 'NaN' ?
                            Math.round(e.weight.metric.split('-')[1] * 0.6 / 2.205).toString() :
                            'No tenemos Peso Minimo para ese Perro')))
            ,

            //Chequea que si o si traiga algo, ya sea en medidas metricas o imperiales (convertidas a metricas)

            weightMax: e.weight.metric.split('-')[1] && e.weight.metric.split('-')[1] !== 'NaN' ?
                e.weight.metric.split(' - ')[1] :
                (e.weight.imperial.split('-')[1] && e.weight.imperial.split('-')[1] !== 'NaN' ?
                    Math.round(e.weight.imperial.split('-')[1] / 2.205).toString() :
                    (e.weight.metric.split(' - ')[0] && e.weight.metric.split(' - ')[0] !== 'NaN' ?
                        Math.round(e.weight.metric.split('-')[0] * 1.1).toString() :
                        (e.weight.imperial.split('-')[0] && e.weight.imperial.split('-')[0] !== 'NaN' ?
                            Math.round(e.weight.metric.split('-')[0] * 1.1 / 2.205).toString() :
                            'No tenemos Peso Maximo para ese Perro')))


            ,
            life_span: e.life_span !== null ? e.life_span : 'Esperanza de vida no encontrada',

            temperaments: e.temperament ? e.temperament : 'Sin datos de temperamentos',

            image: e.image.url,

// ----------------------------- DATOS EXTRA QUE NO PIDE EL PI PERO X SI QUEREMOS TRAERLOS, FALTA DESCRIPTION----------------

            //origins: e.origin ? e.origin : 'Sin datos del pais de origen',

            //bredFor: e.bred_for ? e.bred_for : 'Dar amor',

            //breedGroups: e.breed_group ? e.breed_group : 'Sin sub-grupo',

        }
    });
    return apiInfo;
}

//--------------------------- VERSION PROMESAS (ACA NO HAGO QUE ME TRAIGA SI O SI EL PESO Y ALTURA SI NO TIENE, PERO TODO FUNCIONA) ------------------


/*
Promesas

const getApiInfo = () => {
    const apiUrl = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
        .then(res => res.data.map(el => {
            return {
                id: el.id,
                name: el.name,
                heightMin: el.height.metric.split(' - ')[0],
                heightMax: el.height.metric.split(' - ')[1] ?
                    el.height.metric.split(' - ')[1] :
                    Math.round(el.height.metric.split(' - ')[0] * 1.1),
                weightMin: el.weight.metric.split(' - ')[0] !== "NaN" ?
                    el.weight.metric.split(' - ')[0] :
                    (el.weight.metric.split(' - ')[1] ?
                        Math.round(el.weight.metric.split(' - ')[1] * 0.6) :
                        '30'),//Math.round(el.weight.imperial.split(' - ')[1] * 0.6 / 2.205).toString()),
                weightMax: el.weight.metric.split(' - ')[1] ?
                    el.weight.metric.split(' - ')[1] :
                    '39',//Math.round(parseInt(el.weight.imperial.split(' - ')[1]) / 2.205).toString(),
                life_span: el.life_span,
                temperaments: el.temperament ? el.temperament : null,
                image: el.image.url,
            }
        }));
    return apiUrl

*/

module.exports = { getApiInfo }