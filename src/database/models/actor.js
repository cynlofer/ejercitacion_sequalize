const {sequelize,DataTypes}= require("sequelize");
module.exports =(sequelize,DataTypes)=>{
    const Actor = sequelize.define("Actor",{  //Actor es el nombre del modelo
        first_name : DataTypes.STRING,
        last_name : DataTypes.STRING,//nombres de las columnas,faltan los que presupone (que no los pongo id, create_at y update_at)
        rating : DataTypes.DECIMAL,
        favorite_movie_id:DataTypes.INTEGER
    });
   
Actor.associate = models =>{ //asocio la variable Actor mediante la propiedad associate a otros modelos
        Actor.belongsToMany(models.Movie,{ 
            through: 'actor_movie', //nombre tabla intermedia o pivot
            as:'peliculas' //alias
        })
}
    return Actor;
}
