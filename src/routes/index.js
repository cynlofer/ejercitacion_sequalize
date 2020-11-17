var express = require('express');
var router = express.Router();
const dbController = require('../controllers/dbController');

/*redireccionar al home*/
router.get('/',dbController.index);

/* mostrar peliculas */
router.get('/movies',dbController.all); 
router.get('/movies/detail/:id',dbController.one);
router.get('/movies/new',dbController.new);

/* crear pelicula */
router.get('/movies/create',dbController.create);
router.post('/movies/create',dbController.store);

/* recomendar pelicula */
router.get('/movies/recommended',dbController.recomendadas);

/* buscar pelicula */

router.get('/movies/search',dbController.search);
router.post('/movies/search',dbController.search);


/* editar pelicula */
router.get('/movies/edit/:id',dbController.edit);
router.put('/movies/edit/:id',dbController.update);


/* borrar pelicula */
router.delete('/movies/delete/:id' ,dbController.delete);

module.exports = router;
