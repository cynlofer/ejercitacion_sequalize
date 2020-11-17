const {sequelize,DataTypes}= require("sequelize");
module.exports =(sequelize,DataTypes)=>{
    const Genre = sequelize.define("Genre",{  // Genre es el nombre del modelo
        name : DataTypes.STRING,
        ranking : DataTypes.DECIMAL,//nombres de las columnas,faltan los que presupone (que no los pongo id, create_at y update_at)
        active : DataTypes.INTEGER,

    });
    Genre.associate = models =>{ //asocio la variable Genre mediante la propiedad associate a otros modelos
        Genre.hasMany(models.Movie)
}
    return Genre;
}
