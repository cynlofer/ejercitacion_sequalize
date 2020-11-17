const {Movie,Genre,Actor}= require("../database/models");
const { Op } = require("sequelize");
const actor = require("../database/models/actor");
const genre = require("../database/models/genre");


module.exports ={
    index: async(req,res)=>{
        try{
            res.redirect('./movies')


        }catch(error){
            console.log(error);
        }
    },  


    all : async(req,res)=>{
        try{
            const moviesjson = await Movie.findAll({include:['Genre','actores']});
            //res.json(moviesjson)
            res.render("home", {peliculas : moviesjson});

            
        }catch(error){
            console.log(error);
        }
    },
    one : async(req,res)=>{
        try{
            
            const moviesjson = await Movie.findByPk(req.params.id,{include:['Genre','actores']});
            const generos = await Genre.findAll(); // traigo todos los generos
            const actores =  await Actor.findAll(); // traigo todos los actores
            res.render('detail',{pelicula:moviesjson,Genre,actores});
            //res.send({pelicula:moviesjson,Genre,actores})
            //console.log(actores)
            
        }catch(error){
            console.log(error);
        }
    },
    new: async(req,res)=>{
        try{
            
            const moviesjson = await Movie.findAll({
                order: [["release_date","DESC"]],
                limit:5
            });
            res.render('news',{peliculas:moviesjson});
            
        }catch(error){
            console.log(error);
        }
    },


    recomendadas: async(req,res)=>{
        try{
            const moviesjson = await Movie.findAll({
                where:{
                    rating: { 
                        [Op.gte]: 8
                    }
                }
            });
            res.render('recomendadas',{peliculas:moviesjson});
       
        }catch(error){
            console.log(error);
        }
    },

        search: async(req,res)=>{
        try{
            const moviesjson = await Movie.findAll({
             where:{
                 title :{[Op.like]:('%'+req.body.name+'%')
                }
            }
        });
        //console.log(moviesjson);
        res.render('search',{peliculas:moviesjson});
       
        }catch(error){
            console.log(error);
        }
    },
    create:async(req,res)=>{
        try{
            const generos = await Genre.findAll(); // traigo todos los generos
            const actores =  await Actor.findAll(); // traigo todos los actores
//res.send(generos,actores)
            res.render ('create_movie',{generos,actores}); //envio los generos y los actores para poder elegirlos

        }catch(error){
            console.log(error);
        }
    },

    store:async(req,res)=>{
        console.log (req.body);
        const newMovie = await Movie.create(req.body)
        await newMovie.addActores(req.body.actores)//agrego actores a la pelicula
       //res.send(newMovie)
       res.redirect('/movies')
    },


    

    edit : async(req,res)=>{
        try{

            const movieId = req.params.id; //capturo el id que le pedi por url
            const movieEdit = await Movie.findByPk(movieId, {include:['Genre', 'actores']}); //necesito buscar generos y actores
            const generos = await Genre.findAll(); //busco entre todos los generos
            const actores = await Actor.findAll(); //busco entre todos los actores
            res.render('edit_movie',{movieEdit,generos,actores});
            //res.send(movieEdit,generos,actores)

           
        }catch(error){
            console.log(error);
        }
    },

    update: async(req,res)=>{
        try{
            const movieId = req.params.id;
            const updateMovie = await Movie.findByPk(movieId,{include:['Genre','actores']}); //traigo la pelicula
            const generos = await Genre.findAll(); //busco entre todos los generos
            const actores = await Actor.findAll(); //busco entre todos los actores
            await updateMovie.removeActores(updateMovie.actores); //borro actores que tenia
            await updateMovie.addActores(req.body.actores); //agrego actores nuevos
            await updateMovie.update(req.body); //updeteo los registros de la tabla movies

            //res.send(updateMovie,generos,actores);
            //res.render('detail',updateMovie,{generos,actores})    
            res.redirect('/movies')
        
        }catch(error){
        console.log(error);
    }
},

    delete: async(req,res)=>{
        try{
            const movieId = req.params.id;
            const toDelete = await Movie.findByPk(movieId,{include:['Genre','actores']})
            await toDelete.removeActores(toDelete.actores);
            await toDelete.destroy()
           
            //res.json(moviesjson)
            res.redirect('/')

        }catch(error){
            console.log(error);
        }
    },

}






  

