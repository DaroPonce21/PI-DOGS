// Extra para crear los origenes de los perros como se hace con los temperamentos

const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('origin', {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'Creado en Labotarios Fluffy'
              },
    },
    {timestamps: false}
    );
};
