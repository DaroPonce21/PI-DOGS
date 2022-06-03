const axios = require('axios')
const { YOUR_API_KEY } = process.env

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const apiInfo = await apiUrl.data.map(e => {
        return {
            id: e.id,

            name: e.name !== null ? e.name : 'Raza PP'
            
            ,

            heightMin: e.height.metric.split('-')[0] !== 'NaN' ?
                e.height.metric.split(' - ')[0] :
                (e.height.imperial.split('-')[0] ?
                    Math.round(e.height.imperial.split('-')[0] / 2.205).toString() :
                    (e.height.metric.split(' - ')[1] ?
                        Math.round(e.height.metric.split('-')[1] * 0.6.toString()) :
                        (e.height.imperial.split('-')[1] ?
                            Math.round(e.height.metric.split('-')[1] * 0.6 / 2.205.toString()) :
                            'No tenemos Altura Minima para ese Perro')))
            ,

            heightMax: e.height.metric.split('-') !== 'NaN' ?
                e.height.metric.split(' - ')[1] :
                (e.height.imperial.split('-')[1] ?
                    Math.round(e.height.imperial.split('-')[1] / 2.205).toString() :
                    (e.height.metric.split(' - ')[0] ?
                        Math.round(e.height.metric.split('-')[0] * 1.1.toString()) :
                        (e.height.imperial.split('-')[0] ?
                            Math.round(e.height.metric.split('-')[0] * 1.1 / 2.205.toString()) :
                            'No tenemos Altura Maxima para ese Perro')))

            ,

            weightMin: e.weight.metric.split('-')[0] !== 'NaN' ?
                e.weight.metric.split(' - ')[0] :
                (e.weight.imperial.split('-')[0] ?
                    Math.round(e.weight.imperial.split('-')[0] / 2.205).toString() :
                    (e.weight.metric.split(' - ')[1] ?
                        Math.round(e.weight.metric.split('-')[1] * 0.6.toString()) :
                        (e.weight.imperial.split('-')[1] ?
                            Math.round(e.weight.metric.split('-')[1] * 0.6 / 2.205.toString()) :
                            'No tenemos Peso Minimo para ese Perro')))
            ,

            weightMax: e.weight.metric.split('-') !== 'NaN' ?
                e.weight.metric.split(' - ')[1] :
                (e.weight.imperial.split('-')[1] ?
                    Math.round(e.weight.imperial.split('-')[1] / 2.205).toString() :
                    (e.weight.metric.split(' - ')[0] ?
                        Math.round(e.weight.metric.split('-')[0] * 1.1.toString()) :
                        (e.weight.imperial.split('-')[0] ?
                            Math.round(e.weight.metric.split('-')[0] * 1.1 / 2.205.toString()) :
                            'No tenemos Peso Maximo para ese Perro')))


            ,
            life_span: e.life_span !== null ? e.life_span : 'Esperanza de vida no encontrada' ,

            temperaments: e.temperament ? e.temperament : null,

            image: e.image.url,
        }
    });
    return apiInfo;
}

module.exports ={getApiInfo}