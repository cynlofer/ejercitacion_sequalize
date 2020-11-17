const {sequelize,DataTypes}= require("sequelize");
const actor = require('./actor');
/*app.locals.moment = require('moment');*/

module.exports =(sequelize,DataTypes)=>{
    const movie = sequelize.define("Movie",{  //Movie es el nombre del modelo
        title : DataTypes.STRING,
        rating : DataTypes.DECIMAL,//nombres de las columnas,faltan los que presupone (que no los pongo id, create_at y update_at)
        awards : DataTypes.INTEGER,
        release_date :DataTypes.DATEONLY,
        
        /*release_date: {
            type: DataTypes.DATEONLY,
            get: function() {
              return moment.utc(this.getDataValue('release_date')).format('DD-MM-YYYY');
            }
        },
        
        /*{
            type:DataTypes.DATEONLY,
            get(){
            return
            moment(this.getDataValue('release_date')).add(3,'hour').format('DD/MM/YYYY'); 
            },
            allowNull:false
        },*/
        length : DataTypes.INTEGER,
        genre_id : DataTypes.INTEGER

    })
    movie.associate = (models => { //asocio la variable Movie mediante la propiedad associate a otros modelos
        movie.belongsTo(models.Genre);
        movie.belongsToMany(models.Actor,{
            as:'actores', //alias
            through:'actor_movie' // nombre tabla intermedia o pivot
        })
    })
    return movie
}
